const debug = require('debug')('library:authorController');
const { AuthorModel, BookModel } = require('../models');

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await AuthorModel.find({});
        res.send({
            authors,
        });
    } catch (e) {
        debug(e);
        res.status(500).send({
            message: 'Unable to get authors',
        });
    }
};

exports.getAuthorById = async (req, res) => {
    try {
        const author = await AuthorModel.findById(req.params.id);
        let books = await BookModel.find({ author: req.params.id }).exec();
        books = books.map((book) => ({
            // eslint-disable-next-line no-underscore-dangle
            _id: book._id,
            title: book.title,
            description: book.description,
            publishDate: book.publishDate,
            pageCount: book.pageCount,
            author: book.author,
            createdAt: book.createdAt,
            coverImageType: book.coverImageType,
            coverImageFile: book.coverImageFile,
        }));
        res.send({ author, books });
    } catch (e) {
        debug(e);
        res.status(500).send({
            message: 'Unable to get author',
        });
    }
};

exports.createAuthor = async (req, res) => {
    try {
        const author = new AuthorModel({
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
};

exports.updateAuthor = async (req, res) => {
    let author;
    try {
        author = await AuthorModel.findById(req.params.id);
        author.name = req.body.name;
        await author.save();
        res.send({ author });
    } catch (e) {
        if (!author) {
            res.status(404).send({
                message: 'AuthorModel not present',
            });
        } else {
            res.status(500).send({
                message: 'Eror updating author',
            });
        }
    }
};

exports.deleteAuthor = async (req, res) => {
    let author;
    try {
        author = await AuthorModel.findOneAndDelete({ _id: req.params.id });
        res.send({ author });
    } catch (e) {
        if (!author) {
            res.status(404).send({
                message: 'AuthorModel not present',
            });
        } else {
            res.status(500).send({
                message: 'Eror deleting author',
            });
        }
    }
};
