const express=require('express');
const dotenv=require('dotenv');
const bodyParser=require('body-parser');
const multer = require('multer');
const path = require('path');

const connectDB=require('./connectDB/connectDB')
const sign_up_route=require('./routes/sign_up_routes')
const login_route=require('./routes/login_routes')
const get_user_route=require('./routes/get_user_routes')
const post_type_routes=require('./routes/post_type_routes')
const post_type_categories=require('./routes/post_category_routes')
const post_routes=require('./routes/post_route')

dotenv.config();


const app=express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === 'featureImage') {
        cb(null, 'uploads/featureImages'); // Directory for feature images
      } else if (file.fieldname === 'galleryImages') {
        cb(null, 'uploads/galleryImages'); // Directory for gallery images
      }
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/signup',sign_up_route)
app.use('/api/login',login_route)
app.use('/api/users',get_user_route)

app.use('/api/post/types',post_type_routes)
app.use('/api/post/categories',post_type_categories)
app.use('/api/post/',upload.fields([
    { name: 'featureImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 5 }
  ]),post_routes)



app.get('/',(req,res)=>{
   res.send("Allah akbar")
})
const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    //console.log(`running of port ${PORT}`)
    connectDB();
})