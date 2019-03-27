import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React from 'react';
import { SearchedStoryList, RegularStoryList } from './../StoryList';
import UserDetail from "../User/UserDetail";
import ItemDetail from "../Item/ItemDetail";

function getRegularStoryList() {
    return <RegularStoryList type="news"/>;
}

function getTopStoryList() {
    return <RegularStoryList type="top"/>;
}

function getBestStoryList() {
    return <RegularStoryList type="best"/>;
}

function getAskStoryList() {
    return <RegularStoryList type="ask"/>;
}

function getShowStoryList() {
    return <RegularStoryList type="show"/>;
}

function getJobStoryList() {
    return <RegularStoryList type="job"/>;
}

function getUserDetail({ match }) {
  return (
    <UserDetail id={match.params.id}/>
  );
}

function getItemDetail({ match }) {
  return (
    <ItemDetail id={match.params.id}/>
  );
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
                <Link to="/ask">Ask</Link>
              </li>
              <li>
                <Link to="/job">Job</Link>
              </li>
              <li>
                <Link to="/show">Show</Link>
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
          <Route path="/job/" component={getJobStoryList} />
          <Route path="/ask/" component={getAskStoryList} />
          <Route path="/show/" component={getShowStoryList} />
          <Route path="/user/:id" component={getUserDetail} />
          <Route path="/item/:id" component={getItemDetail} />
        </div>
      </Router>
    );
  }
  
  export default Menu;