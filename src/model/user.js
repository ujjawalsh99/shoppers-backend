//const { connection } = require("mongoose");
const collection = require("../utilities/connection");
// const { Product } = require("../utilities/connection");
//const { getProductDetailsById } = require("./product");

let user = {};

//registers a user
user.registerUser = async (userData) => {
  let User = await collection.getUserCollection();

    //checks for a given a given email in database
    let find_data = await User.findOne({
      customerEmail: userData.customerEmail,
    });
    // if email exist throws error
    if (find_data) {
      let err = new Error("Given email already exist!");
      err.status = 255;
      throw err;
    } else {
      //else registers a user
      let data = await User.create(userData);
      if (data) {
        return true;
      } else {
        let err = new Error("Invalid Data");
        err.status = 255;
        throw err;
      }
    }
  
};

//login a user
user.loginUser = async (email, password) => {
  let User = await collection.getUserCollection();

    //checks for given email and password
    let check = await User.findOne({
      customerEmail: email,
      password: password,
    });
    //if user found with correct credentials
    //returns user data
    if (check) {
      return check;
    } else {
    //throw error if not found
      let err = new Error("Invalid Credentials!!");
      err.status = 255;
      throw err;
    }
  
};

//checks whether given product exist in cart or not
//returns true if exist
//else returns false
user.checkProductInCart = async (productId, userId) => {
  let User = await collection.getUserCollection();

    let inCart = await User.find({
      _id: userId,
      ucart: { $elemMatch: { productId: productId } },
    });
    if (inCart.length == 0) {
      return false;
    } else {
      return true;
    }
  
};

//checks whether prouduct exist in cart or not
//if
//calls increaseProductFromCart
//else
//add product in cart with count specified
user.addProductToCart = async (productArray, userId) => {
  let User = await collection.getUserCollection();

    for (let product of productArray) {
      let productInCart = await user.checkProductInCart(
        product.productId,
        userId
      );
      if (productInCart) {
        let incProductCount = await user.increaseProductFromCart(
          product.productId,
          userId,
          product.productCount
        );
        if (incProductCount) {
          continue;
        } else {
          let err = new Error("Unable to add all product into cart");
          err.status = 404;
          throw err;
        }
      } else {
        let update_user = await User.updateOne(
          { _id: userId },
          { $push: { ucart: product } }
        );
        if (update_user.nModified) {
          return true;
        } else {
          let err = new Error("Unable to add product into cart");
          err.status = 404;
          throw err;
        }
      }
    }
    return true;

};


//deletes given product from cart
user.deleteProductFromCart = async (userId, productId) => {
  let User = await collection.getUserCollection();

    //deletes from database
    let delete_product = await User.updateOne(
      { _id: userId },
      { $pull: { ucart: { productId: productId } } }
    );
    //checks whether deleted or not
    //if
    //  return true
    if (delete_product) {
      return true;
    } else {
    //else
    //  throws error
      let err = new Error("Unable to delete product from cart!!");
      err.status = 255;
      throw err;
    }

};
//update product detains in cart
user.UpdateProductFromCart = async (productId, userId, qty) => {
  let User = await collection.getUserCollection();

    //update in database
    let updated_product = await User.updateOne(
      { _id: userId, "ucart.productId": productId },
      { $set: { "ucart.$.productCount": qty } }
    );
    //if updated
    // return true
    if (updated_product) {
      return true;
    } else {
      //else
      //throw err
      let err = new Error("Not updated in cart!");
      err.status = 255;
      throw err;
    }

};

//increase the product count in cart by the quantity(qty) specified
user.increaseProductFromCart = async (productId, userId, qty) => {
  let User = await collection.getUserCollection();

    //checks wheteher product exist in cart or not
    let inCart = await User.findOne(
      { _id: userId, "ucart.productId": productId },
      { _id: 0, "ucart.productCount.$": 1 }
    );

    //checks if user is trying to delete th product from cart
    //if
    //  delete the product and return the result
    if (inCart.ucart[0].productCount == -qty) {
      return await user.deleteProductFromCart(userId, productId);
    }

    //update product qunatity
    let updated_product = await User.updateOne(
      { _id: userId, "ucart.productId": productId },
      { $inc: { "ucart.$.productCount": qty } }
    );

    //checks if updated or not
    if (updated_product.nModified) {

      //returns if updated
      return true;
    } else {
      //else
      //throw error
      let err = new Error("Not updated in cart!");
      err.status = 255;
      throw err;
    }
 
};


//chceks availability of a product
user.Availabilty = async (product) => {
  let Product = await collection.getProductCollection();

    let avail_data = await Product.findOne({ _id: product.productId });
    if (avail_data.pSeller.pQuantity >= product.productCount) {
      //return true if available
      return true;
    } else {
      //else
      //   throw err
      let err = new Error("not enough products in stock!");
      err.status = 255;
      throw err;
    }

};


//adds a order in order list
user.postOrder = async (product, userId) => {
  let User = await collection.getUserCollection();
  let Product = await collection.getProductCollection();

    // let avail_data = await Product.findOne({'_id':product.productId});
    let proudct_update = await Product.updateOne(
      { _id: product.productId },
      { $inc: { "pSeller.pQuantity": -product.productCount } }
    );
    //updating product availability
    if (proudct_update.nModified) {
      let productName = "";
      productName = await Product.findOne(
        { _id: product.productId },
        { _id: 0, pName: 1 }
      );
      product.productName = productName.pName;
      let updated_order = await User.updateOne(
        { _id: userId },
        { $push: { uorder: product } }
      );
      //updating user orders
      if (updated_order.nModified) {
        let updated_cart = await User.updateOne(
          { _id: userId },
          { $set: { ucart: [] } }
        );
        //updating user cart
        if (updated_cart.nModified) {
          return true;
        } else {
          let err = new Error("not able to update cart");
          err.status = 255;
          throw err;
        }
      } else {
        let err = new Error("not able to place order");
        err.status = 255;
        throw err;
      }
    } else {
      let err = new Error("not able to update product availability");
      err.status = 255;
      throw err;
    }

};


//returns products in user order
user.getOrders = async (userId) => {
  let userModel = await collection.getUserCollection();
  try {
    //extract orders of a user
    let orderArray = await userModel.findOne(
      { _id: userId },
      { _id: 0, uorder: 1 }
    );
    //return order array
    if (orderArray) return orderArray["uorder"];
    else {
      //throw error
      let error = new Error("Check user id");
      error.status = 255;
      throw error;
    }
  } catch (err) {
    let error = new Error("Check user id");
    error.status = 255;
    throw error;
  }
};

//returns products in cart
user.getCartData = async (userId) => {
  let userModel = await collection.getUserCollection();
  let productModel = await collection.getProductCollection();

    //extract products in cart
    let cartArray = await userModel.findOne(
      { _id: userId },
      { _id: 0, ucart: 1 }
    );
    let returnData = [];

    if (cartArray) {
      for (let product of cartArray["ucart"]) {
        let rData = { productCount: product.productCount };
        let productId = product.productId;
        //add one more attribute productData to rData
        let p = await productModel.findOne({ _id: productId });
        rData.productData = p;
        returnData.push(rData);
      }
      return returnData;
    } else {
      let error = new Error("Check user id");
      error.status = 255;
      throw error;
    }

};

module.exports = user;
