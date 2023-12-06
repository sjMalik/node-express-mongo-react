import React, { useEffect, useState } from 'react'
import { getBooks } from '../../services/book';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';

export default function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getBooks().then(data => {
            setBooks(data?.books)
        }).catch(e => { }).finally(() => {
            setLoading(false); // Hide loader after data is fetched or in case of error
        })
    }, []);

    const viewBook = (id) => {
        navigate(`/books/${id}`)
    }

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <h2 className='page-header mb-3'>Book Gallery</h2>
                    {books.length === 0 ? (
                        <div className='text-center mt-4'>No records found</div>
                    ) :
                        (<div className='row'>
                            {books.map((book, index) => (
                                <div key={index} className='col-md-3 mb-3'>
                                    <img
                                        src={`data:image/jpeg;base64,${book.coverImageFile}`}
                                        height="300"
                                        width="250"
                                        alt=""
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => viewBook(book._id)}
                                    />
                                    <p className='mt-1 book-title'>{book.title}</p>
                                </div>
                            ))}
                        </div>)
                    }
                </div>
            )}
        </div>
    )
}
