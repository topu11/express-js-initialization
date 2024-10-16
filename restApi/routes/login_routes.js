const { loginController } = require('../controller/authControllers/loginController');

const router=require('express').Router();

router.post('/',loginController)

module.exports=router;