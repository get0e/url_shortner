const express=require("express");
const path=require("path");
const cookieparser=require('cookie-parser')
const user=require("./routes/user")
const {connecttomongo}=require("./connect");
const {restricttologgedinuseronly}=require('./middleweres/auth');

const URL=require("./models/url");

const urlroute=require("./routes/url");
const staticroute=require("./routes/staticrouter")
const userRoutes=require('./routes/user');
const app =express();

const PORT=8001;
connecttomongo('mongodb://localhost:27017/short-url')
.then(()=>console.log("MONGODB IS CONNECTED"))
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use(express.json()); 
app.use(cookieparser()); 
app.use(express.urlencoded({extended:false}));
// app.get("/test",async(req,res)=>{
//     const allUrls=await URL.find({});
//     return res.render("home",{
//         urls:allUrls,
//     }); 
// }) 
app.use("/url",restricttologgedinuseronly,urlroute); 
app.use("/",staticroute);
app.use("/user",userRoutes);
app.get("/:shortID",async(req,res)=>{
    const shortId=req.params.shortID;
   const entry= await URL.findOneAndUpdate ({
       shortID: shortId
    },{$push:{
        visithistory:{
            timestamp:Date.now()},
    },},{new:true});
    if(!entry){
        return res.status(404).send("short url not found")
    }
    entry.visithistory.forEach(v => 
    v.timestamp = new Date(v.timestamp).toLocaleString()
  );
//   return res.json(entry.visithistory);

    res.redirect(entry.redirecturl);
});
app.listen(PORT,()=>console.log(`SERVER IS RUNNING AT ${PORT}`)); 