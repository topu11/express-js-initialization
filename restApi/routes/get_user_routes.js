const { getAllUsers,singelUser,updatelUser,DeleteUser } = require('../controller/UserController');
const { authCheckMiddleware } = require('../middleware/authCheckMiddleware');
const router=require('express').Router();

router.post('/',authCheckMiddleware,getAllUsers)
router.get('/:userID',authCheckMiddleware,singelUser)
router.put('/:userID',authCheckMiddleware,updatelUser)
router.delete('/:userID',authCheckMiddleware,DeleteUser)

module.exports=router;


