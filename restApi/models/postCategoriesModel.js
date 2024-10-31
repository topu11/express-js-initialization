const mongoose = require('mongoose');

const postCategoriesSchema = new mongoose.Schema({
   post_category: {
      type: String,
      required: true,
   },
   parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "postCategories",
      required: false,
      default:null
   } 
},
   {
      timestamps: true
   })


const userModel = mongoose.model("postCategories", postCategoriesSchema)

module.exports = userModel