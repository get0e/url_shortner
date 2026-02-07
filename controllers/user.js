const User=require("../models/user");
const {v4:uuid}=require('uuid')
const {setUser}=require('../service/auth')
async function signuponly(req,res){
    const{name,email,password}=req.body;
    await User.create({
        name,email,password,
    });
    return res.redirect("/");
}
async function login(req,res){
    const{email,password}=req.body;
    const user=await User.findOne({email,password})
    if(!user) return res.render("login",{
    error:"invalid username or password"
    
        });  
        // const sessionId=uuid();
    const token=setUser(user);  
    res.cookie("uid",token);
    return res.redirect("/");
}
module.exports={signuponly,login,};