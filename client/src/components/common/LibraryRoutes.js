import React from 'react'

export default function LibraryRoutes(props) {
    const { Component } = props;

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
                    </ul>
                </nav>
            </header>
            <Component />
        </div>
    )
}
