import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSearchbar, SearchbarInputEventDetail, IonButton, IonButtons } from '@ionic/react';
import { searchCircle } from 'ionicons/icons';
import './Tab1.css';
import { useState, useEffect } from 'react';
import Avatar from '../components/Avatar';
import Pill from '../components/PillGroup';
import { IonSearchbarCustomEvent } from '@ionic/core';
import { useHistory } from 'react-router';
import axios from 'axios';
import { BASEURL } from './helpers/url';

type Card = {
  ID: string;
  title: string;
  subtitle: string;
};

const Tab1: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASEURL}/image/deets`);
        const cardData: Card[] = response.data.details.map((item: any) => ({
          ID: item.id,
          title: item.title,
          subtitle: item.subtitle,
        }));
        setCards(cardData);
        setFilteredCards(cardData);
      } catch (error) {
        console.error("Error fetching the card details:", error);
      }
    };

    fetchData();
  }, []);

   const onSearch = (text: string, elements: Card[]) => {
    return elements.filter(card =>
      card.title.toLowerCase().startsWith(text.toLowerCase())
    );
  };

  const handleSearchChange = (e: IonSearchbarCustomEvent<SearchbarInputEventDetail>) => {
    const searchText = e.target.value;
    setFilteredCards(onSearch(searchText, cards));
  };

  const handleCardClick = (card: Card) => {
    history.push(`/tab2/${card.ID}`);
  };
  
   const handlePillClick = (selectedTag: string) => {
    if (!selectedTag) {
      setFilteredCards(cards);
    } else {
      const filteredArray = cards.filter(card => card.title.includes(selectedTag));
      setFilteredCards(filteredArray);
    }
  };

  console.log(filteredCards);
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
        <IonTitle>JDrive</IonTitle>
        <IonButtons slot="end">
          <IonButton className='Upload_Button' style={{width:'100%', marginRight: '16px', marginTop: '15px', marginBottom: '15px'}} routerLink="/upload">Upload</IonButton>
        </IonButtons>
      </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
          onIonInput={(e) => handleSearchChange(e)}
          searchIcon={searchCircle}
          placeholder="Custom Search Icon"
        ></IonSearchbar>
       <div className="PillContainer">
         <Pill cards={cards} onPillClick={handlePillClick} />
        </div>
        <div className="all-card">
          {filteredCards.map((card, index) => (
            <IonCard key={index} onClick={() => handleCardClick(card)}>
              <img alt="Silhouette of mountains" src={`${BASEURL}/image/${card.ID}`} height="200" width="400" />
              <IonCardHeader>
                <IonCardTitle>{card.title}</IonCardTitle>
                <IonCardSubtitle>{card.subtitle}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>{card.ID}</IonCardContent>
              <Avatar people={[]} />
            </IonCard>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
