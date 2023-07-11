const mongoose = require("mongoose");
let url="mongodb://localhost:27017/Userdata";

//user schema def
const User = 
  new mongoose.Schema({
    customerEmail: {
      type: String,
      required: true,
      match: [
        /^[a-zA-z0-9._]*?@(gmail|infosys|infy|yahoo|gov).(com|in)$/,
        "Invalid Email",
      ],
    },
    customerName: {
      type: String,
      required: true,
      match: [/^[a-zA-Z ]*$/, "Invalid Name"],
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^[1-9][0-9]{9}$/, "Invalid Phone Number"],
    },
    password: {
      type: String,
      required: true,
      match: [
        /(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$/,
        "Invalid password",
      ],
    },
    address: {
      type: String,
      required: true,
      minlength: 10,
      match: [/^[.0-9a-zA-Z ,-]+$/, "Invalid address"],
    },
    ucart: [
      {
        productId: { type: String, required: true },
        productCount: { type: Number, default: 1 },
      },
    ],
    uorder: [
      {
        productId: { type: String, required: true },
        productCount: { type: Number, default: 1 },
        totalcost: { type: Number, required: true },
        orderDate: {type : Date, default: Date.now},
        productName:{type:String, required:true}
      },
    ],
  })
;


//productschema def
const Product = 
  new mongoose.Schema({
    pName: {
      type: String,
      required: true,
    },
    pDescription: {
      type: String,
      required: true,
    },
    pRating: {
      type: Number,
      required: true,
    },
    pCategory: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    specification: {
      type: String,
      required: false,
    },
    dateFirstAvailable: {
      type: Date,
      required: true,
    },
    dateLastAvailable: {
      type: Date,
      required: true,
    },
    pSeller: {
      s_Id: {
        type: String,
        required: true,
      },
      pDiscount: {
        type: Number,
        required: true,
      },
      pQuantity: {
        type: Number,
        required: true,
      },
      pShippingCharges: {
        type: Number,
        required: true,
      },
    },
  });

//user schema 
const userSchema = mongoose.Schema(User, {collection:'Users', timestamps: true});
//product schema
const productSchema = mongoose.Schema(Product, {collection:'Products', timestamps: true});

let connection = {}

//Returns model object of "Users" collection
connection.getUserCollection = () => {
    //Establish connection and return model as promise
    return mongoose.connect(url, {useNewUrlParser: true}).then( database => {
        return database.model('Users', userSchema)
    }).catch( error => {
        let err = new Error(error.message);
        err.status = 500;
        throw err;
    });
}

//return model object of "product collection"
connection.getProductCollection = () => {
    //Establish connection and return model as promise
    return mongoose.connect(url, {useNewUrlParser: true}).then( database => {
        return database.model('Products', productSchema)
    }).catch( error => {
        let err = new Error(error.message);
        err.status = 500;
        throw err;
    });
}

module.exports = connection;
