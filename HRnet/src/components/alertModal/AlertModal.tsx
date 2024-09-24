import React from 'react';

const AlertModal = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default AlertModal;
