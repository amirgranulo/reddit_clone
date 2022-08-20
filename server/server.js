import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js";

const secret = "secret";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const connectToDb = async () => {
  await mongoose.connect("mongodb://localhost:27017/reddit", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

connectToDb();
const db = mongoose.connection;

db.on("error", console.log);

app.get("/", (req, res) => {
  res.send("ok");
});

app.post("/register", (req, res) => {
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
        jwt.sign({id:user._id},secret,(err, token) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else {
                res.status(201).cookie('token', token).send();
            }
        })
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

app.listen(5000);
