import React from 'react';

const LatestComments = ({ comments, commentTreeIds }) => 
    <div>
        { commentTreeIds.map((id) => 
            comments[id] ? <Comment item={comments[id]} key={id} allComments={comments}/> : ""
        )}
    </div>

const Comment = ({ item, id, allComments }) => 
    <li key={id}>
        
        <div dangerouslySetInnerHTML={{ __html: item.text }} />
        {item.kids ?
            <ul> 
            { item.kids.map((kidId) => 
                allComments[kidId] ? <Comment item={allComments[kidId]} key={kidId} allComments={allComments}/> : ""
            )}
            </ul> :
            ""
        } 
       
        
    </li>

export default LatestComments; 