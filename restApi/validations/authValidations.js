const {isEmail,isValidPassword}=require('../global_helpers')
const UserModel=require('../models/userModel')

async function  signupValidation({name,username,email,password})
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
      const emailExits=await UserModel.findOne({"email":email});
      if(emailExits)
         {
            is_error=true;
            error_message.push(`As Salamu alikum ,${email} already exits`)  
         }
   }
   const userExits=await UserModel.findOne({"username":username});
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

async function  loginValidation({username,password})
{ 
   let is_error=false;
   let error_message=[];
   if(!username)
   {
      is_error=true;
      error_message.push(`username is required`);

   }
   if(!password)
   {
      is_error=true;
      error_message.push(`password is required`);
   }
   
   
   return JSON.stringify({
       'is_error':is_error,
       'error_message':error_message
   }   )
}

module.exports={signupValidation,loginValidation};