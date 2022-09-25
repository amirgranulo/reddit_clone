import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserFromToken } from "../utils/UserUtils.js";

const router = express.Router();
const secret = "secret";


router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(hashedPassword);
  const user = new User({
    email: email,
    username: username,
    password: hashedPassword,
  });
  user
    .save()
    .then(() => {
      jwt.sign({ id: user._id }, secret, (err, token) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.status(201).cookie("token", token).send();
        }
      });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (user.username) {
    const passwordValid = bcrypt.compareSync(password, user.password);
    if (passwordValid) {
      jwt.sign({ id: user._id }, secret, (err, token) => {
        return res.cookie("token", token).send();
      });
    } else {
      res.sendStatus(401).json("Invalid username or password");
    }
  } else {
    res.sendStatus(401).json("Username does not exist");
  }
});

router.get("/user", async (req, res) => {
  const token = req.cookies.token;
  try {
    const user = await getUserFromToken(token);
    return res.json({ username: user.username });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/logout", (req, res) => {
  return res.cookie("token", "").send();
});

export default router;
