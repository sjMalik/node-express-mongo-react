import React, { useState } from 'react';
import { register } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatch(false);
            return;
        }

        register(formData).then(res => {
            navigate('/signin')
        }).catch(e => {
            console.log(e)
            setErrorMessage(e)
        }).finally(() => {
            // Reset password match state for the next submission
            setPasswordMatch(true);
        })
    };
    return (
        <div>
            <header>
                <nav className='header-nav'>
                    <a className='header-title' href='/'>My Library</a>
                </nav>
            </header>
            <div className='card'>
                <div className='card-header'>
                    <h5>User Registration</h5>
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
                            </div>)}

                        <div className='row'>
                            <div className='col-md-6'>
                                <button type='submit' className='btn btn-primary'>Sign Up</button>
                                <button type='reset' className='btn btn-secondary m-2'>Reset</button>
                            </div>
                            <div className='col-md-6' style={{ textAlign: 'right' }}>
                                <p className='text-right'>Already have an account? <a style={{ textDecoration: 'none' }} href='/signin'>Login</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
