const API = "https://numerous-server.herokuapp.com/api/v1/";
const fetch = require("node-fetch");
const express = require("express");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 3000;

const app = express();
const router = express.Router();

app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);

let loggedUsers = [];

//INDEX
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/pages/index.html"));
});

//HOME
router.get("/home/:userId/:userNum", function (req, res) {
  if (loggedUsers.includes(req.params.userId)) {
    res.render(path.join(__dirname + "/pages/home.html"), {
      id: req.params.userId,
      number: req.params.userNum
    })
  } else res.redirect("/");
});

//PROFILE
router.get("/profile/:userId/:userNum", function (req, res) {
  if (loggedUsers.includes(req.params.userId)) {
    res.render(path.join(__dirname + "/pages/profile.html"), {
      id: req.params.userId,
      number: req.params.userNum
    })
  } else res.redirect("/");
});

//MESSAGES
router.get("/messages", function (req, res) {
  //TODO
  res.sendStatus(404);
});

//LOGOUT
router.get("/logout/:userId", function (req, res) {
  console.log("user logout: " + req.params.userId);
  for (let i = 0; i < loggedUsers.length; i++)
    if (loggedUsers[i] === req.params.userId) loggedUsers.splice(i, 1);
  res.redirect("/");
});

//LOGIN REQUEST
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.post("/login", function (req, res) {
  fetch(API + "login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mail: req.body.mail,
        password: req.body.password
      }),
    })
    .then((response) => {
      if (response.ok) {
        response.json().then(data => {
          console.log("user login: " + data.id);
          loggedUsers.push(data.id);
          res.redirect("/home/" + data.id + "/" + data.number);
        })
      } else res.redirect("/");
    })
});

//SIGNUP REQUEST
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.post("/signup", function (req, res) {
  //Register
  fetch(API + "users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: req.body.number,
        mail: req.body.mail,
        password: req.body.password
      }),
    })
    .then((response) => {
      response.json().then(data => {
        if (data) {
          //Login
          fetch(API + "login", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                mail: req.body.mail,
                password: req.body.password
              }),
            })
            .then((response) => {
              if (response.ok) {
                response.json().then(data => {
                  console.log("user created: " + data.id);
                  loggedUsers.push(data.id);
                  res.redirect("/home/" + data.id + "/" + data.number);
                })
              } else res.redirect("/");
            })
        } else res.redirect("/");
      })
    })
});

//DEFAULT
router.use(function (req, res) {
  res.redirect("/");
});

app.use("/", router);
app.listen(port);

console.log("Server is Running...");