import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteBook, getBook } from '../../services/book';
import { format } from 'date-fns'
import Modal from '../common/Modal';

export default function ViewBook() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getBook(id).then(data => {
            data.book.publishDate = format(new Date(data.book.publishDate), 'MMM d, yyyy')
            setBook(data?.book)
        })
    }, [id]);

    const openModal = (id, index) => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const removeBook = () => {
        closeModal();
        deleteBook(id).then((res) => {
            navigate('/books')
        })
    }

    return (
        <div>
            <Modal header={'Remove Book'} isOpen={showModal} onClose={closeModal} action={removeBook}>
                <p>Are you sure to want remove the Book?</p>
            </Modal>
            <h2 className='page-header mb-3'>{book?.title}</h2>
            <img
                src={`data:image/jpeg;base64,${book?.coverImageFile}`}
                height="300"
                width="250"
                alt=""
            />
            <div className='mt-4'>
                <p>Author: {book?.author?.name}</p>
                <p>Published On: {book?.publishDate}</p>
                <p>Page Count: {book?.pageCount}</p>
                <p>Description: {book?.description}</p>
            </div>
            <Link to={`/books/${id}/edit`} className='btn btn-secondary'>Edit</Link>
            <button className='btn btn-danger m-2' onClick={() => openModal(id)}>Delete</button>
        </div>
    )
}
