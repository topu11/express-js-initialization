const { signup } = require('../controller/authControllers/signupController');

const router=require('express').Router();

router.post('/',signup)

module.exports=router;