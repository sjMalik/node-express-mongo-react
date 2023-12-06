import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <h1 className="display-4">404 Not Found</h1>
                    <p className="lead">Sorry, the page you are looking for does not exist.</p>
                    <Link to="/" className="btn btn-primary">Go to Home</Link>
                </div>
            </div>
        </div>
    )
}
