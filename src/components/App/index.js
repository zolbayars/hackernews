import React, { Component } from 'react';
import { SearchedStoryList, RegularStoryList } from './../StoryList';

class App extends Component {
  constructor(props){
    super(props); 
  }

  render(){
    return (
      <SearchedStoryList/>
    );
  }
}

export default App; 