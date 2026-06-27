import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";


dotenv.config({ path: "./../config.env" });
const DB = process.env.DATABASE.replace('<db_password>', process.env.PASSWORD);

mongoose.connect(DB)
    .then(() => {
        console.log('Connection to MongoDB successful ✅');
    })
    .catch(err => {
        console.error(err);
    });




const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "this email is not valid"],
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "the password does not match",
    },
  },

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordTokenExpire: Date,

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
