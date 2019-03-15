import React, { Component } from 'react';
import axios from 'axios'; 
import Button from './../Button';
import Search from './../Search';
import Table from './../Table';
import loadingImg from '../../assets/loading.svg';

import Constants from '../../constants';

class RegularStoryList extends Component {
    constructor(props){
        super(props);

        this.state = {
            type: props.type,
            storyIDs: [], 
        }
    }

    handleRegularStories = (result) => {
        // const { hits, page } = result;
        console.log(result);
        
        this.setState({ regularStoryIds: result });
        result.forEach((id) => this.fetchItemDetail(id));
    }

    handleItemDetail = (result) => {
        console.log("handleItemDetail", result);
    }

    fetchNewsStories = () => {
        this.setState({ isLoading: true }); 
    
        axios(`${Constants.PATH_BASE_ORIGINAL}${Constants.PATH_NEWS_STORIES}`)
        .then(result => this._isMounted && this.handleRegularStories(result.data))
        .catch(error => this._isMounted && this.setState({ error: error })); 
      }
    
    fetchItemDetail = (itemId) => {
        axios(`${Constants.PATH_BASE_ORIGINAL}${Constants.PATH_ITEM}/${itemId}.json`)
        .then(result => this._isMounted && this.handleItemDetail(result.data))
        .catch(error => this._isMounted && this.setState({ error: error })); 
    }

    render() {
        return(
            <h1>Regular Story List</h1>
        );
    }
}

export default RegularStoryList; 