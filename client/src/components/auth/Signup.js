import React, { useState } from 'react'
import { signup } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordMatch, setPasswordMatch] = useState(true);
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
        setPasswordMatch(true);

        // Check if password match
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatch(false);
            return
        }

        signup(formData).then(data => {
            navigate('/signin')
        }).catch(e => {
            setErrorMessage(e);
        })
    }
    return (
        <div className='card'>
            <div className='card-header'>
                <h5>Registration</h5>
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
                        <label className='form-label'>Email</label>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            required
                            value={formData.email}
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
                    <div className='mb-3'>
                        <label className='form-label'>Confirm Password</label>
                        <input
                            type='password'
                            className='form-control'
                            id='confirmPassword'
                            name='confirmPassword'
                            required
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        {!passwordMatch && (
                            <p style={{ color: 'red' }}>Password do not match!</p>
                        )}
                    </div>

                    {passwordMatch && errorMessage && (
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
                            <p>Already have an account? <a href='/signin'>Sign In</a></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
