var express = require("express");
var app = express();

var config = require("./config/config");
var api = require("./routes/index");
var guest = require("./routes/guest");
var rooms = require("./routes/rooms");
var foods = require("./routes/foods");
var messages = require("./routes/messages");
var memberships = require("./routes/memberships");
var club = require("./routes/club");
var table_reservation = require("./routes/table_reservation");
var mail = require("./routes/mail");

var pages_call = require("./routes/pages_call");

var cors = require("cors");
const ngrok = require("ngrok");

const path = require("path");
var db = require("./src/models/index");

app.options("*", cors());

app.use(express.static(path.join(__dirname, "./assets")));

app.use(express.json());

app.use("/uploads", express.static("uploads"));
var cookieParser = require("cookie-parser");
var session = require("express-session");

app.use(cookieParser());
app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    rolling: true,
  })
);

app.use(function (req, res, next) {
  res.setHeader("methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.setHeader("preflightContinue", false);
  res.setHeader("optionsSuccessStatus", 204);
  // res.setHeader("Access-Control-Allow-Origin","http://thedamanclub.s3-website.ap-south-1.amazonaws.com")
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", pages_call);
app.use("/", api);
app.use("/pages/", pages_call);
app.use("/guest/", guest);
app.use("/rooms/", rooms);
app.use("/foods/", foods);
app.use("/messages/", messages);
app.use("/membership/", memberships);
app.use("/club/", club);
app.use("/table_reservation/", table_reservation);
app.use("/mail/", mail);

app.set("view engine", "ejs");

const viewsPath = path.join(__dirname, "./views");
app.set("views", viewsPath);

const server = require("http").createServer(app);
const io = require("socket.io")(server);

const socketController = require("./src/controllers/socket.controller");
new socketController("connection", io);

server.listen(5562, async function () {
  console.log("listen on : " + 5562);
});

// ALTER TABLE `tbl_rooms` ADD `qty` INT NOT NULL DEFAULT '1' AFTER `updated_at`;
