import React from 'react';

const LatestComments = ({ submissions }) => 
    <div>
        { submissions.map((item) => 
            item.type === 'comment' ? <Comment item={item}/> : <Post item={item}/>
        )}
    </div>

const Post = ({ item }) => 
    <li key={item.id}>
        Posted <a href={item.url}>{item.title}</a>
    </li>

const Comment = ({ item }) => 
    <li key={item.id}>
        Commented <a href={item.parent}>{item.text.substring(0, 50)}</a>
    </li>

export default LatestComments; 