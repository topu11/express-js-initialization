const { addPostType,getAllPosttypes,updatePostType,getSinglePostTypeByID } = require('../controller/postTypeController');
const { authCheckMiddleware } = require('../middleware/authCheckMiddleware');
const router=require('express').Router();

router.post('/',authCheckMiddleware,addPostType)
router.get('/',authCheckMiddleware,getAllPosttypes)
router.put('/:postTypeID',authCheckMiddleware,updatePostType)
router.get('/:postTypeID',authCheckMiddleware,getSinglePostTypeByID)
// router.delete('/:userID',authCheckMiddleware,DeleteUser)

module.exports=router;