import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import brycpt from "bcrypt";


const createToken = (id) =>{
 
  const token = jwt.sign(
    { id },
    process.env.JWT_KEY,
    { expiresIn: "90d" }
  );

  return token;
}





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
        token : createToken(newUser._id)
     })
    
   } catch(err){
     res.status(400).json({
        status:"fail",
        err
     })
   }
};


 const login =async  (req, res, next)=>{

  const { email, password } = req.body;

  try{

      
      if(!email || !password){
         return next(new appErr("enter password and email",400));}
          
    // we do select password as in our schema we have our password set to select:false     
    const user = await  User.findOne({email}).select("+password"); 

    
   // this can be done without the userschema.method 
   if(!user || !(await bcrypt.compare(password, user.password))){
     return next( new appErr("invalid password or email"));
   }

  } catch(err){
    return next(err);
  }



}

export default {
    signup,
    login  };



