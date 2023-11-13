import React, { useEffect, useState } from 'react'
import { getAuthors } from '../services/author';
import { getBook, updateBook } from '../services/book';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';

export default function UpdateBook() {
    const initialBookState = {
        title: "",
        author: null,
        description: "",
        publishDate: "",
        pageCount: null,
        cover: null
    }

    const { id } = useParams();
    const navigate = useNavigate();
    const [authors, setAuthors] = useState([]);
    const [book, setBook] = useState(initialBookState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateBook({
            title: book?.title,
            author: book?.author,
            publishDate: book?.publishDate,
            pageCount: book?.pageCount,
            description: book?.description,
        }, id).then(res => {
            navigate(`/books/${id}`);
        })
    }

    useEffect(() => {
        getAuthors().then(data => {
            setAuthors(data?.authors)
        })
    }, [id])

    useEffect(() => {
        getBook(id).then(data => {
            if (data.book) {
                data.book.publishDate = format(new Date(data.book.publishDate), 'yyyy-MM-dd')
            }
            setBook(data?.book)
        })
    }, [id])

    return (
        <div className='card'>
            <div className='card-header'>
                <h5>Update Book</h5>
            </div>
            <div className='card-body'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Title</label>
                        <input
                            type='text'
                            className='form-control'
                            id='title'
                            name='title'
                            required
                            onChange={handleInputChange}
                            value={book.title}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Author</label>
                        <select
                            className='form-control'
                            id='author'
                            name='author'
                            onChange={handleInputChange}
                            value={book?.author?._id}
                        >
                            <option value="">--- Select One ---</option>
                            {authors.map((author, index) => (
                                <option key={index} value={author._id}>
                                    {author.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Publish Date</label>
                        <input
                            type='date'
                            className='form-control'
                            id='publishDate'
                            name='publishDate'
                            required
                            onChange={handleInputChange}
                            value={book.publishDate}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Page Count</label>
                        <input
                            type='number'
                            className='form-control'
                            id='pageCount'
                            name='pageCount'
                            required
                            onChange={handleInputChange}
                            value={book.pageCount}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Description</label>
                        <textarea
                            className='form-control'
                            id='description'
                            name='description'
                            rows={4}
                            cols={40}
                            onChange={handleInputChange}
                            value={book.description}
                        />
                    </div>

                    <button type='submit' className='btn btn-primary'>Submit</button>
                    <button type='reset' className='btn btn-secondary m-2'>Reset</button>
                </form>
            </div>
        </div>
    )
}
