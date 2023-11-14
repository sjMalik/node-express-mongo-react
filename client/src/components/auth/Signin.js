import React, { useState } from 'react'
import { signin } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signin(formData).then(data => {
            navigate('/')
        }).catch(e => {
            setErrorMessage(e);
        })
    }

    return (
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
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                        />
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
                        </div>
                        <div className='col-md-6' style={{ textAlign: 'right' }}>
                            <p>Don't have an account? <a href='/signup'>Sign Up</a></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
