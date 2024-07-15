import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonList } from '@ionic/react';
import axios from 'axios';
import { BASEURL } from '../pages/helpers/url';


const FormInput: React.FC = () => {
    const SubmitClick = () => {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
          fileInput.click();
          }
      };

  const [title, setTitle] = useState ('')
  const [subtitle, setSubtitle] = useState ('')

  const SubmitButton = async (e) => {
    const newDetail = {
      title,
      subtitle
    };
    
    try {
      await axios.post(`${BASEURL}/image/addDetails`, newDetail);
      alert('Detail added successfully!');
    } catch (error) {
      console.error('There was an error adding the detail!', error);
    }
  };
  return (
    <IonList>
      <IonItem>
      <IonInput
          value={title}
          placeholder="Enter Title"
          onIonChange={(e) => setTitle(e.detail.value!)}
        />
      </IonItem>

      <IonItem>
      <IonInput
          value={subtitle}
          placeholder="Enter Subtitle"
          onIonChange={(e) => setSubtitle(e.detail.value!)}
        />
      </IonItem>

      <IonButton className='SubmitButton' onClick={SubmitButton}>
        Submit
      </IonButton>
    </IonList>
  );
}
export default FormInput;