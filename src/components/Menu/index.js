import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React from 'react';
import { SearchedStoryList, RegularStoryList } from './../StoryList';

function getRegularStoryList() {
    return <RegularStoryList type="news"/>;
}

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
  
          <Route path="/" exact component={getRegularStoryList} />
          <Route path="/search/" component={SearchedStoryList} />
        </div>
      </Router>
    );
  }
  
  export default Menu;