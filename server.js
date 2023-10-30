const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');
mongoose
  .connect(
    'mongodb+srv://baliramshejal2001:68OsKmJuTvYqwqp7@cluster0.ojvc1gd.mongodb.net/',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(err => {
    console.log('error connecting to MongoDB', err);
  });

app.listen(port, () => {
  console.log('server is running on port', port);
});

//end point to register in the app 
const User = require("./src/api/models/user");

//function to send verification email to the user

const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transport 
  const transporter = nodemailer.createTransport({
    //configure the email service 
    service: "gmail",
    auth: {
      user: "baliramshejal2001@gmail.com",
      pass: "wrkb tezo keyd tqob"
    }

  })

  //compose the email message
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `please click the following link to verify your email : http://192.168.10.242:8000/verify/${verificationToken}`
  }


  // send verification email 

  try {
    await transporter.sendMail(mailOptions)
  }
  catch (err) {
    console.log("error sending verification email", err)
  }
}
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user email is already registered

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'email already registered' })
    }

    //create a new user

    const newUser = new User({ email, name, password });

    //generate and store a verification token 
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to the database
    await newUser.save();

    // Debugging statement to verify data
    console.log("New User Registered:", newUser);

    //send verification email to the user

    sendVerificationEmail(newUser.email, newUser.verificationToken)
    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });

  }
  catch (err) {
    console.log('error registering user', err);
    res.status(500).json({ message: "Registration failed" })
  }
});

// end point to verify email

app.get("/verify/:token", async (req, res) => {

  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      res.status(404).json("Invalid verification token");
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json("Email verified successfully");
  }
  catch (err) {
    res.status(500).json("Email verification failed");
  }
})

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
}
const secretKey = generateSecretKey();
// end point to login user

app.post("/login", async (req, res) => {
try{
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // check if user is exist with email
  if (!user) {
    return res.status(401).json("Invalid username or password");
  }
  //check if password is correct
  if (user.password != password) {
    return res.status(401).json("Invalid password");
  }

  const token = jwt.sign({ userId: user._id }, secretKey);

  res.status(200).json({token});
   }catch(err){
    res.status(500).json({message:"Login failed"});
   }
})