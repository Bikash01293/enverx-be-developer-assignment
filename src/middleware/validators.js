const { checkSchema, validationResult } = require('express-validator');

// Validation rules for the create and update post endpoints
exports.postValidationRules = checkSchema({
  title: {
    notEmpty: {
      errorMessage: 'Title is required',
    },
  },
  content: {
    notEmpty: {
      errorMessage: 'Content is required',
    },
  },
  category: {
    notEmpty: {
      errorMessage: 'Category is required',
    },
  },
});

// Middleware to handle validation errors
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
