import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import axios from 'axios';
import ImageUpload from '../components/ImageUploadComp';
import './upload.css';
import { BASEURL } from '../pages/helpers/url';
import { useHistory } from 'react-router-dom';
import WarningBanner from '../components/WarningBanner';


const Upload: React.FC = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [Description, setDescription] = useState ('');
  const [showWarning, setShowWarning] = useState(false);
  const history = useHistory();
  

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`${BASEURL}/uploadImage`, formData);
            console.log('Uploaded with ID:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
};

const handleSubmit = async () => {

 
  try {
    // Trigger fil input change to upload image
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    let uniqueId = '';
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      uniqueId =  await handleFileInputChange({ target: { files: fileInput.files } } as React.ChangeEvent<HTMLInputElement>);
    }

    // After uploading, proceed to add details
    const newDetail = {
      title,
      subtitle,
      id: uniqueId,
      Description
    };

    if (title.length === 0 || Description.length === 0 || subtitle.length === 0 || uniqueId.length === 0) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    await axios.post(`${BASEURL}/image/addDetails`, newDetail);
    alert('Detail added successfully!');
    setTitle('');
    setSubtitle('');
    setDescription('')
    history.push('/'); // Navigate back to the home page
    window.location.reload(); 
  } catch (error) {
    console.error('There was an error adding the detail!', error);
  }
};



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Upload</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
         <IonGrid className = 'Full_Flow'>

              {/* ImageUpload component */}
                <ImageUpload />

              {/* Form Inputs */}
              <div className='FormData'>
              <IonInput
                value={title}
                placeholder="Enter Title"
                onIonChange={(e) => setTitle(e.detail.value!)}
              />
              <IonInput
                value={subtitle}
                placeholder="Enter Subtitle"
                onIonChange={(e) => setSubtitle(e.detail.value!)}
              />
               <IonInput
                value={Description}
                placeholder="Enter Description"
                onIonChange={(e) => setDescription(e.detail.value!)}
              />

              {/* Submit Button */}
              <IonButton className='SubmitButton' onClick={handleSubmit}>
                Submit
              </IonButton>
              </div>
              {/* Hidden file input for selecting images */}
              <input
                id="fileInput"
                type="file"
                accept="image/jpeg"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
              />
        </IonGrid>
        {showWarning && <WarningBanner message="Please Upload an Image and Check If Fields are Not Empty" />}
      </IonContent>
    </IonPage>
  );
};

export default Upload;
