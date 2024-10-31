const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
   post_title: {
      type: String,
      required: true,
      trim: true
   },
   post_content: {
      type: String,
      required: true
   },
   featureImage: {
      type: String, // Path to the image
      required: true
   },
   galleryImages: {
      type: [String], // Array of image paths
      default: []
   },
   authorID: {
      type: mongoose.Schema.Types.ObjectId, ref: 'users' 
   },
   categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'postcategories' }], 
   postTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'posttypemodels' }
},
   {
      timestamps: true
   })


const postModel = mongoose.model("Post", postSchema)

module.exports = postModel