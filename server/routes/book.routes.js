/* eslint-disable no-param-reassign */
const express = require('express');
const multer = require('multer');
const bookController = require('../controllers/book.controller');

const router = express.Router();

const storage = multer.memoryStorage(); // Store the file in the memory as a buffer
const uploads = multer({ storage });

/**
 * Get all books
 */
router.get('/', bookController.getAllBooks);

/**
 * Get book by id
 */
router.get('/:id', bookController.getBookById);

/**
 * Create a book
 */
router.post('/', uploads.single('cover'), bookController.createBook);

/**
 * Update a book
 */
router.put('/:id', bookController.updateBook);

/**
 * Delete a book
 */
router.delete('/:id', bookController.deleteBook);

module.exports = router;
