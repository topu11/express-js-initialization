const {isEmail,isValidPassword}=require('../global_helpers')
const User=require('../models/userModel')

async function  authValidation({name,username,email,password})
{ 
   let is_error=false;
   let error_message=[];
   if(!isEmail(email))
      {
         is_error=true;
        error_message.push(`As Salamu alikum ,${email} is invalid email`)
      } 
   if(!isValidPassword(password))
         {
            is_error=true;
           error_message.push(`As Salamu alikum ,Please add One Uppercase , One Special Case in your Password`)
   }else
   {
      const emailExits=await User.findOne({"email":email});
      if(emailExits)
         {
            is_error=true;
            error_message.push(`As Salamu alikum ,${email} already exits`)  
         }
   }
   const userExits=await User.findOne({"username":username});
  // console.log(userExits);
   if(userExits)
   {
      is_error=true;
      error_message.push(`As Salamu alikum ,${username} already exits`)  
   }
   
   return JSON.stringify({
       'is_error':is_error,
       'error_message':error_message
   }   )
}

module.exports=authValidation;