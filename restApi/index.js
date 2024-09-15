const express=require('express');
const dotenv=require('dotenv');
const bodyParser=require('body-parser');

const connectDB=require('./connectDB/connectDB')
const sign_up=require('./routes/sign_up_routes')
dotenv.config();


const app=express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/signup',sign_up)


app.get('/',(req,res)=>{
   res.send("Allah akbar")
})
const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`running of port ${PORT}`)
    connectDB();
})