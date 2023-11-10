import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBook } from '../services/book';
import { format } from 'date-fns'

export default function ViewBook() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        getBook(id).then(data => {
            data.book.publishDate = format(new Date(data.book.publishDate), 'MMM d, yyyy')
            setBook(data?.book)
        })
    }, [id])

    return (
        <div>
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
        </div>
    )
}
