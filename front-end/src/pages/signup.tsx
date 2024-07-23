// LoginPage.tsx
import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import './login.css'; // Assuming you have custom styles in login.css
import axios from 'axios';
import { BASEURL } from './helpers/url';

const SignupPage: React.FC = () => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  

  const handleSignUp = async () => {
  
    const newUser = {
      FirstName,
      LastName,
      Email,
      Password
    };
  
    if (FirstName.length === 0 || LastName.length === 0) {
      alert('Name Cannot be Empty');
      return;
    }
    if (Email.length === 0) {
      alert('Email Cannot be Empty');
      return;
    }
    if (Password !== ConfirmPassword) {
      alert('Passwords Do Not Match');
      return;
    }
  
    try {
      let response = await axios.post(`${BASEURL}/users/create`, newUser);
      
      if (response.status == 202) {
        alert ('email already exists');
      }
    
    if (response.status === 201) {
     alert('User created successfully');
      // Clear form fields after successful submission
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } 
  }
   catch (error) {
   console.error('Error creating user:', error);
   alert('Error creating user');
  }
};
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="form-container">
          <div className="form">
            <IonTitle className="ion-text-center" style={{ marginBottom: '10px' }}>Sign Up</IonTitle>
            <IonInput
              value={FirstName}
              placeholder="First Name"
              onIonInput={(e: any) => setFirstName(e.target.value)}
            ></IonInput>
             <IonInput
              value={LastName}
              placeholder="Last Name"
              onIonInput={(e: any) => setLastName(e.target.value)}
            ></IonInput>
            <IonInput
              value={Email}
              placeholder="Email"
              onIonInput={(e: any) => setEmail(e.target.value)}
            ></IonInput>
            <IonInput
              type="password"
              value={Password}
              placeholder="Password"
              onIonInput={(e: any) => setPassword(e.target.value)}
            ></IonInput>
             <IonInput
              type="password"
              value={ConfirmPassword}
              placeholder="Confirm Password"
              onIonInput={(e: any) => setConfirmPassword(e.target.value)}
            ></IonInput>
            <IonButton expand="block" onClick={handleSignUp}>Sign Up</IonButton>
            <div className="signup-box">
              <p className="ion-text-center">Have An Account?</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                 <a href="/login">Login Here</a>
                </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
