// WarningBanner.tsx
import React from 'react';
import { IonIcon, IonText, IonContent } from '@ionic/react';
import { warningOutline } from 'ionicons/icons';
import './WarningBanner.css';

const WarningBanner: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="warning-banner">
      <IonIcon icon={warningOutline} className="warning-icon" />
      <IonText className="warning-message">{message}</IonText>
    </div>
  );
};

export default WarningBanner;
