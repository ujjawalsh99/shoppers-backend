const dbModel = require("../model/user");

let Userservice = {};


//calls registerUser and returns the data returned by the called function
Userservice.getRegistered = async (userData) => {
    let data = await dbModel.registerUser(userData);
    return data;
  
  // if (data) {
  //   return data;
  // } else if (data == "User data exist") {
  //   let err = new Error("User data exist");
  //   err.status = 404;
  //   throw err;
  // } else {
  //   let err = new Error("Invalid Data");
  //   err.status = 404;
  //   throw err;
  // }
};

//calls loginUser of Model/user and returns the data returned by the called function
Userservice.LoginCheck = async (email, password) => {

    let data = await dbModel.loginUser(email, password);
    if (data) {
      return data;
    }

};

//calls addProductToCart of Model/user and returns the data returned by the called function
Userservice.cart = async (productArray, userId) => {

    let cart_data = await dbModel.addProductToCart(productArray, userId);
    if (cart_data) {
      return true;
    }

};

//calls loginUser of Model/user 
//returns true if deleted
//else throw error
Userservice.deleteProductFromCart = async (userId, productId) => {

    let delete_product = await dbModel.deleteProductFromCart(userId, productId);

    if (delete_product) {
      return true;
    } else {
      let err = new Error("Data not deleted");
      err.status = 404;
      throw err;
    }

};

//calls loginUser of Model/user 
//returns true if updated 
//else throw error
Userservice.UpdateProductFromCart = async (productId, userId, qty) => {

    let updated_product = await dbModel.UpdateProductFromCart(
      productId,
      userId,
      qty
    );
    if (updated_product) {
      return true;
    }

};

Userservice.postOrder = async (productArray, userId) => {

    //checks for each products availability
    //if any of the product is not available returns false
    for (let product of productArray) {
      if (!(await dbModel.Availabilty(product))) {
        return false;
      }
    }
    //if all the products are available
    //adds the product in user order list
    for (let product of productArray) {
      if (!(await dbModel.postOrder(product, userId))) {
        return false;
      }
    }
    return true;

};


//calls getOrders of Model/user and returns the data returned
Userservice.getOrders = async (userId) => {

    let userOrders = await dbModel.getOrders(userId);
    return userOrders;

};

//calls getCartData of Model/user and return the returned data
Userservice.getInCart = async (userId) => {

    let userCartData = await dbModel.getCartData(userId);
    return userCartData;

};
module.exports = Userservice;
