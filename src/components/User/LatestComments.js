import React from 'react';
import Constants from '../../constants';

const LatestComments = ({ submissions }) => 
    <div>
        { submissions.map((item) => 
            <li key={item.id}>
                Commented <a href={`${Constants.PATH_BASE_ORIGINAL}${Constants.PATH_ITEM}${item.parent}.json`}>{item.text.substring(0, 50)}</a>
            </li>
        )}
    </div>

export default LatestComments; 