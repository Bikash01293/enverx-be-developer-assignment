const express = require('express');
const router = express.Router();
const { postValidationRules, validate } = require('../middleware/validators')

const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} = require('../controllers/postController');

router.get('/', getAllPosts);
router.get('/:id', getPostById);

//Use the validation middleware for the create and update endpoints
router.post('/', postValidationRules, validate, createPost);
router.put('/:id', postValidationRules, validate, updatePost);

router.delete('/:id', deletePost);

module.exports = router;