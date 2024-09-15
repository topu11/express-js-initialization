const User=require('../../models/userModel')
const bcrypt=require('bcryptjs');


exports.signup=async (req,res,next)=>{
   
    try
    { 
        //const pass=await bcrypt.hash(req.body.password,process.env.SALT);
        req.body.password=bcrypt.hashSync( req.body.password,11)
        const {name,username,email,password}=req.body;
        const user=await User.create({
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
        

    }catch(error)
    {
       res.status(401).json({
        messge:"Something went wrong",
        error:error
       })
    }
}