const { addPostType } = require('../controller/postTypeController');
const { authCheckMiddleware } = require('../middleware/authCheckMiddleware');
const router=require('express').Router();

router.post('/',authCheckMiddleware,addPostType)
// router.get('/:userID',authCheckMiddleware,singelUser)
// router.put('/:userID',authCheckMiddleware,updatelUser)
// router.delete('/:userID',authCheckMiddleware,DeleteUser)

module.exports=router;