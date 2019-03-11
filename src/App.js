import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query='; 
const PARAM_PAGE = 'page='; 

const isSearched = (searchTerm) => {
  return (item) => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase()); 
  }
}

class App extends Component {

  constructor(props){
    super(props); 

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    }
    // this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss = (id) => {
    const updatedHits = this.state.result.hits.filter((value) => {
      return id != value.objectID; 
    });

    this.setState({ 
      result: { ...this.state.result, hits: updatedHits } 
    });
  }

  onSearchSubmit = (event) => {
    const { searchTerm } = this.state;
    this.fetchTopStories(searchTerm);
    event.preventDefault();
  }

  onChange = (event) => {
    this.setState({ searchTerm: event.target.value }); 
  }

  setSearchTopStories = (result) => {
    const { hits, page } = result;

    const oldHits = page === 0 ? [] : this.state.result.hits; 
    const updatedHits = [ ...oldHits, ...hits ];
    
    this.setState({ 
      result: { hits: updatedHits, page } 
    });
  }

  fetchTopStories = (searchTerm, page = 0) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
    .then(response => response.json())
    .then(result => { console.log("result", result); this.setSearchTopStories(result)})
    .catch(error => error); 
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchTopStories(searchTerm); 
  }

  render() {
    const { searchTerm, result: result } = this.state; 
    const page = (result && result.page) || 0; 

    console.log("result", result);
    

    return (
      <div className="page">
        <div className="interactions">
          <Search 
            searchTerm={searchTerm} 
            onSubmit={this.onSearchSubmit} 
            onChange={this.onChange} 
          >Search:</Search>
        </div>
        { result && 
          <Table 
            result={result.hits} 
            onDismiss={this.onDismiss} 
          />
        }
        <div className="interactions">
          <Button onClick={() => this.fetchTopStories(searchTerm, page + 1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}

const Search = ({ searchTerm, onSubmit, onChange, children }) => 
  <form onSubmit={onSubmit}>
    <input 
      type="text"
      value={searchTerm}
      onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
  </form>
    

const Table = ({ result, onDismiss }) => 
  <div className="table">
    {result.map((item) => 
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
