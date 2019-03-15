import React, { Component } from 'react';
import axios from 'axios'; 

import Constants from '../../constants';
import { StoryTable } from '../Table/';

import loadingImg from '../../assets/loading.svg';

class RegularStoryList extends Component {

    _isMounted = false; 

    constructor(props){
        super(props);

        this.state = {
            type: props.type,
            storyIDs: [], 
            stories: [], 
            storyIDBeginning: 0,
            storyIDEnding: Constants.STORY_COUNT,
            isLoading: false,
            error: null,
        }
    }

    componentDidMount(){
        this._isMounted = true; 
        this.fetchNewStories();
    }

    componentWillUnmount(){
        this._isMounted = false; 
    }

    handleRegularStories = (result) => {
        const { storyIDBeginning, storyIDEnding } = this.state; 
        this.setState({ storyIDs: result });

        const slicedIDs = result.slice(storyIDBeginning, storyIDEnding); 
        slicedIDs.forEach((id, index, arr) => this.fetchItemDetail(id, index === (arr.length - 1)));
    }

    handleItemDetail = (story) => {
        console.log("handleItemDetail", story);
        this.setState((prevState) => prevState.stories.push(story)); 
    }

    fetchNewStories = () => {
        this.setState({ isLoading: true }); 
        
        axios(`${Constants.PATH_BASE_ORIGINAL}${Constants.PATH_NEWS_STORIES}`)
        .then(result => this._isMounted && this.handleRegularStories(result.data))
        .catch(error => this._isMounted && this.setState({ error: error })); 
      }
    
    fetchItemDetail = (itemId, isLast) => {
        axios(`${Constants.PATH_BASE_ORIGINAL}${Constants.PATH_ITEM}/${itemId}.json`)
        .then(result => {
            if(this._isMounted){
                this.handleItemDetail(result.data)
                isLast && this.setState({ isLoading: false });
            } 
        })
        .catch(error => this._isMounted && this.setState({ error: error })); 
    }

    render() {
        const { error, stories, isLoading } = this.state; 
        
        return (
            <div className="page">
                { error 
                    ? <div className="interactions">
                        <p>Something went wrong.</p>
                    </div>
                    : <TableWithLoading
                        isLoading={isLoading}
                        result={stories} 
                    />
                }
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

const TableWithLoading = withLoading(StoryTable); 

export default RegularStoryList; 