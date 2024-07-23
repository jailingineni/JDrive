import React, { useState } from 'react';
import {
  IonContent,
  IonInput,
  IonButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAlert,
} from '@ionic/react';
import './login.css'; // Assuming you have custom styles in login.css
import axios from 'axios';
import { BASEURL } from './helpers/url'; // Assuming you have a base URL defined
import { useHistory } from 'react-router-dom';
import { getLoggedInUser, setLoggedInUser } from '../store';

const LoginPage: React.FC = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASEURL}/users/login`, {
        email: Email,
        password: Password,
      });

      const { userId } = response.data;
      setLoggedInUser(userId);
      
      // save to localstorage

      // localstorage.get(')
      // 

      // Handle successful login
      // For example, navigate to another page or show a success message
      console.log('Login successful:', response.data);
      history.push('/home');
      window.location.reload();

    } catch (error) {
      console.error('Error logging in:');
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
            <IonTitle className="ion-text-center" style={{ marginBottom: '10px' }}>Login</IonTitle>
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

      {/* Error alert */}
      <IonAlert
        isOpen={errorAlert}
        onDidDismiss={() => setErrorAlert(false)}
        header={'Login Failed'}
        message={errorMessage}
        buttons={['OK']}
      />
    </IonPage>
  );
};

export default LoginPage;
