import React, { useState } from 'react'
import { signin } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export default function Signin() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signin(formData).then(data => {
            localStorage.setItem('token', JSON.stringify(data?.token))
            navigate('/')
        }).catch(e => {
            setErrorMessage(e);
        })
    }

    return (<div>
        <header>
            <nav className='header-nav'>
                <a className='header-title' href='javascript:void(0)'>My Library</a>
            </nav>
        </header>
        <div className='card'>
            <div className='card-header'>
                <h5>Login</h5>
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
                            required
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
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

                    {errorMessage && (
                        <div className='alert alert-danger'>
                            {errorMessage}
                        </div>
                    )}

                    <div className='row'>
                        <div className='col-md-6'>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                            <button type='reset' className='btn btn-secondary m-2'>Reset</button>
                            <p className='mt-2'>Don't have an account? <a style={{ textDecoration: 'none' }} href='/signup'>Sign Up</a></p>
                        </div>
                        <div className='col-md-6' style={{ textAlign: 'right' }}>
                            <p className='mt-2'><a style={{ textDecoration: 'none' }} href='/forgotPassword'>Forgot Password?</a></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}
