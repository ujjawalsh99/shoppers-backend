const dbModel = require('../model/product');
// Initialize the product service object
let ProductService={}

//fetching all product details
ProductService.getProductDetails=async()=>{

        //calling getProductDetails from model product
        let data = await dbModel.getProductDetails();
        if(data.length){
            //returning the products array fetched from model/products
        return data;
    }
    else{
        let err=new Error("No data found");
        err.status=404;
        throw err;
    }
}


// to set all the details for products(optional using postman)
ProductService.setProductDetails = async(dataObj) =>{
    let data = await dbModel.setDetails(dataObj);
    if(data){
        return true;
    }
    else{
        return false;
    }
}


// to fetch the product details by product id
ProductService.getProductDetailsById=async(id)=>{
    

        let data = await dbModel.getProductDetailsById(id);
        if(data.length){
            // return the fetched product details for specific id
        return data;
    }
    else{
        let err=new Error("No data found");
        err.status=404;
        throw err;
    }
}


// to fetch all the product details by category
ProductService.getProductDetailsByCategory=async(category)=>{
    

        let data = await dbModel.getProductDetailsByCategory(category);
        if(data.length){
            // returns the fetched product array from model/product
        return data;
    }
    else{
        let err=new Error("No data found");
        err.status=404;
        throw err;
    }
}


// implemented search functionality-by name
ProductService.getProductDetailsByName=async(searchFor)=>{
    
  
        let data = await dbModel.getProductDetails();
        let returnData = []
        if(data.length){
            for(let product of data){
                let name = product.pName;
                if(name.toLowerCase().includes(searchFor.toLowerCase())){
                    returnData.push(product);
                }

            }
            // return the fetched product array by name filter
            return returnData;
    }
    else{
        let err=new Error("No data found");
        err.status=404;
        throw err;
    }
}

module.exports = ProductService;
