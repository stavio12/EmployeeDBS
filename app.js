const express = require("express");
const path = require("path");
const bodyParser = require("body-Parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

dotenv.config({ path: "./config.env" });

const employeeRoutes = require("./routes/employees");

//connecting to mongodb database
mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.static("public"));

//Middle wares

//middle ware for puting and deleting
app.use(methodOverride("_method"));

//middle ware for session express
app.use(
  session({
    secret: "trumu",
    resave: true,
    saveUninitialized: true,
  })
);

//middle ware for coonnect flash
app.use(flash());

//seeting messages variables globally
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");

  next();
});

app.use(employeeRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running on port 3000");
});







{/* <div class="col">

<div id="show"  class="form-group row">
<label for="dropdown">Show Entries:</label>
<div class="dropdown ">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown button</button>
    <div class="dropdown-menu form-control" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
    </div>
  </div>
</div>
</div> */}