const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
const  cors=require("cors");
app.use(cors());
const  bcrypt=require("bcryptjs")

const  jwt=require("jsonwebtoken");
const JWT_SECRET="fhghgkdgdjdhv@DSDShczxudsgyqwuqwireirusdfgugv123234345(*(()()())";




const mongoUrl = "mongodb+srv://vipulvarshney6024:8P7msmjme3x725Ne@cluster0.fjebd2r.mongodb.net/login_mern?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log(error);
  });

require("./userDetails");
const User = mongoose.model("userInformation");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const encryptedPassword=await bcrypt.hash(password,10);
  
  try {
    const oldUser= await User.findOne({email});
    if(oldUser){
       return res.send({error:"user exists"});
    }
    await User.create({
      fname,
      lname,
      email,
      password:encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});
app.post("/login-user",async (req,res)=>{
    const{email,password}=req.body;
    const  user=await User.findOne({email});
    if(!user){
        return res.json({error:"user not  found"});
    }
    if (await bcrypt.compare(password,user.password)){
        const token=jwt.sign({email:user.email}, JWT_SECRET);
        if(res.status(201)){
            return res.json({status:"ok",data:token});
        }
        else{
            return res.json({error:"error"});
        }
    }
    res.json({status:"error",error:"invalid  password"});
});

app.post("/userData",async (req,res)=>{
    const {token}=req.body;
    try{
        const user=jwt.verify(token,JWT_SECRET);
        const useremail=user.email;
        User.findOne({email:useremail})
        .then((data)=>{
            res.send({status:"ok",data:data});
        })
        .catch((error)=>{
            res.send({status:"error",data:error});
        });
    }catch(error){

    }
});

app.get('/get', function (req, res) {
  res.send("hello world");
});

app.listen(5049, () => {
  console.log("Server started");
});
