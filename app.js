const express = require("express");
const path = require("path");
const dotnev = require("dotenv").config();
const app = express();

const port = process.env.PORT ;
const indexRouter =require('./routers/index');
app.use('/',indexRouter);


const postRouters =require('./routers/post_routes');
app.use('/post',postRouters);

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});


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
