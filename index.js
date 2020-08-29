const API = "https://numerous-server.herokuapp.com/api/v1/login";
const fetch = require("node-fetch");
const express = require("express");
const path = require("path");

const app = express();
const router = express.Router();

//TODO USER SPECIFIED
app.set('isLogin', false);
let userId, userNum, userMail, userPassword;

app.use(express.static(__dirname + "/public"));

//LOGIN - SIGN UP
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/pages/index.html"));
});

//HOME
router.get("/home", function (req, res) {
  if (!app.get('isLogin')) res.redirect("/");
  else res.sendFile(path.join(__dirname + "/pages/home.html"));
});

//PROFILE
router.get("/profile", function (req, res) {
  if (!isLogin) res.redirect("/");
  else res.sendFile(path.join(__dirname + "/pages/profile.html"));
});

//MESSAGES
router.get("/messages", function (req, res) {
  res.sendStatus(404);
});

//LOGOUT
router.get("/logout", function (req, res) {
  res.cookie("isLogin", null);
  res.cookie("userId", null);
  res.cookie("userNum", null);
  res.cookie("userMail", null);
  res.cookie("userPassword", null);
  res.redirect("/");
});

//LOGIN REQUEST
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.post("/login", function (req, res) {
  fetch(API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mail: req.body.mail,
        password: req.body.password,
      }),
    })
    .then((response) => {
      if (response.ok) {
        response.json().then(data => {
          app.set('isLogin', true);
          isLogin = true;
          userId = data.id;
          userNum = data.number;
          userMail = data.mail;
          userPassword = data.password;
          //res.cookie('data-user', { mail: data })
          res.redirect("/home");
        })
      } else res.redirect("/");
    })
});

//DEFAULT
router.use(function (req, res) {
  res.redirect("/");
});

app.use("/", router);
app.listen(process.env.port || 3000);

console.log("Server is Running...");