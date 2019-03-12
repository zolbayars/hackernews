import React, { Component } from 'react';
import axios from 'axios'; 
import PropTypes from 'prop-types';
import loadingImg from './loading.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query='; 
const PARAM_PAGE = 'page='; 

const updateTopStories = (hits, page) => (prevState) => {
  const { searchKey, results } = prevState;
  const oldHits = results && results[searchKey] 
    ? results[searchKey].hits 
    : []; 

  const updatedHits = [ 
    ...oldHits, 
    ...hits 
  ];

  return { 
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    },
    isLoading: false,
  }
}

class App extends Component {

  _isMounted = false; 

  constructor(props){
    super(props); 

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
    }
  }

  onDismiss = (id) => {
    const { results, searchKey } = this.state; 
    const { hits, page } = results[searchKey]; 

    const updatedHits = hits.filter((value) => {
      return id !== value.objectID; 
    });

    this.setState({ 
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }  
    });
  }

  onSearchSubmit = (event) => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if(this.needToSearchTopStories(searchTerm)){
      this.fetchTopStories(searchTerm);
    }

    event.preventDefault();
  }

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value }); 
  }

  setSearchTopStories = (result) => {
    const { hits, page } = result;
    this.setState(updateTopStories(hits, page));
  }

  fetchTopStories = (searchTerm, page = 0) => {
    this.setState({ isLoading: true }); 

    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
    .then(result => this._isMounted && this.setSearchTopStories(result.data))
    .catch(error => this._isMounted && this.setState({ error: error })); 
  }

  needToSearchTopStories = (searchTerm) => {
    return !this.state.results[searchTerm]; 
  }

  componentDidMount() {
    this._isMounted = true; 

    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchTopStories(searchTerm); 
  }

  componentWillUnmount(){
    this._isMounted = false; 
  }

  render() {
    const { searchTerm, results, searchKey, error, isLoading } = this.state; 

    const page = (
      results && 
      results[searchKey] && 
      results[searchKey].page 
    ) || 0; 
    
    const list = (
      results && 
      results[searchKey] && 
      results[searchKey].hits 
    ) || []; 

    console.log("list", list);

    return (
      <div className="page">
        <div className="interactions">
          <Search 
            searchTerm={searchTerm} 
            onSubmit={this.onSearchSubmit} 
            onSearchChange={this.onSearchChange} 
          >Search:</Search>
        </div>
        { error 
          ? <div className="interactions">
            <p>Something went wrong.</p>
          </div> 
          : <Table 
            result={list} 
            onDismiss={this.onDismiss} 
          />
        }
        <div className="interactions">
          
          <ButtonWithLoading isLoading={isLoading} onClick={() => this.fetchTopStories(searchKey, page + 1)}>
            More
          </ButtonWithLoading>
          
        </div>
      </div>
    );
  }
}

class Search extends Component {

  componentDidMount(){
    if(this.input){
      this.input.focus();
    }
  }

  render(){
    const { searchTerm, onSubmit, onSearchChange, children } = this.props; 

    return (
      <form onSubmit={onSubmit}>
        <input 
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          ref={el => this.input = el}
        />
        <button type="submit">
          {children}
        </button>
      </form>               
    );
  }
} 

Search.propTypes  = {
  searchTerm: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
    

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

Table.propTypes  = {
  result: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired,
}


const Button = ({ onClick, className, children }) => 
  <button 
    onClick={onClick}
    type="button"
    className={className} 
  >
    {children}
  </button>

  Button.defaultProps = {
    className: '',
  }

Button.propTypes  = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const Loading = () =>
  <img src={loadingImg} width="50" alt="Loading"/>
    
const withLoading = (Component) => ({ isLoading, ...rest }) => 
  isLoading ? 
    <Loading/> : 
    <Component { ...rest} />


const ButtonWithLoading = withLoading(Button); 

export default App;

export {
  Button,
  Search,
  Table,
};
