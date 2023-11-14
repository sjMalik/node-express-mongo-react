import React, { useEffect, useState } from 'react'
import { getAuthors } from '../../services/author';
import { createBook } from '../../services/book';
import { useNavigate } from 'react-router-dom';

export default function NewBook() {
    const initialBookState = {
        title: "",
        author: null,
        description: "",
        publishDate: "",
        pageCount: null,
        cover: null
    }

    const navigate = useNavigate();
    const [authors, setAuthors] = useState([]);
    const [book, setBook] = useState(initialBookState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value })
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setBook({ ...book, cover: selectedFile })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createBook(book).then(res => {
            navigate('/books');
        })
    }

    useEffect(() => {
        getAuthors().then(data => {
            setAuthors(data?.authors)
        })
    }, [])

    return (
        <div className='card'>
            <div className='card-header'>
                <h5>New Book</h5>
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
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Author</label>
                        <select
                            className='form-control'
                            id='author'
                            name='author'
                            onChange={handleInputChange}
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
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Choose a File</label>
                        <input
                            className='form-control'
                            type='file'
                            id='fileInput'
                            onChange={handleFileChange}
                        />
                    </div>

                    <button type='submit' className='btn btn-primary'>Submit</button>
                    <button type='reset' className='btn btn-secondary m-2'>Reset</button>
                </form>
            </div>
        </div>
    )
}
