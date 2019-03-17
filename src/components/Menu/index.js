import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React from 'react';
import { SearchedStoryList, RegularStoryList } from './../StoryList';

function getRegularStoryList() {
    return <RegularStoryList type="news"/>;
}

function getTopStoryList() {
    return <RegularStoryList type="top"/>;
}

function getBestStoryList() {
    return <RegularStoryList type="best"/>;
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
                <Link to="/best">Best</Link>
              </li>
              <li>
                <Link to="/top">Top</Link>
              </li>
              <li>
                <Link to="/search/">Search</Link>
              </li>
            </ul>
          </nav>
  
          <Route path="/" exact component={getRegularStoryList} />
          <Route path="/search/" component={SearchedStoryList} />
          <Route path="/best/" component={getBestStoryList} />
          <Route path="/top/" component={getTopStoryList} />
        </div>
      </Router>
    );
  }
  
  export default Menu;