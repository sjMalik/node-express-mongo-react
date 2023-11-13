import React from 'react'

export default function Modal({ isOpen, onClose, action, header, children }) {
    if (!isOpen) {
        return null
    }
    return (
        <div className='modal show' tabIndex="-1" role='dialog' style={{ display: 'block' }}>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>{header}</h5>
                        <button type='button' className='btn btn-sm btn-outline-secondary' onClick={onClose}>
                            <span area-hidden='true'>&times;</span>
                        </button>
                    </div>
                    <div className='modal-body'>
                        {children}
                    </div>
                    <div className='modal-footer'>
                        <button className='btn btn-danger' onClick={action}>Confirm</button>
                        <button className='btn btn-secondary' onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
