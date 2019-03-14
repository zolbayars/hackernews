import React, { Component } from 'react';
import axios from 'axios'; 
import Button from './../Button';
import Search from './../Search';
import Table from './../Table';
import loadingImg from '../../assets/loading.svg';
import './index.css';
import './index.css';

import Constants from '../../constants';

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
      searchTerm: Constants.DEFAULT_QUERY,
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
      this.fetchSearchedStories(searchTerm);
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

  fetchSearchedStories = (searchTerm, page = 0) => {
    this.setState({ isLoading: true }); 

    axios(`${Constants.PATH_BASE}${Constants.PATH_SEARCH}?${Constants.PARAM_SEARCH}${searchTerm}&${Constants.PARAM_PAGE}${page}`)
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

    if(searchTerm !== ''){
      this.fetchSearchedStories(searchTerm); 
    }
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
          
          <ButtonWithLoading isLoading={isLoading} onClick={() => this.fetchSearchedStories(searchKey, page + 1)}>
            More
          </ButtonWithLoading>
          
        </div>
      </div>
    );
  }
}

const Loading = () =>
  <img src={loadingImg} width="50" alt="Loading"/>
    
const withLoading = (Component) => ({ isLoading, ...rest }) => 
  isLoading ? 
    <Loading/> : 
    <Component { ...rest} />

const ButtonWithLoading = withLoading(Button); 

export default App;
