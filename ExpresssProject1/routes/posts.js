//const express = require('express')

import express from 'express'
const router=express.Router();

const posts=[
    {id:1,title:"A"},
    {id:2,title:"B"},
    {id:3,title:"C"},
    {id:4,title:"D"},
    {id:5,title:"E"},
    {id:6,title:"F"},
];



router.get('/',(request,respose)=>{
    respose.setHeader('content-type', 'application/json');
    const {limit,offset}=request.query;
    if(!isNaN(limit) && !isNaN(offset))
    {
         const total=parseInt(limit)+parseInt(offset);

           respose.json(posts.slice(parseInt(offset),total)); 
       
         respose.json((posts.filter((item)=>{
              return item.id > parseInt(offset) && item.id <=total
           }))); 
         
         
    }
    respose.send(JSON.stringify(posts));
});
router.get('/:id',(request,respose)=>{
    respose.setHeader('content-type', 'application/json');
    const id=parseInt(request.params.id);
    const single_post=posts.find((post) => post.id === id);
    //console.log(single_post)
   // respose.send(id); 
    if(single_post)
    {
         respose.status(200).json(single_post)
    }else
    {
         respose.status(401).json({
              message:`Not Found ${id}`
         })
    }

    // respose.send(JSON.stringify(posts.filter((item)=>{
    //    return item.id == request.params.id
    // })));

});

router.post('/',(req,res)=>{
    // res.setHeader('content-type', 'application/json');
    const {title} = req.body;
    if(!title)
    {
     res.status(400).json({"message":"Title is required"})
    }else
    {
      let newid=posts.length+1;
      posts.push({
          id:newid,
          title:title
      }) 

      res.status(201).json({
          id:newid,
          title:title
      })
    }
})

//module.exports=router

export default router;