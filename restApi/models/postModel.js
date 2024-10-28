const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
   post_type: {
      type: Number,
      required: true,
   },
   post_status: {
      type: Number,
      required: true,
   },
   post_category: {
      type: [Number],
      required: true,
   },
   post_title: {
      type: String,
      required: true,
      trim: true
   },
   post_content: {
      type: String,
      required: true
   },
   post_thumbnail: {
      type: String, // Path to the image
      required: true
   },
   gallery_images: {
      type: [String], // Array of image paths
      default: []
   },
   author_id: {
      type: Number, // Storing as Number to hold big integers
      required: true
   }
},
   {
      timestamps: true
   })


const userModel = mongoose.model("postSchema", postSchema)

module.exports = userModel