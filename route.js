const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const collection = require("./mongodb");
const contact = require("./contactdb");
let alert = require("alert");
require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const router = express.Router();

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
router.use(express.static(__dirname + "/public/"));
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/" + "views" + "/index.html"));
});
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/" + "views" + "/login.html"));
});
router.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.send("yes");
});
router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname + "/" + "views" + "/membership.html"));
});

router.post("/login", async (req, res) => {
 
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  
  const existinguser = await collection.findOne(data);
  
  if (existinguser) {
    // alert("User already exists")
   
    let options = {
      maxAge: 1000 * 60 * 15, // would expire after 15 minutes
      //httpOnly: true,
    };

    // Set cookie
    res.cookie("user", String(existinguser._id));
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname + "/" + "views" + "/login.html"));
  }
});
router.post("/signup", async (req, res) => {
  console.log("kk");
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  };
  console.log(data);
  const existinguser = await collection.create(data);
  await existinguser.save();
  console.log(existinguser);
  if (existinguser) {
    // alert("User already exists")
    console.log("hi");

    res.sendFile(path.join(__dirname + "/" + "views" + "/login.html"));
  } else {
    res.sendFile(path.join(__dirname + "/" + "views" + "/membership.html"));
  }
});
// router.post("/contact", async (req, res) => {
//   console.log("hi");

//   const data = {
//       name: req.body.cfname,
//       email: req.body.cfemail,
//       message: req.body.cfmessage,
//   };

//   try {
//       // Assuming `contact` is your Mongoose model for contacts
//       const newContact = await contact.insertOne(data);
//       console.log(newContact);
//       res.status(200).json({ message: "Contact form submitted successfully!" });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//   }
// });
router.post('/contact', async (req, res) => {
  console.log('post route working');
  console.log("hi");

  const data = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
  };

  try {
      // Assuming `contact` is your Mongoose model for contacts
      const newContact = await contact.insertMany(data);
     
      
      res.redirect("/");
  } catch (error) {
      console.error(error);
      res.redirect("/");
    
      
  }
});



module.exports = router;
