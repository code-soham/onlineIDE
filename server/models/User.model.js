import mongoose from "mongoose";
import bcrypt from "bcrypt";
//ES6 user model with pre hook for password hashing
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: [true, "Please enter an email"],
      required: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
      maxlength: 20,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
// Hashing password before saving to database
UserSchema.pre("save", async function (next) {
  // Check if password is modified
  if (!this.isModified("password")) return next();
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  // Re-assign hashed password
  this.password = hash;
  next();
});
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    // const pw = await bcrypt(user.password);
    // console.log(auth);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

export default mongoose.model("User", UserSchema);
