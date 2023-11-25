import React, { useState } from 'react'
import { forgotPassword } from '../../services/auth';

export default function ForgotPassword() {
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSucessMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSucessMessage(null);
        setErrorMessage(null);

        forgotPassword(formData).then(res => {
            setSucessMessage('The password reset link is successfully sent to your registered email. Please check. The link will be valid for 10 mins')
        }).catch(e => {
            setErrorMessage(e);
        })
    }

    return (
        <div>
            <header>
                <nav className='header-nav'>
                    <a className='header-title' href='/'>My Library</a>
                </nav>
            </header>
            <div className='card'>
                <div className='card-header'>
                    <h5>Forgot Password</h5>
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Username</label>
                            <input
                                type='text'
                                className='form-control'
                                id='username'
                                name='username'
                                value={formData.username}
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Email</label>
                            <input
                                type='text'
                                className='form-control'
                                id='email'
                                name='email'
                                value={formData.email}
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        {errorMessage && (
                            <div className='alert alert-danger'>{errorMessage}</div>
                        )}
                        {successMessage && (
                            <div className='alert alert-success'>{successMessage}</div>
                        )}
                        <div className='row'>
                            <div className='col-md-6'>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                                <button type='reset' className='btn btn-secondary m-2'>Reset</button>
                            </div>
                            <div className='col-md-6' style={{ textAlign: 'right' }}>
                                <p className='text-right'><a style={{ textDecoration: 'none' }} href='/signin'>Back to Login?</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
