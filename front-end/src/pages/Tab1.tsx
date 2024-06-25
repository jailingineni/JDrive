import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonSearchbar, SearchbarInputEventDetail } from '@ionic/react';
import { searchCircle } from 'ionicons/icons';
import './Tab1.css';
import { useState } from 'react';
import Avatar from '../components/Avatar'
import Pill from '../components/pill'
import { IonSearchbarCustomEvent } from '@ionic/core';



// returns 
//console.log(onSearch("do", [{name:'dog'}, {name:'cat'}, {name:'fish'}, {name:'dino'}])); // returns ["dog"]
//console.log(onSearch("f", ['dog', 'cat', 'fish', 'dino'])); // returns ["fish"];
//console.log( onSearch("d", ['dog', 'cat', 'fish', 'dino'])) // returns ["dog, dino"];




const Tab1: React.FC = () => {


  function onSearch(text: any, elements: string | any[]) {
    let filteredArray = [];
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].title.toLowerCase().startsWith(text)) {
          filteredArray.push(elements[i]);
        }
        
    }
    return filteredArray;
  
   }


   
  const cards = [
    { routerLink: "/tab2", src: "https://compote.slate.com/images/22ce4663-4205-4345-8489-bc914da1f272.jpeg?crop=1560%2C1040%2Cx0%2Cy0", height: 300, width: "100%", title: "Some Game", subtitle: "Playing some Game", date: "Office", Description: "Hello World", id: 1 , people:['Sridhar Lingineni', 'Jaideep Lingineni'], tags:["eiffel tower", "dog"]},
    { routerLink: "/tab2", src: "https://compote.slate.com/images/22ce4663-4205-4345-8489-bc914da1f272.jpeg?crop=1560%2C1040%2Cx0%2Cy0", height: 300, width: "100%", title: "some Game", subtitle: "Playing some Game", date: "Office", Description: "Hello World" , id : 2, people:['Sridhar Lingineni', 'Jaideep Lingineni'], tags:["eiffel tower", "dog", "cookie"]},
    { routerLink: "/tab2", src: "https://compote.slate.com/images/22ce4663-4205-4345-8489-bc914da1f272.jpeg?crop=1560%2C1040%2Cx0%2Cy0", height: 300, width: "100%", title: "Jme Game", subtitle: "Playing some Game", date: "Office", Description: "Hello World" , id: 3,  people:['Sridhar Lingineni', 'Jaideep Lingineni'], tags:["eiffel tower", "dog", "cookie"]},
    { routerLink: "/tab2", src: "https://compote.slate.com/images/22ce4663-4205-4345-8489-bc914da1f272.jpeg?crop=1560%2C1040%2Cx0%2Cy0", height: 300, width: "100%", title: "Home Game", subtitle: "Playing some Game", date: "Office", Description: "Hello World", id: 4 , people:['Sridhar Lingineni', 'Jaideep Lingineni'], tags:["eiffel tower", "dog", "cookie"]},
    { routerLink: "/tab2", src: "https://compote.slate.com/images/22ce4663-4205-4345-8489-bc914da1f272.jpeg?crop=1560%2C1040%2Cx0%2Cy0", height: 300, width: "100%", title: "Hme Game", subtitle: "Playing some Game", date: "Office", Description: "Hello World" , id: 5, people:['Sridhar Lingineni', 'Jaideep Lingineni'], tags:["eiffel tower", "dog", "cookie"]},
    { routerLink: "/tab2", src: "https://compote.slate.com/images/22ce4663-4205-4345-8489-bc914da1f272.jpeg?crop=1560%2C1040%2Cx0%2Cy0", height: 300, width: "100%", title: "Some Game", subtitle: "Playing some Game", date: "Office", Description: "Hello World" , id: 6, people:['Sridhar Lingineni', 'Jaideep Lingineni'], tags:["eiffel tower", "dog", "cookie"]},
    { routerLink: "/tab2", src: "https://compote.slate.com/images/22ce4663-4205-4345-8489-bc914da1f272.jpeg?crop=1560%2C1040%2Cx0%2Cy0", height: 300, width: "100%", title: "Some Game", subtitle: "Playing some Game", date: "Office", Description: "Hello World" , id: 7, people:['Sridhar Lingineni', 'Jaideep Lingineni'], tags:["eiffel tower", "dog", "cookie"]},
    { routerLink: "/tab2", src: "https://compote.slate.com/images/22ce4663-4205-4345-8489-bc914da1f272.jpeg?crop=1560%2C1040%2Cx0%2Cy0", height: 300, width: "100%", title: "Hello Game", subtitle: "Playing some Game", date: "Office", Description: "Hello World" , id: 8, people:['Sridhar Lingineni', 'Jaideep Lingineni'], tags:["eiffel tower", "dog", "cookie"]}
  ];
  const [filtercards, setFilteredCards]  = useState(cards)

  const handleSearchChange = (e: IonSearchbarCustomEvent<SearchbarInputEventDetail>) => {
    setFilteredCards(onSearch(e.target.value.toLowerCase(), cards));
    
};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>JDrive</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>    
      <IonSearchbar onIonInput = {(e) => handleSearchChange(e)} searchIcon={searchCircle} placeholder="Custom Search Icon" ></IonSearchbar>
      <Pill  />
        <div className="all-card">
        {filtercards.map((el) => (
          <IonCard key = {el.id} routerLink = {el.routerLink}>
            
            
          <img alt="Silhouette of mountains" src={el.src} height= {el.height} width={el.width}/>
          <IonCardHeader>
            
            <Avatar people = {el.people}/>
            <IonCardTitle>{el.title} </IonCardTitle>
            <IonCardSubtitle>{el.subtitle}</IonCardSubtitle>
          </IonCardHeader>
    
          <IonCardContent>{el.Description}</IonCardContent>
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

