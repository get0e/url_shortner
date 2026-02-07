const mongoose=require("mongoose");
async function connecttomongo(url){
    return mongoose.connect(url);
}
module.exports={
    connecttomongo,
};