import React from 'react'

export default function Loader() {
    return (
        <div className="d-flex justify-content-center">
            {/* Bootstrap spinner component */}
            <div class="spinner-border m-4" style={{ width: '5rem', height: '5rem' }} role="status">
                {/* <span class="sr-only">Loading...</span> */}
            </div>
        </div>
    )
}
