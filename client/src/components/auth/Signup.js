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
        }).finally(() => {
            // Reset password match state for the next submission
            setPasswordMatch(true);
        })
    };
    return (
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

                    <button type='submit' className='btn btn-primary'>Submit</button>
                    <button type='reset' className='btn btn-secondary m-2'>Reset</button>
                </form>
            </div>
        </div>
    )
}
