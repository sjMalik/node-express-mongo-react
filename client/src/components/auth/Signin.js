import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Signin() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        login(formData).then(data => {
            console.log(data);
            localStorage.setItem("token", JSON.stringify(data?.token));
            navigate('/')
        }).catch(e => {
            console.log(e)
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
                                value={formData.username}
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-outline-secondary"
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
                            {/* <input
                                type='password'
                                className='form-control'
                                id='password'
                                name='password'
                                value={formData.password}
                                required
                                onChange={handleInputChange}
                            /> */}
                        </div>
                        {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>)}
                        <div className='row'>
                            <div className='col-md-6'>
                                <button type='submit' className='btn btn-primary'>Sign In</button>
                                <p className='text-right mt-2'>
                                    Dont have an account? <a style={{ textDecoration: 'none' }} href='/signup'>Register</a>
                                </p>
                            </div>
                            <div className='col-md-6' style={{ textAlign: 'right' }}>
                                <p className='text-right'><a style={{ textDecoration: 'none' }} href='/forgotPassword'>Forgot Password?</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
