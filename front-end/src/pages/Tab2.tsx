import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import { useParams } from 'react-router-dom';
import './Tab2.css';
import Back from '../components/Back';
import { cards } from './data';

const Tab2: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const selectedCard = cards.find(card => card.id === parseInt(id, 10));

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
            <Back />
            <IonImg className="image-detail" src={selectedCard.src} alt={selectedCard.title} />
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>404 - Page Not Found</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>404 - Page Not Found</h2>
          <p>The page you are looking for does not exist.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;