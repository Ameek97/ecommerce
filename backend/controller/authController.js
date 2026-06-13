import User from "./model/userModel.js";
import jwt from `jsonwebtoken`;


const createToken = (id) =>
  jwt.sign(
    { id },
    process.env.JWT_KEY,
    { expiresIn: "90d" }
  );



const register = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({
      message: "User already registered",
    });
  }

  // Continue registration...

   try{
   const newUser = await User.create(req.body);
   res.status(200).json({
        status:"success",
        newUser, 
        token : createToken(newUser._id);
     })
    
   } catch(err){
     res.status(400).json({
        status:"fail",
        err
     })
   }
};






module.exports = register;


module.exports = protect = (data)=>{}