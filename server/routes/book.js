/* eslint-disable no-param-reassign */
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const debug = require('debug')('library:bookRoute');
const multer = require('multer');
const Book = require('../models/book');

const router = express.Router();
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const storage = multer.memoryStorage(); // Store the file in the memory as a buffer
const uploads = multer({ storage });

/**
 * Get all books
 */
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    res.send({
      books,
    });
  } catch (e) {
    debug(e);
    res.status(500).send({
      message: 'Unable to get books',
    });
  }
});

/**
 * Get book by id
 */
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author').exec();
    res.send({ book });
  } catch (e) {
    debug(e);
    res.status(500).send({
      message: 'Unable to get the book',
    });
  }
});

/**
 * Create a book
 */
router.post('/', uploads.single('cover'), async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    publishDate: req.body.publishDate,
    pageCount: req.body.pageCount,
  });
  try {
    // eslint-disable-next-line no-use-before-define
    saveCover(book, req.file);
    await book.save();
    res.status(200).end();
  } catch (e) {
    debug(e);
    res.status(500).send({
      message: 'Error creating book',
    });
  }
});

/**
 * Update a book
 */
router.put('/:id', async (req, res) => {
  let book;
  try {
    book = await Book.findById(req.params.id);
    book.title = req.body.title;
    book.author = req.body.author;
    book.description = req.body.description;
    book.publishDate = req.body.publishDate;
    book.pageCount = req.body.pageCount;
    await book.save();
    res.status(200).end();
  } catch (e) {
    if (!book) {
      res.status(404).send({
        message: 'Book not found',
      });
    } else {
      res.status(500).send({
        message: 'Error in updating book',
      });
    }
  }
});

/**
 * Delete a book
 */
router.delete('/:id', async (req, res) => {
  let book;
  try {
    book = await Book.findOneAndDelete(req.params.id);
    res.status(200).end();
  } catch (e) {
    if (!book) {
      res.status(404).send({
        message: 'Book not found',
      });
    } else {
      res.status(500).send({
        message: 'Error in deleting book',
      });
    }
  }
});

function saveCover(book, cover) {
  if (!cover) return;
  if (cover && imageMimeTypes.includes(cover.mimetype)) {
    book.coverImage = cover.buffer;
    book.coverImageType = cover.mimetype;
  }
}

module.exports = router;
