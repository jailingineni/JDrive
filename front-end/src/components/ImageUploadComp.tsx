import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

const ImageUpload: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <IonCard className='Card'>
      <IonCardHeader>
        <IonCardTitle>Card Title</IonCardTitle>
        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>

      {/* Hidden file input for selecting images */}
      <input
        id="fileInput"
        type="file"
        accept="image/jpeg"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Image preview */}
      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Preview" style={{height:400, width:300 }} />
        </div>
      )}

      {/* Button to trigger file input */}
      <IonButton fill="clear" onClick={handleUploadClick}>Upload</IonButton>
    </IonCard>
  );
};

export default ImageUpload;
