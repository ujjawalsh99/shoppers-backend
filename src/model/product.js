const collection = require('../utilities/connection');
// product object
let product={}

//fetch details from db for all products
product.getProductDetails=async()=>{
    let Product = await collection.getProductCollection();
 
  
    let data= await Product.find({'pSeller.pQuantity':{$gt:1}});
    // returns list of products having some qty
    if(data){
        return data;
    }
   
}

// to set details of all products
product.setDetails=async(dataObj)=>{
    let Product = await collection.getProductCollection();
 
 
        let data=await Product.insertMany(dataObj);
        if(data){
            return true;
        }
        else{
            let err= new Error("Data not inserted!!");
            err.status=255;
            throw err;
        }
  
}

//to fetch details of product having the id as same as parameter
product.getProductDetailsById=async(id)=>{
    let Product = await collection.getProductCollection();
 

        let data = await Product.find({'_id':id});
        // data consist of the matching product if found
        if(data){
            return data;
        }
  
}

// to fetch product by category 
product.getProductDetailsByCategory=async(category)=>{
    let Product = await collection.getProductCollection();
 

        let data = await Product.find({'pCategory':category,'pSeller.pQuantity':{$gt:1}});
        // to fetch all products having category as same as parameter
        if(data){
            return data;
        }

}


// product object is exported
module.exports=product;
