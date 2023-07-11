const express = require('express');
const router = express.Router();
const product_service = require('../service/product')


//returns all product as response
router.get('/',async(req,res,next)=>{
    try{
    let data = await product_service.getProductDetails();
    if(data.length){
        res.json({error:false, status: 250, message:"All Data Fetched successfully","data":data});
    }
    }
    catch(err){
        res.json({error:true, status: 255, message:err.message});
        next(err);
    }
});

//returns a product base don id passed
router.get('/id/:id',async(req,res,next)=>{
    try{
    let id = req.params.id; 
    let data = await product_service.getProductDetailsById(id);
    if(data.length){
        res.json({error:false, status: 250, message:"Data Fetched successfully by ID","data":data});
    }
    }
    catch(err){
        res.json({error:true, status: 255, message:err.message});
        next(err);
    }
});

//returns products based on category 
router.get("/category/:category",async(req,res,next)=>{
    try{
    let category = req.params.category;
    let data = await product_service.getProductDetailsByCategory(category);
    if(data.length){
        res.json({error:false, status: 250, message:"Data Fetched successfully by category","data":data});
    }
    }
    catch(err){
        res.json({error:true, status: 255, message:err.message});
        next(err);
    }
})

//returns product with given search results
router.get('/search/:name',async(req,res,next)=>{
    try{
    let name = req.params.name; 
    let data = await product_service.getProductDetailsByName(name);
    if(data.length){
        res.json({error:false, status: 250, message:"Data Fetched successfully","data":data});
    }
    }
    catch(err){
        res.json({error:true, status: 255, message:err.message});
        next(err);
    }
});


router.post('/',async(req,res,next)=>{
    try{
        let data = req.body;
        let productDetails = await product_service.setProductDetails(data);
        if(productDetails==true){
            res.send("Details Entered successfully");
        }
        
    }
    catch(err){
        next(err);
    }

})



module.exports = router;