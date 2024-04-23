const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const collection = require("./mongodb");
const contact = require("./contactdb");
let alert = require("alert");
require("dotenv").config()



const bodyParser = require('body-parser')
const admin = require('./route')

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.json());
app.use(cors());



app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({ extended: false}))
app.use(admin)

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname+".."+"views"+ "index.html"));
// });
// app.get("/login.html", (req, res) => {
//   res.sendFile(path.join(__dirname + "/login.html"));
// });
// app.get("/login", (req, res) => {
//   res.sendFile(path.join(__dirname + "/index.html"));
// });
// app.get("/index.html", (req, res) => {
//   res.sendFile(path.join(__dirname + "/index.html"));
// });
// app.get("/signup", (req, res) => {
//   res.sendFile(path.join(__dirname + "/index.html"));
// });
// app.get("/membership.html", (req, res) => {
//   res.sendFile(path.join(__dirname + "/membership.html"));
// });
// // app.post('/login.html', async(req, res) => {
// //     // console.log('post route working');
// //     // res.sendFile(path.join(__dirname + '/index.html'));
// //     const data ={
// //         name:req.body.cfName,
// //         email:req.body.cfEmail,
// //         message:req.body.cfMessage
// //     }

// //    const user= await contact.insertMany(data)
// //     console.log(user)
// // });

// // app.post('/login.html',async (req, res) => {

// // const data={
// //     name:req.body.name,
// //     email:req.body.email,
// //     password:req.body.password,
// //     phone:req.body.phone
// // }

// // await collection.insertMany(data)
// //  res.sendFile(path.join(__dirname + '/index.html'));
// // })
// // app.post("/checkout",asyn(req, res) => {
// //     try{
// //         const session = await stripe.checkout.sessions.create({
// //             payment_method_types:["card"],
// //             mode:"payment",
// //             line_items:req.body.items.map(item=>{
// //                 return {
// //                     pricce_data:{
// //                         currency:"inr",
// //                         product_data:{
// //                             name:item.name
// //                         },
// //                         unit_amount:(item.price)*100,

// //                     },
// //                     quantity:item.quantity
// //                 }
// //             }),
// //             success_url:"http://http://localhost:3000/",
// //             cancel_url:"http://localhost:3000"
// //         })
// //         res.json(url:session.urld)
// //     } 
// //     catch(error){

// //     }
// // })

// app.post("/signup", async (req, res) => {
//   const data = {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     phone: req.body.phone,
//   };

//   const existinguser = await collection.findOne({ name: data.name });
//   if (existinguser) {
//     // alert("User already exists")
//     console.log("hi");
//   } else {
//     const saltRounds = 10;
//     const hashedpassword = await bcrypt.hash(data.password, saltRounds);

//     await collection.insertMany(data);
//     console.log("ui");
//     res.sendFile(path.join(__dirname + "/login.html"));
//     console.log("ui");
//   }
// });
// app.post("/membership.html", async (req, res) => {
//   const data = {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     phone: req.body.phone,
//   };

//   const existinguser = await collection.findOne({ name: data.name });
//   if (existinguser) {
//     // alert("User already exists")
//     console.log("how are you");
//   } else {
//     const saltRounds = 10;
//     const hashedpassword = await bcrypt.hash(data.password, saltRounds);

//     await collection.insertMany(data);
//     console.log("qw");
//     res.sendFile(path.join(__dirname + "/login.html"));
//   }
// });

// app.post("/login.html", async (req, res) => {
//   try {
//     const check = await collection.findOne({ name: req.body.username });
//     if (!check) {
//       // alert("user name cannot found. Please try again")
//       console.log("kemcho");
//     }

//     const ispassword = await bcrypt.compare(req.body.password, check.password);
//     if (ispassword) {
//       console.log("user password");
//       res.sendFile(path.join(__dirname + "/index.html"));
//       console.log("User password");
//     } else {
//       // alert("wrong password. Please try again")
//       console.log("qwret");
//     }
//   } catch {
//     // alert("wrong details")
//     console.log("error");
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const check = await collection.findOne({ name: req.body.username });
//     if (!check) {
//       // alert("user name cannot found. Please try again")
//       console.log("juh");
//     }

//     const ispassword = await bcrypt.compare(req.body.password, check.password);
//     if (ispassword) {
//       res.redirect("/");
//       console.log("gfgb");
//     } else {
//       // alert("wrong password. Please try again")
//       console.log("jncjncdc");
//     }
//   } catch {
//     // alert("wrong details")
//     console.log("jbjfnsksl");
//   }
// });

// // app.post("/", async (req, res) => {
// //   const data1 = {
// //     name: req.body.cfname,
// //     email: req.body.cfemail,
// //     message: req.body.cfmessage,
// //   };
// //   const re = await contact.insertMany(data1);
// //   console.log("love");
// // });
// // app.post("/contact", async (req, res) => {
// //   const data1 = {
// //     name: req.body.cfname,
// //     email: req.body.cfemail,
// //     message: req.body.cfmessage,
// //   };
// //   const re = await contact.insertMany(data1);
// //   console.log("loveu");
// // });


// app.post("/contact", async (req, res) => {
//     try {
//       const data = {
//         name: req.body.cfname,
//         email: req.body.cfemail,
//         message: req.body.cfmessage,
//       };
  
//       // Create a new document in the Contact collection
//       const newContact = await contact.create(data);
  
//       // Send a success response to the client
//       res.status(201).json({ message: "Contact created successfully", contact: newContact });
//     } catch (error) {
//       // Log the error to the console
//       console.error("Error creating contact:", error);
//       // Send an error response to the client
//       res.status(500).json({ error: "Failed to create contact" });
//     }
//   });
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
