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
Eapp.get("/order/:id", async (req, res) => {
  try {
    const TheOrder = await OrderM.findById(req.params.id);
    res.send(TheOrder);
  } catch (error) {
    console.log(error);
  }
});
Eapp.put("/updateorder/:id", async (req, res) => {
  const order = await OrderM.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    console.log("there is something wrong");
  }
});
Eapp.get("/paypal", (req, res) => {
  res.send(process.env.PAYPAL_ID);
});

Eapp.get("/userOrders/:id", async (req, res) => {
  try {
    const userOrders = await OrderM.find({ user: req.params.id });
    res.json(userOrders);
    console.log(userOrders, "ali hheshamamaam");
  } catch (error) {
    console.log(error, "rrr");
  }
});
Eapp.get("/allUsers", async (req, res) => {
  const allUsers = await UserM.find();
  res.send(allUsers);
});
Eapp.delete("/deleteUser/:id", async (req, res) => {
  UserM.deleteOne({ _id: req.params.id }).then((result) => {
    res.send(result);
  });
});
Eapp.get("/editUserAdmin/:id", async (req, res) => {
  try {
    const editUser = await UserM.findById(req.params.id);
    res.send({
      name: editUser.name,
      email: editUser.email,
      isAdmin: editUser.isAdmin,
    });
  } catch (error) {
    res.send(error);
  }
});
Eapp.put("/adminUpdate/:id", async (req, res) => {
  const adminUpdate = await UserM.findById(req.params.id).exec();
  adminUpdate.set(req.body);
  const result = await adminUpdate.save();
  res.send(result);
});

Eapp.post("/createProduct", async (req, res) => {
  try {
    const {
      user,
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
    } = req.body;
    const newProduct = new ProductM({
      user,
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
    });
    const createdProduct = await newProduct.save();
    res.send(createdProduct);
  } catch (error) {
    res.send(error);
  }
});
Eapp.put("/editProduct/:id", async (req, res) => {
  try {
    const product = await ProductM.findById(req.params.id).exec();
    product.set(req.body);
    const updatedProduct = await product.save();
    res.send(updatedProduct);
  } catch (error) {
    res.send(error);
  }
});
Eapp.delete("/deleteProduct/:id", async (req, res) => {
  ProductM.deleteOne({ _id: req.params.id }).then((result) => {
    res.send(result);
  });
});
Eapp.get("/allorders", async (req, res) => {
  const allOrders = await OrderM.find();
  res.send(allOrders);
});
const PORT = process.env.PORT || 5000;

Eapp.put("/updateOrderAdmin/:id", async (req, res) => {
  try {
    const oneOrder = await OrderM.findById(req.params.id).exec();
    oneOrder.set(req.body);
    const updatedOrder = await oneOrder.save();
    res.send(updatedOrder);
  } catch (error) {
    res.send(error);
    console.log(error, "ali heshammmmm ");
  }
});
Eapp.get("/carouselproducts", (req, res) => {
  const products = ProductM.find().limit(3);
  products.then((result) => {
    res.send(result);
  });
});

Eapp.listen(PORT, console.log(` server is runnig on port ${PORT}`));
