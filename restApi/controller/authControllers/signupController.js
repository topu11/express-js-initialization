const UserModel=require('../../models/userModel')
const bcrypt=require('bcryptjs');
const authValidations=require('../../validations/authValidations')

const signupController=async (req,res,next)=>{
    
    const {signupValidation}=authValidations;

    try
    { 
        
        const validated=JSON.parse(await signupValidation(req.body));
        //console.log(validated);
         if(validated.is_error)
         {
            console.log(validated);
            res.status(422).json({ messge:"Something went wrong",error:validated.error_message });
         }else
         {
            req.body.password=bcrypt.hashSync( req.body.password,11)
            const {name,username,email,password}=req.body;
            const user=await UserModel.create({
                name,
                username,
                email,
                password
            })
            if(user)
            {
                res.status(201).json({
                    message:`As Salamu alikum ,${name} your account has been created`,
                    user
                });
            }
         }
    }catch(error)
    {
        console.log(error);
       res.status(401).json({
        messge:"Something went wrong",
        error:error
       })
    }
}

module.exports={signupController}