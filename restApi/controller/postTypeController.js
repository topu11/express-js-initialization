const postTypeModel = require('../models/postTypeModel')
const {postTypeModelValidationInsert} = require('../validations/postValidations')
const mongoose = require('mongoose');





const addPostType=async (req, res, next)=>{
    const session = await mongoose.startSession();
    try
    {
        session.startTransaction();
        const validated=JSON.parse(await postTypeModelValidationInsert(req.body));
        //console.log(validated);
         if(validated.is_error)
         {
            console.log(validated);
            res.status(422).json({ messge:"Something went wrong",error:validated.error_message });
         }else
         {
           
            const {postType}=req.body;
            const postTypeCreated=await postTypeModel({
                post_type:postType,
           
            })
            
            await postTypeCreated.save({ session }); 

            if(postTypeCreated)
            {
                res.status(201).json({
                    message:`As Salamu alikum ,${postType} is created succesfully`,
                    postTypeCreated
                });
            }
            await session.commitTransaction();
         }
    }catch(error)
    {
        
        
            await session.abortTransaction();
            console.log('Transaction aborted due to an error');
          
          
          console.log(error);   
       res.status(401).json({
        messge:"Something went wrong",
        error:error
       })
    }finally {
        // End the session
        //await session.abortTransaction();
        session.endSession();
      }
}
const getAllPosttypes = async (req, res, next) => {
    try {

        const postTypes = await postTypeModel.find();
        res.status(200).json({
            messge: "all postTypes",
            postTypes: postTypes
        })

    } catch (error) {

        res.status(401).json({
            messge: "Something went wrong",
            error: error
        })
    }
}

const singelPostType = async (req, res, next) => {
    try {

        const postTypeID = req.params.postTypeID;

        const postType = await postTypeModel.findById(postTypeID);
        if (postType) {
            res.status(200).json({
                messge: "user is found",
                postType: postType
            })
        } else {
            res.status(200).json({
                messge: "user is not found",
            })
        }


    } catch (error) {

        res.status(401).json({
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
                res.status(401).json({
                    messge: "Something went wrong",
                })
            }
        }


    } catch (error) {
       console.log(error)
        res.status(401).json({
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
        res.status(401).json({
            messge: "Something went wrong",
            error: error
        })
    }
}
module.exports = { addPostType,getAllPosttypes, singelPostType, updatelUser,DeleteUser }