const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("DB Connected ..."))
  .catch(err => console.log(err));

//routes
const userRoutes = require("./routes/user");

//middleware
app.use(bodyParser.json());
app.use("/api", userRoutes);

//port
const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log(`server node connected on ${port}`);
});

app.get("/", (req, res) => {
  //   console.log(`the is runing`);
  res.json({ server: "the server is running on a new project" });
});
