const express = require("express");
const path = require("path");
const dotnev = require("dotenv").config();
const bodyParser = require("body-parser");
const cros = require("cors");

const app = express();

if (process.env.NODE_ENV == "development") {
  const swaggerUI = require("swagger-ui-express");
  const swaggerJsDoc = require("swagger-jsdoc");
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Amazol API",
        version: "1.0.0",
        description: "A simple Express Library API for the amazing amazol site"
      },
      servers: [{ url: "http://localhost:" + process.env.PORT }]
    },
    apis: ["./routers/*.js"]
  };
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}

app.use(
  cros({
    origin: "*"
  })
);

const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: true, limit: "1m" }));
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("db connected!");
});

const port = process.env.PORT;
const indexRouter = require("./routers/index");
app.use("/", indexRouter);

const postRouters = require("./routers/post_routes");
app.use("/post", postRouters);

const authRouters = require("./routers/auth_routes");
app.use("/auth", authRouters);

const userRouters = require("./routers/user_routes");
app.use("/user", userRouters);

const itemRouters = require("./routers/item_routes");
app.use("/item", itemRouters);

const codeRouters = require("./routers/Code_routes");
app.use("/code", codeRouters);

const cartRouters = require("./routers/cart_routes");
app.use("/cart", cartRouters);

const orderRouters = require("./routers/order-routes");
app.use("/orders", orderRouters);

const deliveryRouters = require("./routers/delivery_routes");
app.use("/delivery", deliveryRouters);

const addressRouters = require("./routers/address_routes");
app.use("/address", addressRouters);

const creditRouters = require("./routers/credit_routes");
app.use("/credit", creditRouters);

module.exports = app;
