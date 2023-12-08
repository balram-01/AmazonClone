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
const Order = require("./src/api/models/order");

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
    text: `please click the following link to verify your email : http://192.168.21.159:8000/verify/${verificationToken}`
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
  try {
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

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
})

// end point to save addresss

app.post("/address", async (req, res) => {
  try {
    const { userId, address } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.adresses.push(address);
    await user.save();
    return res.status(200).json({ message: "address added successfully" })
  } catch (err) {
    res.status(500).json({ message: "error adding address" })
  }

})

// end point to get addresses

app.get("/addresses/:userId", async (req, res) => {
  try {
    const { userId } = req.params;;
    const user = await User.findById(userId);
    if (!user) {
      res.status(500).json({ message: 'userId does not exists ' });
    }
    const addresses = user.adresses;
    return res.status(200).json({ addresses })
  } catch (err) {
    res.status(500).json({ message: "error fetching addresses" });
  }
})

app.put("/address/update", async (req, res) => {
  try {
    const { address, userId, addressId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(500).json({ message: "User does not exists" });
    }

    // Find the index of the address in the array
    const addressIndex = user.adresses.findIndex(
      (item) => item._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address does not exist" });
    }

    // Update the address in the array
    user.adresses[addressIndex] = { ...user.adresses[addressIndex], ...address };
    await user.save();
    return res.status(200).json({ message: "address updated Successfully" })
  } catch (err) {
    return res.status(500).json({ message: "Error updating address" })
  }

})
app.put("/address/updateDefault", async (req, res) => {
  try {
    const { userId, addressId } = req.body;

    // Validate and sanitize userId and addressId here

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newDefaultIndex = user.adresses.findIndex(
      (item) => item._id.toString() === addressId
    );

    if (newDefaultIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    const currentDefaultIndex = user.adresses.findIndex(
      (item) => item.default === true
    );

    // Return early if the new default address is already set
    if (currentDefaultIndex !== -1 && newDefaultIndex !== currentDefaultIndex) {
      updateAddressDefaultStatus(user.adresses[currentDefaultIndex], false);
    }

    updateAddressDefaultStatus(user.adresses[newDefaultIndex], true);

    // Save the user object only if it has been modified
    const isModified = user.isModified("adresses");
    if (isModified) {
      await user.save();
    }

    return res.status(200).json({ adresses: user.adresses });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating address" });
  }
});

function updateAddressDefaultStatus(address, isDefault) {
  if (address) {
    address.default = isDefault;
  }
}


app.put("/address/remove", async (req, res) => {
  try {
    const { userId, addressId } = req.body;
    console.log("userId, addressId", userId, addressId)
    const user = await User.findById(userId);
    if (!user) {
      res.status(500).json({ message: "User does not exists" });
    }

    // Find the index of the address in the array
    const addressIndex = user.adresses.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address does not exist" });
    }
    //deleting address
    user.adresses.splice(addressIndex, 1);
    await user.save();
    return res.status(200).json({ message: "Address removed Successfully" })
  } catch (err) {
    return res.status(500).json({ message: "Error removing address" })
  }

})

app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "user does not exist" });
    }

    const products = cartItems?.map((product) => ({
      name: product?.title,
      quantity: product.quantity,
      price: product.price,
      image: product?.image
    }));
    console.log("products", products)
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod

    })

    await order.save();

    return res.status(200).json({ message: "order created successfully" });


  } catch (err) {
    return res.status(500).json({ message: "Error creating order" });
  }

})

app.get("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("orders")

    if (!user) {
      return res.status(404).json({ message: "user not found" });

    }

    return res.status(200).json({ user })

  } catch (err) {
    return res.status(500).json("Error fetching user");
  }
})

app.get("/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate("user");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    return res.status(200).json({orders})
  } catch (err) {
    return res.status(500).json({ message: "error fetching orders" });
  }
})
