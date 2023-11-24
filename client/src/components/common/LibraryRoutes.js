import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function LibraryRoutes(props) {
    const { Component } = props;
    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            navigate('/signin')
        }
    })

    function logout() {
        localStorage.removeItem('token');
        navigate('/signin')
    }

    return (
        <div>
            <header>
                <nav className='header-nav'>
                    <a className='header-title' href='/'>My Library</a>
                    <ul>
                        <li><a href='/authors'>Authors</a></li>
                        <li><a href='/authors/new'>New Author</a></li>
                        <li><a href='/books'>Books</a></li>
                        <li><a href='/books/new'>New Book</a></li>
                        <li style={{ marginLeft: '4rem' }}>
                            <button onClick={logout} className='btn btn-link btn-sm'>Log Out</button>
                        </li>
                    </ul>
                </nav>
            </header>
            <Component />
        </div>
    )
}
