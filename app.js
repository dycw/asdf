const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const blogRoutes = require("./routes/blogRoutes");

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

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
