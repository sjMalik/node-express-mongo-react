import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteAuthor, getAuthor } from '../../services/author';
import Modal from '../common/Modal';

export default function Author() {
    const { id } = useParams();
    const [author, setAuthor] = useState({
        author: {
            name: null
        }
    });
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    const openModal = (id, index) => {
        setSelectedId(id);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const removeAuthor = () => {
        closeModal();
        deleteAuthor(selectedId)
            .then(data => {
                navigate(`/authors`)
            }).catch(e => { })
    }

    useEffect(() => {
        getAuthor(id).then(data => {
            setAuthor(data?.author);
            setBooks(data?.books);
        }).catch(e => { })
    }, [id]);

    const viewBook = (id) => {
        navigate(`/books/${id}`)
    }

    return (
        <div>
            <Modal header={'Remove Author'} isOpen={showModal} onClose={closeModal} action={removeAuthor}>
                <p>Are you sure to want remove the Author?</p>
            </Modal>
            <h2 className='page-header'>{author.name}</h2>
            <div className='btn-row mt-3'>
                <Link className='btn btn-secondary' to={`/authors/${id}/edit`}>Edit</Link>
                <button className='btn btn-danger m-2' onClick={() => openModal(id)}>Delete</button>
            </div>

            <h4 className='page-subheader mb-3 mt-3'>Book Gallery</h4>
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
    )
}
