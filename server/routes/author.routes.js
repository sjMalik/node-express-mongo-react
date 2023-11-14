const express = require('express');
const authorController = require('../controllers/author.controlller');
const { verifyToken } = require('../middlewares');

const router = express.Router();

router.use(verifyToken);

/**
 * Get all authors
 */
router.get('/', authorController.getAllAuthors);

/**
 * get author by id
 */
router.get('/:id', authorController.getAuthorById);

/**
 * Create a new author
 */
router.post('/', authorController.createAuthor);

/**
 * Update author
 */
router.put('/:id', authorController.updateAuthor);

/**
 * Delete a author
 */
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;
