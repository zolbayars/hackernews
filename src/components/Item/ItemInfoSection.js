import React from 'react';

const ItemInfoSection = ({ itemData }) => 
    itemData ? 
        <div>
            <h1>Title: {itemData.title}</h1>
            <h2>Text: {itemData.text}</h2>
            <h2>Score: {itemData.score}</h2>
            <h2>Created: {itemData.time}</h2>
        </div> : 
        <div></div>

export default ItemInfoSection; 