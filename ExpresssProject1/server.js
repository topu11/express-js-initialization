
//const express = require('express')
// Now type is module

import express from 'express'
import post_routes from './routes/posts.js';
import bodyParser from 'body-parser';


const app = express();


const PORT = process.env.PORT || 3000;
//const post_routes=require('./routes/posts')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/posts',post_routes)
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())

app.get('/',(req,res)=>{
     //res.send("Allah AKbar");
     // res.send({
     //      message:'Allah AKbar'
     // });
     res.send( `<h1>Allah Akbar Allah Akbar</h1>`);
 });

 app.post('/test',(req,res)=>{
    const bodyData = req.body;
    console.log('Received Body:', bodyData);

});

app.listen(PORT,()=> console.log('port is listening'));
