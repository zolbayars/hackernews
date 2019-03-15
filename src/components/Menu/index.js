import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React, { Component } from 'react';
import { SearchedStoryList, RegularStoryList } from './../StoryList';

function Menu() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search/">Search</Link>
              </li>
            </ul>
          </nav>
  
          <Route path="/" exact component={RegularStoryList} />
          <Route path="/search/" component={SearchedStoryList} />
        </div>
      </Router>
    );
  }
  
  export default Menu;