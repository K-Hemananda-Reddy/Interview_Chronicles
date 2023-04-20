const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const path=require('path')
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const PostController = require("./controllers/posts.controller");
const cors=require('cors');
const saltRounds = 10;
const User = require("./models/User");
const Post = require("./models/Post");
const fetchuser=require('./middleware/fetchUser')
const app = express();
const jwt=require("jsonwebtoken");
const port=process.env.port||4000;


const JWT_SECRET="CbitInterviewExperience"

app.use(express.json())


// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

///getAllPosts,/user/:rollno,/post/:postid,/home,/login,/signup,/home/user/:rollno,/home/createpost,/home/post/:postid,/
app.use(cors());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.use("/getAllPosts", PostController);
mongoose.connect("mongodb+srv://ragulpretish:Ragul2002@cluster0.ciiiuso.mongodb.net/test", {
  useNewUrlParser: true,
});


//User - Login
app.post("/login", async function (req, res) {
  let success=false
  const rollno = req.body.rollno;
  const password = req.body.password;

  try{
    const userDoc = await User.findOne({ rollno: rollno });
  if(!userDoc){
    return res.status(400).json({error:"Please try to login with correct credentials"})
  }
  const pass = bcrypt.compareSync(password, userDoc.password);
  if (pass) {
    const data={
      user:{
        id:userDoc.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET)
    success=true
    res.send({success,authtoken})
  } else {
    return res.status(400).json({success,error:"Please try to login with correct credentials"})
  }
  }catch(err){
    console.log(err);
    res.status(500).send("internal server error")
  }
  

});


//User-register
app.post("/register", async function (req, res) {
  // let success=false;


  

  // bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
  //   const newUser = new User({
  //     rollno: req.body.rollno,
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: hash,
  //   });
  //   newUser.save();
  //   res.json(newUser)
  // });
  let success=false;
    
    
    try{let user=await User.findOne({rollno:req.body.rollno})
    if(user){
        return res.status(400).json({success,error:"Sorry a user with this rollno already exists"})
    }
    const salt=await bcrypt.genSalt(10);
    let secPass=await bcrypt.hash(req.body.password,salt)
    user = await User.create({
      rollno: req.body.rollno,
          username: req.body.username,
          email: req.body.email,
          password: secPass,
    })

    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET)
    success=true
    res.json({success,authtoken})}catch(err){
        console.log(err.message);
        res.status(500).send("Something went wrong");
    }
});

//Blog-create
app.post("/create",fetchuser,async function(req, res){
  try{
    let success=false;
    userId=req.user.id;
    const user=await User.findById(userId).select('-password')
    const newPost = Post({
      rollno: user.rollno,
      username: user.username,
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags
    });
  
    newPost.save();
    success=true;
    res.send({success,newPost})
  }catch(err){
    console.log(err);
  }
  

})

app.post('/user/:rollno',fetchuser,async(req,res)=>{
  try{
    const user =await User.findOne({rollno:req.params.rollno})
    const posts=await Post.find({rollno:req.params.rollno})
    res.send({user,posts})
  }catch(err){
    console.log(err)
  }
})

app.post('/getAllPosts',fetchuser,async(req,res)=>{
  try{
    
    const posts=await Post.find().sort({createdAt:-1}).limit(15)
    // res.set('Content-Type', 'application/json')
    res.send({posts})
  }catch(err){
    console.log(err)
  }
})

app.post('/search',fetchuser,async(req,res)=>{
  try{
    
    const posts=await Post.find({tags:req.body.search});
    res.send({posts});
  }catch(err){
    console.log(err);
  }
})

// app.patch("/",function(req, res){
//   Post.update(
//     {title: articleTitle},
//     {content: req.body.newContent},
//     function(err){
//       if (!err){
//         res.send("Successfully updated selected article.");
//       } else {
//         res.send(err);
//       }
//     });
// })


app.post('/getuser',fetchuser,async(req,res)=>{

  try{
      userId=req.user.id;
      const user=await User.findById(userId).select('-password')
      res.send(user)
  }catch(err){
      console.log(err.message);
          res.status(500).send("Something went wrong");
  }
  })

  app.post('/post/:postid',fetchuser,async(req,res)=>{
    try{
      postId=req.params.postid;
      const post=await Post.findById(postId)
      res.send(post);
    }catch(err){
      console.log(err);
    }
  })

  app.post('/createComment',fetchuser,async(req,res)=>{
  try{
      postid=req.body.postid;
      username=req.body.username
      comment=req.body.comment
      newComment = await Comment.create({
          postid,
          username,
          comment
      })
      res.send(newComment);
  }catch(err){
    console.log(err);
  }
})

app.post('/getComments',fetchuser,async(req,res)=>{
    try{
      postid=req.body.postid;
      const comments=await Comment.find({postid});
      res.send(comments)
    }catch(err){
      console.log(err);
    }
})

  

app.listen(`${port}`, function () {
  console.log("Server started on port 4000.");
});
