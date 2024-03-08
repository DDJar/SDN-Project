var createError = require("http-errors");
var express = require("express");
//session
var session = require("express-session");
var FileStore = require("session-file-store")(session);

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const Dishes = require("./models/dishes");
const Class = require("./models/class");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dishRouter = require("./routes/dishRouter");
var classRouter = require("./routes/clasRouter");
var uploadRouter = require("./routes/uploadRouter");
//passport
var passport = require("passport");
var authenticate = require("./authenticate");

//token
var config = require("./config");
const cors = require("cors");

var app = express();
const url = config.mongoUrl;
const connect = mongoose.connect(url);

// //required to use session not ignore

app.use(cors());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
}));

//passport
app.use(passport.initialize());
app.use("/", indexRouter);
app.use("/users", usersRouter);

connect.then((db) => {
  console.log("Connected correctly to server");
}),
  (err) => {
    console.log(err);
  };
app.all("*", (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    res.redirect(
      307,
      "https://" + req.hostname + ":" + app.get("secPort") + req.url
    );
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/class", classRouter);
app.use("/dishes", dishRouter);
app.use("/imageUpload", uploadRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
