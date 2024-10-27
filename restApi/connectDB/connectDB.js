const mongoose=require('mongoose');

const connectDB = async ()=>{
    try{
       await mongoose.connect(process.env.DB_URL,{
        autoIndex: true
    })
       //console.log("mongo connected")
    }catch(error){
        console.log(error); 
    }
}

module.exports=connectDB;