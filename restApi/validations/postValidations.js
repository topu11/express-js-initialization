const postTypeModel = require('../models/postTypeModel')
const postCategoriesModel = require('../models/postCategoriesModel')

async function postTypeModelValidationInsert({ postType }) {
    let is_error = false;
    let error_message = [];
    if (!postType) {
        is_error = true;
        error_message.push(`As Salamu alikum ,Input Post Type Name`)
    }
    const postTypeExits = await postTypeModel.findOne({ "post_type": postType });
    // console.log(userExits);
    if (postTypeExits) {
        is_error = true;
        error_message.push(`As Salamu alikum ,${postType} already exits`)
    }

    return JSON.stringify({
        'is_error': is_error,
        'error_message': error_message
    })
}
async function  UpdatePostTypeValidation({postType})
{ 
    let is_error = false;
    let error_message = [];
    if (!postType) {
        is_error = true;
        error_message.push(`As Salamu alikum ,Input Post Type Name`)
    }
    const postTypeExits = await postTypeModel.findOne({ "post_type": postType });
    // console.log(userExits);
    if (postTypeExits) {
        is_error = true;
        error_message.push(`As Salamu alikum ,${postType} already exits`)
    }

    return JSON.stringify({
        'is_error': is_error,
        'error_message': error_message
    })
}

async function postCategoriesModelValidationInsert({ post_category }) {
    let is_error = false;
    let error_message = [];
    if (!post_category) {
        is_error = true;
        error_message.push(`As Salamu alikum ,Input post Category Name`)
    }
    const postCategoryExits = await postCategoriesModel.findOne({ "post_category": post_category });
    // console.log(userExits);
    if (postCategoryExits) {
        is_error = true;
        error_message.push(`As Salamu alikum ,${post_category} already exits`)
    }

    return JSON.stringify({
        'is_error': is_error,
        'error_message': error_message
    })
}
async function  UpdatepostCategoriesModelValidation({post_category},postCategoryID)
{ 
    console.log(postCategoryID);
    let is_error = false;
    let error_message = [];
    if (!post_category) {
        is_error = true;
        error_message.push(`As Salamu alikum ,Input post CategoryName`)
    }
    const postCategoryExits = await postCategoriesModel.findOne({ "post_category": post_category });
    console.log(postCategoryExits._id);
    if (postCategoryExits) {
        if(postCategoryExits._id != postCategoryID )
        {
            is_error = true;
            error_message.push(`As Salamu alikum ,${post_category} already exits`)
        }
       
    }

    return JSON.stringify({
        'is_error': is_error,
        'error_message': error_message
    })
}
async function postValidationInsert()
{
   return  JSON.stringify({
    'is_error': false,
    'error_message': null
})
}
async function UpdatePostValidation()
{

}
module.exports = { postTypeModelValidationInsert,UpdatePostTypeValidation,postCategoriesModelValidationInsert,UpdatepostCategoriesModelValidation,postValidationInsert,UpdatePostValidation };