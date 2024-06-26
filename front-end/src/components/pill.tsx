import React, { Component, useState } from 'react';
import './Pill.css'; // Import the CSS file for styling

// function Pill(props) {
//     
//   
//     const result = props.tag.map((el) => {
//         return (
//             <div className="circle" key={el}>
//                 <p className="text">{el}</p>
//             </div>
//         );
//     });

    
//     return (
//         <div className="pill-container">
//             {result}
//         </div>
//     );
// }

function Pill(props)  {
    const [state, setState] = useState<boolean>(false)
    const [state1, setState1] = useState<boolean>(false)
    const [state2, setState2] = useState<boolean>(false)
    const [filteredCards, setFilteredCards] = useState(props);

    
return (
    <div className = "displayContainer">
        <button className="button"  onClick={() => setState(!state)}
        style={{ backgroundColor: state ? 'lightblue' : 'white' }} >Pill Button </button>
        <button className="button"  onClick={() => setState1(!state1)}
        style={{ backgroundColor: state1 ? 'lightblue' : 'white' }} >Pill Button </button>
        <button className="button"  onClick={() => setState2(!state2)}
        style={{ backgroundColor: state2 ? 'lightblue' : 'white' }} >Pill Button </button>
        </div>
        
    );

}

export default Pill;