const router = require("express").Router();
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
    try {
      let { name, username, email, password } = req.body;
  
      // validate
  
      if (!name || !password || !email)
        return res.status(400).json({ msg: "Not all fields have been entered." });
      if (password.length < 5)
        return res
          .status(400)
          .json({ msg: "The password needs to be at least 5 characters long." });
  
      const existingUser = await User.findOne({ email: email });
      if (existingUser)
        return res
          .status(400)
          .json({ msg: "An account with this email already exists." });
  
      if (!username) username = name;
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      console.log(passwordHash)
  
      const newUser = new User({
          name,
          username,
          email,
          password: passwordHash
      })

      const savedUser = await newUser.save()

      res.json(savedUser)
   
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/login", async(req, res) => {
      try{
          const {email, password} = req.body;

          if(!email || !password)
             return res.status(400).json({msg: "Not all fields have been entered"})
           const user = await User.findOne({email: email})
           if(!user){
            return res.status(400).json({msg: "This email does not exists!"})
           }
           const isMatch = await bcrypt.compare(password, user.password)
           if( !isMatch) return res.status(400).json({msg: "Incorrect email or password!"})

           const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
           res.json({
               token,
               user: {
                   id: user._id,
                   username: user.username,
                   email: user.email
               }
           })

      }catch(err){
          res.status(500).json({error: err.message})
      }
  })

module.exports = router;