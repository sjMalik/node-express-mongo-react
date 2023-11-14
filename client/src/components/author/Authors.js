import React, { useEffect, useState } from 'react'
import { deleteAuthor, getAuthors } from '../../services/author';
import { Link } from 'react-router-dom'
import Modal from '../common/Modal';

export default function Authors() {
    const [authors, setAuthors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [indexToRemove, setIndexToRemove] = useState(null);

    const openModal = (id, index) => {
        setSelectedId(id);
        setIndexToRemove(index);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    // useEffect(() => {
    //     getAuthors().then(data => {
    //         setAuthors(data?.authors)
    //     })
    // }, [])

    const removeAuthor = () => {
        closeModal();
        deleteAuthor(selectedId)
            .then(data => {
                setAuthors((prevState) => {
                    const newState = [...prevState];
                    newState.splice(indexToRemove, 1);
                    return newState;
                })
            })
    }

    return (
        <div>
            <Modal header={'Remove Author'} isOpen={showModal} onClose={closeModal} action={removeAuthor}>
                <p>Are you sure to want remove the Author?</p>
            </Modal>
            <h2 className='text-center mb-3'>Author List</h2>
            {authors.length === 0 ? (
                <div className='text-center mt-4'>No records found</div>
            ) :
                (<div className='list-group'>
                    {authors.map((author, index) => {
                        return (
                            <li key={index} className='list-group-item'>
                                <span className='author-name mb-2'>{author.name}</span><br />
                                <Link className='btn btn-primary' to={`/authors/${author._id}`}>View</Link>
                                <Link className='btn btn-secondary m-2' to={`/authors/${author._id}/edit`}>Edit</Link>
                                <button className='btn btn-danger' onClick={() => openModal(author._id, index)}>Delete</button>
                            </li>
                        )
                    })}
                </div>)
            }
        </div>
    )
}
