const mongoose = require('mongoose');

const postTypeSchema = new mongoose.Schema({
   post_type: {
      type: String,
      required: true,
   },
   
},
   {
      timestamps: true
   })


const postTypeModel = mongoose.model("postTypeModel", postTypeSchema)

module.exports = postTypeModel