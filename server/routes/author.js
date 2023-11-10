const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const debug = require('debug')('library:authorRoute');
const Author = require('../models/author');
const Book = require('../models/book');

const router = express.Router();

/**
 * Get all authors
 */
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find({});
    res.send({
      authors,
    });
  } catch (e) {
    debug(e);
    res.status(500).send({
      message: 'Unable to get authors',
    });
  }
});

/**
 * get author by id
 */
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: req.params.id }).exec();
    res.send({ author, books });
  } catch (e) {
    debug(e);
    res.status(500).send({
      message: 'Unable to get author',
    });
  }
});

/**
 * Create a new author
 */
router.post('/', async (req, res) => {
  try {
    const author = new Author({
      name: req.body.name,
    });
    await author.save();
    res.send({ author });
  } catch (e) {
    debug(e);
    res.status(500).send({
      message: 'Error creating author',
    });
  }
});

/**
 * Update author
 */
router.put('/:id', async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.send({ author });
  } catch (e) {
    if (!author) {
      res.status(404).send({
        message: 'Author not present',
      });
    } else {
      res.status(500).send({
        message: 'Eror updating author',
      });
    }
  }
});

/**
 * Delete a author
 */
router.delete('/:id', async (req, res) => {
  let author;
  try {
    author = await Author.findOneAndDelete({ _id: req.params.id });
    res.send({ author });
  } catch (e) {
    if (!author) {
      res.status(404).send({
        message: 'Author not present',
      });
    } else {
      res.status(500).send({
        message: 'Eror deleting author',
      });
    }
  }
});

module.exports = router;
