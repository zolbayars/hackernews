import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './index.css';

const StoryTable = ({ result }) => 
  <div className="table">
    
      {result.map((item) => 
        <div key={item.id} className="table-row">
          <span style={{ width: '50%' }}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={{ width: '30%' }}>
            <Link to={"/user/"+item.by}>{item.by}</Link>
          </span>
          <span style={{ width: '10%' }}>
          <Link to={"/item/"+item.id}>{item.descendants}</Link>
          </span>
          <span style={{ width: '10%' }}>
            {item.score}
          </span>
        </div>
      )}
  </div>

StoryTable.propTypes  = {
    result: PropTypes.array.isRequired,
}



export default StoryTable; 