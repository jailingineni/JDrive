import React, { useState } from 'react';

function getPills(cards) {
  const tagsMap = {};
  cards.forEach(card => {
    if (card.tags) {
      card.tags.forEach(tag => {
        if (!tagsMap[tag]) {
          tagsMap[tag] = [];
        }
        tagsMap[tag].push(card);
      });
    }
  });

  return Object.keys(tagsMap);
}

function Pill({ cards, onPillClick}) {
  const [selectedPillIndex, setSelectedPillIndex] = useState(null);

  const handleButtonClick = (index) => {
    if (index === selectedPillIndex) {
      setSelectedPillIndex(null);
      onPillClick(null);
    } else {
      setSelectedPillIndex(index);
      const selectedTag = getPills(cards)[index];
      onPillClick(selectedTag);
    }
  };

  const result = getPills(cards);

  return (
    <div className='displayContainer'>
      {result.map((el, index) =>
        <button key={index} className="button" onClick={() => handleButtonClick(index)}
          style={{ backgroundColor: selectedPillIndex === index ? 'lightblue' : 'white' }}>
          {el}
        </button>
      )}
    </div>
  );
}

export default Pill;