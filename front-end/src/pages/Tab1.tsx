import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonSearchbar, SearchbarInputEventDetail } from '@ionic/react';
import { searchCircle } from 'ionicons/icons';
import './Tab1.css';
import { useState } from 'react';
import Avatar from '../components/Avatar'
import Pill from '../components/pill'
import { IonSearchbarCustomEvent } from '@ionic/core';
import { cards } from './data'; 
import { useHistory } from 'react-router';



// returns 
//console.log(onSearch("do", [{name:'dog'}, {name:'cat'}, {name:'fish'}, {name:'dino'}])); // returns ["dog"]
//console.log(onSearch("f", ['dog', 'cat', 'fish', 'dino'])); // returns ["fish"];
//console.log( onSearch("d", ['dog', 'cat', 'fish', 'dino'])) // returns ["dog, dino"];




const Tab1: React.FC = () => {
  const history = useHistory();

  function onSearch(text: any, elements: string | any[]) {
    let filteredArray = [];
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].title.toLowerCase().startsWith(text)) {
          filteredArray.push(elements[i]);
        }
        
    }
    return filteredArray;
  
   }

  const [filtercards, setFilteredCards]  = useState(cards)

  const handleSearchChange = (e: IonSearchbarCustomEvent<SearchbarInputEventDetail>) => {
    setFilteredCards(onSearch(e.target.value.toLowerCase(), cards));
    
};

const handleCardClick = (card) => {
  history.push('/tab2', { selectedCard: card });
};


return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>JDrive</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonSearchbar onIonInput={(e) => handleSearchChange(e)} searchIcon={searchCircle} placeholder="Custom Search Icon"></IonSearchbar>
      <Pill />
      <div className="all-card">
        {filtercards.map((el) => (
          <IonCard key={el.id} onClick={() => handleCardClick(el) } >
            <img alt="Silhouette of mountains" src={el.src} height={el.height} width={el.width} />
            <IonCardHeader>
              <IonCardTitle>{el.title}</IonCardTitle>
              <IonCardSubtitle>{el.subtitle}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{el.Description}</IonCardContent>
            <Avatar people={el.people} />
          </IonCard>
        ))}
      </div>
    </IonContent>
  </IonPage>
);
};
export default Tab1;
function setSearch(value: any) {
  throw new Error('Function not implemented.');
}

