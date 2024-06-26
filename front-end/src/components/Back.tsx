import React, { Component, useState } from 'react';
import './Back.css'; // Import the CSS file for styling
import { useHistory } from 'react-router-dom';

function Back() {
    const history = useHistory();

    const routeToTab1 = () => {
        history.push('/tab1');
    };

    return (
        <div className="displayContainer">
            <button className="BackButton" onClick={routeToTab1}>
                Back to Home
            </button>
        </div>
    );
}

export default Back;