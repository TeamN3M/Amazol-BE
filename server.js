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

const itemRouters = require("./routers/item_routes");
app.use("/item", itemRouters);

const codeRouters = require("./routers/Code_routes");
app.use("/code", codeRouters);

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("build"));
//   app.get("*", (req) => {
// req.sendFile(path.resolve(__dirname, "build", "index.html"));

//   });
// }

// app.listen(port, (err) => {
//   if (err) console.log("ERROR!", err);
//   console.log(`Listening on port ${port}`);
// });

module.exports = app;
