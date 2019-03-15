import React, { Component } from 'react';
import { SearchedStoryList, RegularStoryList } from './../StoryList';
import Menu from '../Menu';

class App extends Component {
  constructor(props){
    super(props); 
  }

  render(){
    return (
      <div>
        <Menu/>
      </div>
    );
  }
}

export default App; 