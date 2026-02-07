const shortid=require('shortid');
const URL=require('../models/url');
async function generatenewshortURL(req, res) {
    const body=req.body;
    if(!body.url)return res.status(400).json({error:'url is required'})

const shortID=shortid();
await URL.create({
    shortID:shortID,
    redirecturl:body.url,
    visithistory:[],

})
return res.render("home",{
    id:shortID,
});
}
async function handleGetAnalytics(req,res) {
     const shortID=req.params.shortID;
     const result=await URL.findOne({shortID});
     return res.json({totalClicks:result.visithistory.length,
        analytics: result.visithistory,
     });
}
module.exports={
    generatenewshortURL,
    handleGetAnalytics,
};