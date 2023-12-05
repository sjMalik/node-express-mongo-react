import React, { useEffect, useState } from 'react'
import { resetPassword } from '../../services/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export default function ResetPassword() {
    const [formData, setFormData] = useState({
        token: null,
        password: '',
        confirmPassword: ''
    });
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Get the current url
        const params = new URLSearchParams(window.location.search);
        // Retrive the value of the token
        const token = params.get('token');
        setFormData({
            ...formData,
            token
        })
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setPasswordMatch(true);

        // Check if password match
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatch(false);
            return
        }

        resetPassword(formData).then(data => {
            setSuccessMessage(data.message)
        }).catch(e => {
            setErrorMessage(e);
        })
    }

    return (
        <div>
            <header>
                <nav className='header-nav'>
                    <a className='header-title' href='javascript:void(0)'>My Library</a>
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
                            <div className='input-group'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className='form-control'
                                    id='password'
                                    name='password'
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <div className='input-group-append'>
                                    <button
                                        className='btn btn-outline-secondary'
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEyeSlash : faEye}
                                            style={{ fontSize: '1.2em' }}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Confirm Password</label>

                            <div className='input-group'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className='form-control'
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                                <div className='input-group-append'>
                                    <button
                                        className='btn btn-outline-secondary'
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEyeSlash : faEye}
                                            style={{ fontSize: '1.2em' }}
                                        />
                                    </button>
                                </div>
                            </div>
                            {!passwordMatch && (
                                <p style={{ color: 'red' }}>Password do not match!</p>
                            )}
                        </div>

                        {passwordMatch && errorMessage && (
                            <div className='alert alert-danger'>
                                {errorMessage}
                            </div>
                        )}
                        {successMessage && (
                            <div className='alert alert-success'>
                                {successMessage}
                            </div>
                        )}

                        <div className='row'>
                            <div className='col-md-6'>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                                <button type='reset' className='btn btn-secondary m-2'>Reset</button>
                            </div>
                            <div className='col-md-6' style={{ textAlign: 'right' }}>
                                <p>Already have an account? <a style={{ textDecoration: 'none' }} href='/signin'>Sign In</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
