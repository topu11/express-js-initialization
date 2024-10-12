const { signupController } = require('../controller/authControllers/signupController');

const router=require('express').Router();

router.post('/',signupController)

module.exports=router;