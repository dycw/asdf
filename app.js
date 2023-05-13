const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();

require("dotenv").config();
const password = process.env["PASSWORD"];
const dbURI = `mongodb+srv://derek:${password}@cluster0.j5inzrs.mongodb.net/net-ninja-tutorials?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("connected to db");
    app.listen(8000);
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.redirect("/blogs"))
    .catch((err) => console.log(err));
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) =>
      res.render("details", { blog: result, title: "Blog Details" }),
    )
    .catch((err) => console.log(err));
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => res.json({ redirect: "/blogs" }))
    .catch((err) => console.log(err));
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) =>
      res.render("index", { title: "All blogs", blogs: result }),
    )
    .catch((err) => console.log(err));
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
