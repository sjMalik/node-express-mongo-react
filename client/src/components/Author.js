import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAuthor } from '../services/author';

export default function Author() {
    const { id } = useParams();
    const [author, setAuthor] = useState({
        author: {
            name: null
        }
    });

    useEffect(() => {
        getAuthor(id).then(data => {
            setAuthor(data?.author)
        })
    }, [id])

    return (
        <div>
            <h2 className='page-header'>{author.name}</h2>
            <div className='btn-row mt-3'>
                <Link className='btn btn-secondary' to={`/authors/${id}/edit`}>Edit</Link>
            </div>
        </div>
    )
}
