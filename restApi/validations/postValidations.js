const postTypeModel = require('../models/postTypeModel')

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


module.exports = { postTypeModelValidationInsert };