const postCategoriesModel = require('../models/postCategoriesModel')
const {postCategoriesModelValidationInsert,UpdatepostCategoriesModelValidation} = require('../validations/postValidations')
const mongoose = require('mongoose');





const addPostCategory=async (req, res, next)=>{
    const session = await mongoose.startSession();
    try
    {
        session.startTransaction();
        const validated=JSON.parse(await postCategoriesModelValidationInsert(req.body));
        //console.log(validated);
         if(validated.is_error)
         {
            console.log(validated);
            res.status(422).json({ messge:"Something went wrong",error:validated.error_message });
         }else
         {
           
            const {post_category,parent_id=null}=req.body;
            const postCategoryCreated=await postCategoriesModel({
                post_category:post_category,
                parent_id:parent_id,
           
            })
            
            await postCategoryCreated.save({ session }); 

            if(postCategoryCreated)
            {
                res.status(201).json({
                    message:`As Salamu alikum ,${post_category} is created succesfully`,
                    postCategoryCreated
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
const getAllPostcategories = async (req, res, next) => {
    try {

        const postCategories = await postCategoriesModel.find();
        //console.log(postCategories);
        // const results = await Promise.all(postCategories.map(async (item) => {
            
        //     if (item.parent_id) {
        //         const parentData = await postCategoriesModel.findById(item.parent_id);
                
        //         return {
        //             _id: item._id,
        //             post_category: item.post_category,
        //             parent_id: item.parent_id,
        //             parentData: parentData ? {
        //                 _id: parentData._id,
        //                 post_category: parentData.post_category 
        //             } : null 
        //         };
        //     }
        
         
        //     return {
        //         _id: item._id,
        //         post_category: item.post_category,
        //         parent_id: null 
        //     };
        // }));

        const allCategories = await postCategoriesModel.aggregate([
            {
              $lookup: {
                from: 'postcategories', // Use the actual collection name in MongoDB (pluralized and lowercase)
                localField: 'parent_id', 
                foreignField: '_id', 
                as: 'parent_category',
              }
            },
            {
              $unwind: {
                path: '$parent_category', 
                preserveNullAndEmptyArrays: true // Keep documents without a parent category
              }
            }
          ]);
        
        
        res.status(200).json({
            messge: "all post Category",
            postCategories: allCategories
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            messge: "Something went wrong",
            error: error
        })
    }
}

const updatePostCategory = async (req, res, next) => {
    const session = await mongoose.startSession();
    const postCategoryID = req.params.postCategoryID;
    try {
       
        session.startTransaction();
        const validated=JSON.parse(await UpdatepostCategoriesModelValidation(req.body,postCategoryID));
        //console.log(validated);
         if(validated.is_error)
         {
            console.log(validated);
            res.status(422).json({ messge:"Something went wrong",error:validated.error_message });
         }else
         {
            
            const {post_category,parent_id=null}=req.body;
            const postCategoryDB = await postCategoriesModel.findById(postCategoryID).session(session);
            //console.log(PostTypeDB);
            if(!postCategoryDB) {
                res.status(401).json({
                    messge: "Post Category Not Found",
                })
              }
              Object.assign(postCategoryDB, {
                post_category:post_category,
                parent_id:parent_id
           
            });
              const postCategoryDBUpdated=await postCategoryDB.save({ session });
              if(postCategoryDBUpdated)
              {
                res.status(200).json({
                    messge: "updated Successfully",
                    post_category: postCategoryDBUpdated
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
        console.log(error);
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

const getSinglePostCategoryByID = async (req, res, next) => {
    try {  
        const postCategoryID=req.params.postCategoryID;
        const post_category=await postCategoriesModel.findById(postCategoryID);
        if(post_category)
        { 
            res.status(200).json({
                message:"post Category is found",
                post_category:post_category
            })
        }else
        {
            res.status(400).json({
                message:"post Category is not found",
                post_category:post_category
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

async function makingCategorySubCategoryLoop(postCategories)
{
    console.log(postCategories);
    var new_object={};
    var final_mapping=[];
    if(!postCategories)
    {
        return [];
    }
    postCategories.forEach(async postCat => {
        new_object._id=postCat._id,
        new_object.post_category=postCat.post_category,
        new_object.parent=await postCategoriesModel.findById(postCat.parent_id),
        new_object.createdAt=postCat.createdAt,
        new_object.updatedAt=postCat.updatedAt,
        new_object.__v=postCat.__v
        final_mapping.push(new_object);
      });
   return  final_mapping;
}

module.exports = { addPostCategory,getAllPostcategories,updatePostCategory,getSinglePostCategoryByID }