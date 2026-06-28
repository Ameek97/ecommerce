
import errorApp from "./errorApp.js";

const errorController = (err, req, res, next)=>{

console.log("iuhfcui");
  const statusCode= err.statusCode || 500;
  const status=err.status || 'error';  

  if(process.env.NODE_ENV=="development"){  
     
   console.error('ERROR 💥', err); 
   res
      .status(statusCode)
      .json({
             status:status,
             message:err.message, 
             stack: err.stack,
             error: err});


  }  else{

      if(err.code==11000){err = new errorApp("this email is already registered", 400);}
      if(err.isOperational==true){
        console.log("eee");
         return res.status(err.statusCode)
                   .json({status:"fail",
                          message:err.message 
                         })
      }

           console.error('ERROR 💥', err);
            res.status(400).json({
            status:'error',
            message: "something went wronging"
            });
} 



}


export default errorController;