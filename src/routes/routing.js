const express = require("express");
const routing = express.Router();
const service = require("../service/user");

//registers a user with given data
routing.post("/register", async (req, res, next) => {
  let userData = req.body;
  try {
    let data = await service.getRegistered(userData);

    //return custumer email as message when user registered successfully(data entered in database) 
    if(data)
    res.json({
      error: false,
      status: 250,
      message: `User registered with ${req.body.customerEmail}`,
    });
  } catch (err) {
    //return custumer email as message when user registered successfully(data entered in database) 
    res.json({ error: true, status: 255, message: err.message });
    next(err);
  }
});


//logins user with given credentials
routing.post("/login", async (req, res, next) => {
  //req body contains
  //1. email
  //2. password
  let email = req.body.email;
  let password = req.body.password;
  try {
    let data = await service.LoginCheck(email, password);
    if (data) {
      //return data of the user if successfully registered as data field
      res.json({ error: false, status: 250, data: data });
    }
  } catch (err) {
    //returns error message if login failed
    res.json({ error: true, status: 255, data: err.message });
    next(err);
  }
});


//adds products in cart passed in req
//req contains
//userId
//array of product object 
//  which contains
//  1. productId
//  2. productCount(can be negatve in order to remove/update product count)
routing.post("/addToCart", async (req, res, next) => {
  try {
    let cart_data = req.body;
    let cart_added = await service.cart(
      cart_data.productArray,
      cart_data.userId
    );
    if (cart_added) {
      res.json({ error: false, status: 250, message: "Added successfully" });
    }
  } catch (err) {
    res.json({ error: true, status: 255, message: err.message });
    next(err);
  }
});


//deletes the given product from cart
//req contains
//  userId
//  productId
routing.delete("/deleteFromCart", async (req, res, next) => {
  try {
    let product_delete = await service.deleteProductFromCart(
      req.body.userId,
      req.body.productId
    );
    if (product_delete) {
      //returns "deleted successfully" as message if deleted
      res.json({ error: false, status: 250, message: "deleted successfully" });
    }
  } catch (err) {
    //returns error message as message if failed to delete
    res.json({ error: true, status: 255, message: err.message });
    next(err);
  }
});

//update the product count in cart based on the req
//req contains
//  productId
//  userId
//  productQuantity
routing.put("/updateInCart", async (req, res, next) => {
  try {
    let updated_qty = req.body.productQuantity;
    let updated_product = await service.UpdateProductFromCart(
      req.body.productId,
      req.body.userId,
      updated_qty
    );
    if (updated_product) {
      res.json({ error: false, status: 250, message: "Updated successfully" });
    }
  } catch (err) {
    res.json({ error: true, status: 255, message: err.message });
    next(err);
  }
});


//place order 
//req body contains
//  productArray
//  userId
routing.post("/order", async (req, res, next) => {
  try {
    let post_order = await service.postOrder(
      req.body.productArray,
      req.body.userId
    );
    if (post_order) {
      //returns "Order placed successfully" if order successfully placed
      res.json({
        error: false,
        status: 250,
        message: "Order placed successfully",
      });
    }
  } catch (err) {
    //returns error message if order failed
    res.json({ error: true, status: 255, message: err.message });
    next(err);
  }
});

//return orders for a given user
//req contains
//  userId
routing.post("/getOrders", async (req, res, next) => {
  try {
    let getOrders = await service.getOrders(req.body.userId);
    if (getOrders.length > 0) {
      //returns orders placed by user as data
      res.json({ error: false, status: 250, data: getOrders });
    } else {
      //returns "no orders found" as if no data found in orders
      res.json({ error: true, status: 255, message: "no orders found" });
    }
  } catch (err) {
    //returns error message if error occurs
    res.json({ error: true, status: 255, message: err.message });
    next(err);
  }
});

//returns products incart for a given user
//req contains
//  userId
routing.post("/getInCart", async (req, res, next) => {
  try {
    let getInCart = await service.getInCart(req.body.userId);
    if (getInCart.length > 0) {
      //returns products in cart as data 
      res.json({ error: false, status: 250, data: getInCart });
    } else {
      //returns "Nothing in cart" as message 
      res.json({ error: true, status: 255, message: "Nothing in cart" });
    }
  } catch (err) {
    //returns error message if error occurs
    res.json({ error: true, status: 255, message: err.message });
    next(err);
  }
});
module.exports = routing;
