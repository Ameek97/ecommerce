import mongoose from "mongoose" 
import validator from "validator"

const DB = process.env.DATABASE.replace('<db_password>', process.env.PASSWORD); 

app.use(()=>{
    console.log("hello");
})

mongoose.connect(DB)
.then(()=>{
    console.log("connection to mongo database succesful");
}).catch(err => {
        console.error('Connection error:', err.message);
    });
 
const userSchema = new mongoose.Schema({

   name:{
    type:String, }, 

   role:{
    type:String,
    enu:["user","admin"],
    default:"user"
   }, 

   email:{
    type:String,
    unique: [true, "This email is already registered"],
    validate: [validator.isEmail, "this email is not valid"],

    },

   password:{
    type:String,
    required:true,
    select:false
   },

   passwordConfirm:{
    type:string,

    validate:{
        validator: function(el){
            return el== this.password
        },
        message:"the password does not match"
             }    

                     },
   
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordTokenExpire: Date,              


    active:{
        type:Boolean,
        default:true,
        select:false
    } 

});



const User = mongosse.Model('User', userSchema);

export default User;
