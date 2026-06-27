import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "90d" });

  return token;
};

export const signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    const newUser = await User.create(req.body);

    res.status(201).json({
      status: "success",
      newUser,
      token: createToken(newUser._id),
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "enter password and email",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "invalid password or email",
      });
    }

    res.status(200).json({
      status: "success",
      token: createToken(user._id),
    });
  } catch (err) {
    return next(err);
  }
};
