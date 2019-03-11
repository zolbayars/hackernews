import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ]

const isSearched = (searchTerm) => {
  return (item) => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase()); 
  }
}

class App extends Component {

  constructor(props){
    super(props); 

    this.state = {
      list,
      searchTerm: '',
    }
    // this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss = (id) => {
    const updatedList = this.state.list.filter((value) => {
      return id != value.objectID; 
    });

    this.setState({ list: updatedList });
  }

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value }); 
  }

  render() {
    const { searchTerm, list } = this.state; 

    return (
      <div className="page">
        <div className="interactions">
          <Search 
            searchTerm={searchTerm} 
            onChange={this.onSearchChange} 
          >Search:</Search>
        </div>
        <Table 
          list={list} 
          pattern={searchTerm} 
          onDismiss={this.onDismiss} 
        />
      </div>
    );
  }
}

const Search = ({ searchTerm, onChange, children }) => 
  <form>
    {children} <input 
      type="text"
      value={searchTerm}
      onChange={onChange}
    />
  </form>
    

const Table = ({ list, pattern, onDismiss }) => 
  <div className="table">
    {list.filter(isSearched(pattern)).map((item) => 
      <div key={item.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>
          {item.author}
        </span>
        <span style={{ width: '10%' }}>
          {item.num_comments}
        </span>
        <span style={{ width: '10%' }}>
          {item.points}
        </span>
        <span style={{ width: '10%' }}>
          <Button 
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>


const Button = ({ onClick, className = '', children }) => 
  <button 
    onClick={onClick}
    type="button"
    className={className} 
  >
    {children}
  </button>
    

export default App;
