// Tab2.tsx
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import { Redirect, useLocation } from 'react-router-dom';
import './Tab2.css';
import Back from '../components/Back'

const Tab2: React.FC = () => {
  const location = useLocation<{ selectedCard: any }>();
  const { selectedCard } = location.state || {};

  if (selectedCard) {
   

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>JDrive</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">JDrive</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="view-container">
          <Back/>
          <IonImg className = "image-detail" src={selectedCard.src} alt={selectedCard.title}  />
          <div className="metadata">
            <h6>{selectedCard.title}</h6>
            <h6>Taken on {selectedCard.date}</h6>
            <h6>Description</h6>
            <p>{selectedCard.Description}</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
return <Redirect to="/tab1" />;
};

export default Tab2;
