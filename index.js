const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./routes/userRouter")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000;

app.use("/users", userRouter)
app.listen(PORT, () => console.log(`The Server is running on port: ${PORT}`))

mongoose.connect(
    process.env.MONGODB_CONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) throw err;
      console.log("MongoDB is connected");
    }
  );