import React, { useEffect, useState } from 'react'
import { resetPassword } from '../../services/auth';

export default function ResetPassword() {
    const [formData, setFormData] = useState({
        token: null,
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [passwordMatch, setPasswordMatch] = useState(true);

    useEffect(() => {
        // Get the current URL
        const params = new URLSearchParams(window.location.search);
        // Retrieve the value of the 'yourParameterName' parameter
        const token = params.get('token');
        setFormData({
            ...formData,
            token,
        })
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setPasswordMatch(true);
        setSuccessMessage(null);
        setErrorMessage(null);
        // Check if password match
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatch(false);
            return;
        }

        resetPassword(formData).then(data => {
            setSuccessMessage('Password changed successfully. Now try log in')
        }).catch(e => {
            setErrorMessage(e)
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
                    <h5>Reset Password</h5>
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Password</label>
                            <input
                                type='password'
                                className='form-control'
                                id='password'
                                name='password'
                                value={formData.password}
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Confirm Password</label>
                            <input
                                type='password'
                                className='form-control'
                                id='confirmPassword'
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                required
                                onChange={handleInputChange}
                            />
                            {!passwordMatch && (
                                <p style={{ color: 'red' }}>Passwords do not match!</p>
                            )}
                        </div>
                        {passwordMatch && errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
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
                                <p className='text-right'><a style={{ textDecoration: 'none' }} href='/signin'>Back to Login</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
