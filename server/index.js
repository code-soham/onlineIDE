import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import passport from "passport";
import ExpressFormidable from "express-formidable";
import "./passport.js";
import dotenv from "dotenv";
const app = express();
const PORT = process.env.PORT || 8000;
dotenv.config();
app.use(express.json());
app.use(ExpressFormidable());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["soham"],
  })
);

app.use(passport.initialize());
app.use(passport.session());
//db
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

//routes
import authRoutes from "./routes/auth.route.js";
import questionRoutes from "./routes/question.route.js";
import sphereRoutes from "./routes/sphere.route.js";
app.get("/", (req, res) => {
  res.send("Hello Cometeers!");
});
app.use("/api/auth", authRoutes);
app.use("/api/ps", questionRoutes);
app.use("/api/sphere", sphereRoutes);
