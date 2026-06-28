import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import errorApp from "./../../errorApp.js";

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "90d" });

  return token;
};

export const signup = async (req, res, next) => {
  try {

    
    
    const {email,password}= req.body;

 
 // 1) check if the email and password were entered 
   if(!email || !password){
    console.log("im here");
   return next(new errorApp("please provide  Email and password",400));}

    const user = await User.findOne({ email: req.body.email });

    

    
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: "success",
      newUser,
      token: createToken(newUser._id),
    });
  } catch (err) { return next(err);
    };
  }


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
