const mongoose = require('mongoose');

const postCategoriesSchema = new mongoose.Schema({
   post_category: {
      type: String,
      required: true,
   },
   parent_id: {
      type: Number,
      required: false,
   }
},
   {
      timestamps: true
   })


const userModel = mongoose.model("postCategoriesSchema", postCategoriesSchema)

module.exports = userModel