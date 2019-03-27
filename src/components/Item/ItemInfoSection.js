import React from 'react';

const ItemInfoSection = ({ userData }) => 
    userData ? 
        <div>
            <h1>Title: {userData.title}</h1>
            <h2>Text: {userData.text}</h2>
            <h2>Score: {userData.score}</h2>
            <h2>Created: {userData.created}</h2>
        </div> : 
        <div></div>

export default ItemInfoSection; 