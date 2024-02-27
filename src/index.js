const express = require("express");
const {engine} = require("express-handlebars");
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const route = require("./routes");
const app = express();
const port = process.env.PORT || 8081;
const {connection, sequelize} = require("./config/Connection");

//Connect DB
connection();
// connection.query("SELECT * FROM members", function (err, results, fields) {
//   console.log(">>> result=", results); // results contains rows returned by server
// });

//post
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//static file
app.use("/user", express.static(path.join(__dirname, "public")));

//Cookie
app.use(cookieParser());

// Template engine
app.engine(
  "hbs",
  engine({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
route(app);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
