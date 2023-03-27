const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const UserRouter = express.Router();

UserRouter.get("/", (req, res) => {
  res.send("ok");
});

UserRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city , is_married } = req.body;
  const user = await UserModel.find({ email });
  if (user.length <= 0) {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ msg: "Something went Wrong", error: err.message });
        } else {
          const user = new UserModel({
            name,
            email,
            gender,
            age,
            city,
            is_married ,
            password: hash,
          });
          await user.save();
          res.send({ msg: "New user has been registered" });
        }
      });
    } catch (error) {
      res.send({ msg: "Something went Wrong", error: error.message });
    }
  } else {
    res.send({ msg: "User already exist, please login" });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user[0]._id }, "mannu");
          res.send({ msg: "Logged in ", token: token });
        }
      });
    } else {
      res.send({ msg: "Wrong credentials" });
    }
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
});

module.exports = {
  UserRouter,
};
