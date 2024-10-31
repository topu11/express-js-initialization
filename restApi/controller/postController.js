const postModel = require('../models/postModel')
const {postValidationInsert,UpdatePostValidation} = require('../validations/postValidations')
const mongoose = require('mongoose');





const addPost=async (req, res, next)=>{
    const session = await mongoose.startSession();
    try
    {
        session.startTransaction();
        const validated=JSON.parse(await postValidationInsert(req.body));
        //console.log(validated);
         if(validated.is_error)
         {
            console.log(validated);
            res.status(422).json({ messge:"Something went wrong",error:validated.error_message });
         }else
         {
          
            ////////////////
           



            //////////////////


            const {postType}=req.body;
            const postCreated=await postModel({
                post_type:postType,
           
            })
            
            await postCreated.save({ session }); 

            if(postCreated)
            {
                res.status(201).json({
                    message:`As Salamu alikum ,${postType} is created succesfully`,
                    postCreated
                });
            }
            await session.commitTransaction();
         }
    }catch(error)
    {
        
        
            await session.abortTransaction();
            console.log('Transaction aborted due to an error');
          
          
          console.log(error);   
       res.status(500).json({
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

        res.status(500).json({
            messge: "Something went wrong",
            error: error
        })
    }
}

const updatePostType = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
       
        session.startTransaction();
        const validated=JSON.parse(await postTypeModelValidationInsert(req.body));
        //console.log(validated);
         if(validated.is_error)
         {
            console.log(validated);
            res.status(422).json({ messge:"Something went wrong",error:validated.error_message });
         }else
         {
            const postTypeID = req.params.postTypeID;
            const {postType}=req.body;
            const PostTypeDB = await postTypeModel.findById(postTypeID).session(session);
            console.log(PostTypeDB);
            if(!PostTypeDB) {
                res.status(401).json({
                    messge: "Post Type Not Found",
                })
              }
              Object.assign(PostTypeDB, {
                post_type:postType,
           
            });
              const PostTypeDBUpdated=await PostTypeDB.save({ session });
              if(PostTypeDBUpdated)
              {
                res.status(200).json({
                    messge: "updated Successfully",
                    postType: PostTypeDBUpdated
                })
              }else
              {
                res.status(200).json({
                    messge: "Can not Updated",
                })
              }

              // Commit the transaction
              await session.commitTransaction();
              console.log("Transaction committed successfully.");  
         }
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({
            messge: "Something went wrong",
            error: error
        })
    }finally {
        // End the session
        //await session.abortTransaction();
        session.endSession();
      }
}

const getSinglePostTypeByID = async (req, res, next) => {
    try {  
        const postTypeID=req.params.postTypeID;
        const postTpe=await postTypeModel.findById(postTypeID);
        if(postTpe)
        { 
            res.status(200).json({
                message:"post Type is found",
                postType:postTpe
            })
        }else
        {
            res.status(400).json({
                message:"post Type is not found",
                postType:postTpe
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

module.exports = { addPost,getAllPosttypes, updatePostType,getSinglePostTypeByID }