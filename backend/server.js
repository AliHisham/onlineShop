const express = require("express");
const Eapp = express();
const products = require("./data/products");
const dotenv = require("dotenv");
const Configdb = require("./DbConfig/dbconfig");
const ProductM = require("./models/products");
const UserM = require("./models/users");
const OrderM = require("./models/order");
const jwt = require("jsonwebtoken");

dotenv.config();
Configdb();
Eapp.use(express.json());

Eapp.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

Eapp.get("/", (req, res) => {
  res.send("server is runninnnnngg");
});
Eapp.get("/products", (req, res) => {
  const products = ProductM.find();
  products.then((result) => {
    res.send(result);
  });
});
Eapp.get("/product/:id", async (req, res) => {
  try {
    const oneProduct = await ProductM.findById(req.params.id);
    res.send(oneProduct);
  } catch (error) {
    console.error(`${error} ali hesham is here`);
  }
});

Eapp.post("/user/login", (req, res) => {
  UserM.findOne({ email: req.body.email, password: req.body.password })
    .then((result) => {
      res.send({
        id: result._id,
        name: result.name,
        type: result.isAdmin,
        token: jwt.sign({ id: result._id }, "secreeet", { expiresIn: "20d" }),
      });
    })

    .catch((error) => {
      console.log(error, "ali hesham from backend");
      res.status(401).send({ e: error });
    });
});

Eapp.post("/user/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await UserM.findOne({ email });
  if (userExists) {
    res.status(404).json({ err: "error" });
  }
  UserM.create({
    name,
    email,
    password,
  })
    .then((result) => {
      console.log(result, "ali hesham from backend");
      res.status(202).send({
        id: result._id,
        name: result.name,
        email: result.email,
        token: jwt.sign({ id: result._id }, "secreeet", { expiresIn: "20d" }),
      });
    })
    .catch((err) => {
      console.log(err, "ali baccc again");
    });
});

Eapp.get("/profile/:id", async (req, res) => {
  try {
    const user = await UserM.findById(req.params.id);
    res.send({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } catch (error) {
    console.log(error);
  }
});
Eapp.put("/update/:id", async (req, res) => {
  const updateProfile = await UserM.findById(req.params.id).exec();
  updateProfile.set(req.body);
  const response = await updateProfile.save();
  res.send(response);
});

Eapp.post("/create/order", async (req, res) => {
  const {
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length == 0) {
    res.status(400);
    throw new Error("ther is no items");
    return;
  } else {
    const order = new OrderM({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.send(createdOrder);
  }
});

const PORT = process.env.PORT;

Eapp.listen(PORT, console.log(` server is runnig on port ${PORT}`));
