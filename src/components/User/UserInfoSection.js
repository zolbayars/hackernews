import React from 'react';

const UserInfoSection = ({ userData }) => 
    userData ? 
        <div>
            <h1>Name: {userData.id}</h1>
            <h2>About: {userData.about}</h2>
            <h2>Karma: {userData.karma}</h2>
            <h2>Created: {userData.created}</h2>
        </div> : 
        <div></div>

export default UserInfoSection; 