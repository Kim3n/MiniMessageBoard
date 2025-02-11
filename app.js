const express = require("express");
const app = express();
const path = require("node:path");
const { formatTimeAgo } = require("./utils/dateHelper");
const initDatabase = require("./database/initDB.js");
const sql = require("./database/queries.js");
const favicon = require("serve-favicon");

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
const assetsPath = path.join(__dirname, "public");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// app.js

initDatabase();

app.get("/", async (req, res) => {
  const timeDifferences = [];
  const messages = await sql.getMessages();
  messages.forEach((message) => {
    let timeDifference = formatTimeAgo(message.added);
    timeDifferences.push(timeDifference);
  });
  res.render("index", {
    title: "Mini Messageboard",
    messages: messages,
    timeDifferences: timeDifferences,
    view: "safe",
  });
});

app.get("/all", async (req, res) => {
  const timeDifferences = [];
  const messages = await sql.getAllMessages();
  messages.forEach((message) => {
    let timeDifference = formatTimeAgo(message.added);
    timeDifferences.push(timeDifference);
  });
  res.render("index", {
    title: "Mini Messageboard",
    messages: messages,
    timeDifferences: timeDifferences,
    view: "all",
  });
});

app.get("/new", (req, res) => {
  res.render("form", {});
});

app.get("/message/:index", async (req, res) => {
  const index = parseInt(req.params.index, 10);
  const message = await sql.getMessageByID(index);
  res.render("message", {
    title: "Message by " + message.username,
    message: message,
    showButton: false,
    timeDifference: formatTimeAgo(message.added),
  });
});

app.post("/flag/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await sql.flagMessage(id);
    if (result.success) {
      res.redirect("/");
    } else {
      res.status(500).send("Failed to flag message");
    }
  } catch (error) {
    console.error("Error flagging the message:", error);
    res.status(500).send("Something went wrong.");
  }
});

app.post("/new", async (req, res) => {
  await sql.insertMessage(
    req.body.nameField,
    req.body.messageField,
    new Date()
  );
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Express App running - listening on port ${PORT}!`);
});
