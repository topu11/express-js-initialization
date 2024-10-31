const UserModel = require('../models/userModel')
const {UpdateUserValidation} = require('../validations/authValidations')
const bcrypt=require('bcryptjs');
const getAllUsers = async (req, res, next) => {
    try {

        const users = await UserModel.find();
        res.status(200).json({
            messge: "all users",
            users: users
        })

    } catch (error) {

        res.status(500).json({
            messge: "Something went wrong",
            error: error
        })
    }
}

const singelUser = async (req, res, next) => {
    try {

        const userID = req.params.userID;

        const user = await UserModel.findById(userID);
        if (user) {
            res.status(200).json({
                messge: "user is found",
                user: user
            })
        } else {
            res.status(200).json({
                messge: "user is not found",
            })
        }


    } catch (error) {

        res.status(500).json({
            messge: "Something went wrong",
            error: error
        })
    }
}

const updatelUser = async (req, res, next) => {
    try {

        const userID = req.params.userID;
        
        const user = await UserModel.findById(userID);
        if (!user) {
            res.status(200).json({
                messge: "user is not found",
                user: user
            })
        } else {
            const validated = JSON.parse(await UpdateUserValidation(req.body,userID));
            //console.log(validated);
            //return;
            if (validated.is_error) {
                console.log(validated);
                res.status(422).json({ messge: "Something went wrong", error: validated.error_message });
            }
          
            req.body.password = bcrypt.hashSync(req.body.password, 11)
            //console.log( req.body.password);
            const updatedUser = await UserModel.findByIdAndUpdate(
                userID,                  // The ID of the document to update
                req.body,          // The update data
                { new: true }        // Options: `new: true` returns the updated document
            );

            if (updatedUser) {
                res.status(200).json({
                    message: "User is updated",
                    uuser: updatedUser
                });
            } else {
                res.status(500).json({
                    messge: "Something went wrong",
                })
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
const DeleteUser = async (req, res, next) => {
    try {

        const userID = req.params.userID;
        
        const user = await UserModel.findById(userID);
        if (!user) {
            res.status(200).json({
                messge: "user is not found",
                user: user
            })
        } else {
            const deletedUser = await UserModel.findByIdAndDelete(userID);
            res.status(200).json({
                messge: "User Account Delete Successfully",
                deletedUser: deletedUser
            })
            
        }


    } catch (error) {
       console.log(error)
        res.status(500).json({
            messge: "Something went wrong",
            error: error
        })
    }
}
module.exports = { getAllUsers, singelUser, updatelUser,DeleteUser }