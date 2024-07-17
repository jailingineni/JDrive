// LoginPage.tsx
import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import './login.css'; // Assuming you have custom styles in login.css

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here, e.g., authenticate user
    console.log('Email:', email);
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
            <IonTitle className="ion-text-center" style={{ marginBottom: '10px' }}>Login</IonTitle>
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
            <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
            <div className="signup-box">
              <p className="ion-text-center">Don't have an account?</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                 <a href="/signup">Sign Up Here</a>
                </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
