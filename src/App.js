import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query='; 

const isSearched = (searchTerm) => {
  return (item) => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase()); 
  }
}

class App extends Component {

  constructor(props){
    super(props); 

    this.state = {
      list: null,
      searchTerm: DEFAULT_QUERY,
    }
    // this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss = (id) => {
    const updatedHits = this.state.list.hits.filter((value) => {
      return id != value.objectID; 
    });

    this.setState({ 
      list: { ...this.state.list, hits: updatedHits } 
    });
  }

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value }); 
  }

  setSearchTopStories = (result) => {
    this.setState({ list: result });
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`)
      .then(response => response.json())
      .then(result => { console.log("result", result); this.setSearchTopStories(result)})
      .catch(error => error); 
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
        { list && 
          <Table 
            list={list.hits} 
            pattern={searchTerm} 
            onDismiss={this.onDismiss} 
          />
        }
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
