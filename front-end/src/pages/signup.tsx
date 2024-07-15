import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';

const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const handleLogin = () => {
    console.log('Username:', email);
    console.log('Password:', password);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonItem>
          <IonLabel position="floating">First Name</IonLabel>
          <IonInput type="text" value={firstName} onIonChange={(e) => setFirstName(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Last Name</IonLabel>
          <IonInput type="text" value={lastName} onIonChange={(e) => setLastName(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="text" value={email} onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
        </IonItem>
        <IonButton expand="full" onClick={handleLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;