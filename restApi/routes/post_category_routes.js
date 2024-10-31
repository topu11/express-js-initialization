const { addPostCategory,getAllPostcategories,updatePostCategory,getSinglePostCategoryByID } = require('../controller/postCategoryController');
const { authCheckMiddleware } = require('../middleware/authCheckMiddleware');
const router=require('express').Router();

router.post('/',authCheckMiddleware,addPostCategory)
router.get('/',authCheckMiddleware,getAllPostcategories)
router.put('/:postCategoryID',authCheckMiddleware,updatePostCategory)
router.get('/:postCategoryID',authCheckMiddleware,getSinglePostCategoryByID)


module.exports=router;