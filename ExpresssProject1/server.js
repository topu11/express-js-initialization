
//const express = require('express')
// Now type is module

import express from 'express'
import post_routes from './routes/posts.js';

const app = express()
const PORT = process.env.PORT || 3000;
//const post_routes=require('./routes/posts')


app.use('/api/posts',post_routes)

app.get('/',(req,res)=>{
     //res.send("Allah AKbar");
     // res.send({
     //      message:'Allah AKbar'
     // });
     res.send( `<h1>Allah Akbar Allah Akbar</h1>`);
 });

app.listen(PORT,()=> console.log('port is listening'));
