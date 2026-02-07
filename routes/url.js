const express=require("express");
const {generatenewshortURL,handleGetAnalytics}=require("../controllers/url");
const router=express.Router();
router.post("/",generatenewshortURL);
router.get('/analytics/:shortID',handleGetAnalytics); 
module.exports=router;