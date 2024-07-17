// LoginPage.tsx
import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import './login.css'; // Assuming you have custom styles in login.css

const SignupPage: React.FC = () => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here, e.g., authenticate user
    console.log('Username:', email);
    console.log('Password:', password);
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
              value={email}
              placeholder="Email"
              onIonInput={(e: any) => setEmail(e.target.value)}
            ></IonInput>
            <IonInput
              type="password"
              value={password}
              placeholder="Password"
              onIonInput={(e: any) => setPassword(e.target.value)}
            ></IonInput>
             <IonInput
              type="password"
              value={password}
              placeholder="Confirm Password"
              onIonInput={(e: any) => setPassword(e.target.value)}
            ></IonInput>
            <IonButton expand="block" onClick={handleLogin}>Sign Up</IonButton>
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
