import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { cards } from './data'; 

const Tab2: React.FC = () => {
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
          <IonImg 
            src="https://docs-demo.ionic.io/assets/madison.jpg"
            alt="The Wisconsin State Capitol building in Madison, WI at night" ></IonImg>

          <div className="metadata">
            <h6>canon-ixus.jpg</h6>
            <h6>Taken on July 20 2023</h6>
            <h6>Description</h6>
            <p> The Wisconsin State Capitol building in Madison, WI at night</p>
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
