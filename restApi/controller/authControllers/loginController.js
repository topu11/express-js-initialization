const UserModel = require('../../models/userModel')
const authValidations = require('../../validations/authValidations')
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');

const dotenv=require('dotenv');
dotenv.config();
const Secret = process.env.Secret

const loginController = async (req, res, next) => {
    const { username, password } = req.body;

    const { loginValidation } = authValidations;
    try {
        const validated = JSON.parse(await loginValidation(req.body));
        if (validated.is_error) {
            console.log(validated);
            res.status(422).json({ messge: "Something went wrong", error: validated.error_message });
        } else {
            const userbyUserName = await UserModel.findOne({ "username": username })
            if (userbyUserName) {
                const  validate_password=await bcrypt.compare(password,userbyEmail.password);
                    if(validate_password)
                    {
                        const token=await jwt.sign({username:username,_id:userbyUserName._id},Secret,{ expiresIn: '1h' });

                        res.status(200).json({
                            messge: "user is found",
                            token:token,
                            user: userbyUserName
                        })
                    }else
                    {
                        res.status(401).json({
                            messge: "password does not match",
                            user: {}
                        })
                    }
            }else
            {
                const userbyEmail = await UserModel.findOne({ "email": username })
                if(userbyEmail)
                {
                    const  validate_password=await bcrypt.compare(password,userbyEmail.password);
                    if(validate_password)
                    {
                        const token=await jwt.sign({username:username,_id:userbyEmail._id},Secret,{ expiresIn: '1h' });
                        
                        res.status(200).json({
                            messge: "user is found",
                            token:token,
                            user: userbyEmail
                        })
                    }else
                    {
                        res.status(401).json({
                            messge: "password does not match",
                            user: {}
                        })
                    }
                    
                }else
                {
                    res.status(401).json({
                        messge: "user is not found",
                        user: {}
                    })
                }
            }

        }



    } catch (error) {
        console.log(error)
        res.status(500).json({
            messge: "Something went wrong",
            error: error
        })
    }
}

module.exports = { loginController }