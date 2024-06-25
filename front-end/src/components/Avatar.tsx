import React, { Component } from 'react';
import './Avatar.css'; // Import the CSS file for styling

function Avatar(props) {
    const result = acronym(props.people);

    return (
        <div className="AvatarStyle">
            {result.map((el) =>
                <div className="circle">
                    <p className="text">{el}</p>
                </div>
            )}
        </div>
    );
}






const acronym = (people: string | any[]) => {
    let acronymNames = [];
    for (let i = 0; i < people.length; i++) {
        let str = people[i];
        var matches = str.match(/\b(\w)/g);
        var acronym1 = matches.join('');
        acronymNames.push(acronym1);
    }


    return acronymNames;

};
export default Avatar;