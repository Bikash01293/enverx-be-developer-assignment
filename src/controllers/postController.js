const { validationResult } = require('express-validator');
const Post = require('../models/post');

// Get all blog posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

// Get a specific blog post by ID
exports.getPostById = async (req, res, next) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

// Create a new blog post
exports.createPost = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, category } = req.body;

  try {
    const newPost = await Post.create({ title, content, category });
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

// Update an existing blog post
exports.updatePost = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const postId = req.params.id;
  const { title, content, category } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content, category, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
};

// Delete a blog post
exports.deletePost = async (req, res, next) => {
  const postId = req.params.id;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
};

