const express=require("express");
const{signuponly,login}=require("../controllers/user");
const router=express.Router();
  router.post("/",signuponly);
  router.post("/login",login);
module.exports=router;
 

