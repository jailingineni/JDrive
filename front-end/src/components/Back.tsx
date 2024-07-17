import React, { Component, useState } from 'react';
import './Back.css'; // Import the CSS file for styling
import { useHistory } from 'react-router-dom';
import { IonButton } from '@ionic/react';

function Back() {
    return (
        <div className="displayContainer">
            <IonButton className="BackButton" routerLink="/home" >
                Back to Home
            </IonButton>
        </div>
    );
}

export default Back;