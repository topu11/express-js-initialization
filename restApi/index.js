const express=require('express');
const dotenv=require('dotenv');
const bodyParser=require('body-parser');
const multer = require('multer');

const connectDB=require('./connectDB/connectDB')
const sign_up_route=require('./routes/sign_up_routes')
const login_route=require('./routes/login_routes')
const get_user_route=require('./routes/get_user_routes')

dotenv.config();


const app=express();

const storage = multer.memoryStorage(); // Store form data in memory
const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/signup',sign_up_route)
app.use('/api/login',login_route)
app.use('/api/users',get_user_route)

app.get('/',(req,res)=>{
   res.send("Allah akbar")
})
const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    //console.log(`running of port ${PORT}`)
    connectDB();
})