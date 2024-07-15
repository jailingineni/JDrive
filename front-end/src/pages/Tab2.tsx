import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import { useParams } from 'react-router-dom';
import './Tab2.css';
import Back from '../components/Back';
import axios from 'axios';
import { BASEURL } from './helpers/url';


type PageLoadingStatus = 'Loading' | 'Error' | 'Success';

const Tab2: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [pageState, setPageState] = useState<PageLoadingStatus>('Loading')


  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const metadataResponse = await axios.get(`${BASEURL}/image/${id}/metadata`);
        const detailsResponse = await axios.get(`${BASEURL}/image/${id}/getDetails`);

        // Combine metadata and details
        const combinedData = {
          ...metadataResponse.data,
          ...detailsResponse.data,
        };

        setSelectedCard(combinedData);
        setPageState('Success')
      } catch (error) {
        console.error("Error fetching data:", error);
        setPageState('Error')
      }
    };

    fetchCardDetails();
  }, [id]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';

    const parts = dateString.split(/[: ]/);

    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const date = new Date(year, month, day);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return date.toLocaleDateString(undefined, options);
  };

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
            <IonImg className="image-detail" src={`${BASEURL}/image/${id}`} alt={selectedCard.title} />
            <div className="metadata">
              <h6>{selectedCard.id}</h6>
              <h6>Taken on {formatDate(selectedCard.DateTimeOriginal)}</h6>
              <h6>Description</h6>
              <p>{selectedCard.Description}</p>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (pageState === 'Error') {
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
  }

  if (pageState === 'Loading') {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>JDrive</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Loading Image ... </h2>
          </div>
        </IonContent>
      </IonPage>
    );
  }
};

export default Tab2;
