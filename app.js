const express = require("express");
const app = express();
require("dotenv").config();
const path = require("node:path");
const { formatTimeAgo } = require("./utils/dateHelper");

const favicon = require("serve-favicon");

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

const assetsPath = path.join(__dirname, "public");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// app.js

const messages = [];

app.get("/", (req, res) => {
  const timeDifferences = [];
  messages.forEach((message) => {
    let timeDifference = formatTimeAgo(message.added);
    timeDifferences.push(timeDifference);
  });
  res.render("index", {
    title: "Mini Messageboard",
    messages: messages,
    timeDifferences: timeDifferences,
  });
});

app.get("/new", (req, res) => {
  res.render("form", {});
});

app.get("/message/:index", (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < messages.length) {
    const message = messages[index];
    res.render("message", {
      title: "Message by " + message.user,
      message: message,
      showButton: false,
      timeDifference: formatTimeAgo(message.added),
    });
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

app.post("/new", (req, res) => {
  messages.push({
    text: req.body.messageField,
    user: req.body.nameField,
    added: new Date(),
  });
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Express App running - listening on port ${PORT}!`);
});
