/* eslint-disable no-param-reassign */
const debug = require('debug')('library:bookController');
const { BookModel } = require('../models');

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

exports.getAllBooks = async (req, res) => {
    try {
        const books = await BookModel.find({});
        res.send({
            books,
        });
    } catch (e) {
        debug(e);
        res.status(500).send({
            message: 'Unable to get books',
        });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.id).populate('author').exec();
        delete book.coverImage;
        res.send({ book });
    } catch (e) {
        debug(e);
        res.status(500).send({
            message: 'Unable to get the book',
        });
    }
};

exports.createBook = async (req, res) => {
    const book = new BookModel({
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
};

exports.updateBook = async (req, res) => {
    let book;
    try {
        book = await BookModel.findById(req.params.id);
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
                message: 'BookModel not found',
            });
        } else {
            res.status(500).send({
                message: 'Error in updating book',
            });
        }
    }
};

exports.deleteBook = async (req, res) => {
    let book;
    try {
        book = await BookModel.findOneAndDelete(req.params.id);
        res.status(200).end();
    } catch (e) {
        if (!book) {
            res.status(404).send({
                message: 'BookModel not found',
            });
        } else {
            res.status(500).send({
                message: 'Error in deleting book',
            });
        }
    }
};

function saveCover(book, cover) {
    if (!cover) return;
    if (cover && imageMimeTypes.includes(cover.mimetype)) {
        book.coverImage = cover.buffer;
        book.coverImageType = cover.mimetype;
    }
}
