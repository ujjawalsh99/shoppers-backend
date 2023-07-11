const express = require("express");
const app = express();
const cors = require("cors");
const errorLogger = require("./utilities/errorlogger");
const requestLogger = require("./utilities/requestlogger");
const router = require("./routes/routing");
const router_product = require("./routes/product_routing");
const create = require('./model/dbSetup');

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/user", router);

app.use("/product", router_product);

app.use("/setupDB", async (req, res, next) => {
  await create.setupDBproduct();
  create.setupDB().then( response =>{
      if(response) res.json({ message : "Successfully inserted "+ response +" documents into database"})
  }).catch( error =>{
     next(error);
  })
});

app.use(errorLogger);

app.listen(3000, () => {
  console.log("Server started at 3000!");
});