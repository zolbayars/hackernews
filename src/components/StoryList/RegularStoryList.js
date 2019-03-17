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
        
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount(){
        this._isMounted = false; 

        document.removeEventListener('scroll', this.trackScrolling);
    }
    
    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    trackScrolling = () => {
        const { type, isLoading } = this.state; 
        const wrappedElement = document.getElementById(type);
        if (this.isBottom(wrappedElement) && !isLoading) {
            
            this.fetchMoreItems();
            document.removeEventListener('scroll', this.trackScrolling);
        }
    };
      
    handleRegularStories = (result) => {
        const { storyIDBeginning, storyIDEnding } = this.state; 
        this.setState({ storyIDs: result });

        const slicedIDs = result.slice(storyIDBeginning, storyIDEnding); 
        slicedIDs.forEach((id, index, arr) => this.fetchItemDetail(id, index === (arr.length - 1)));
    }

    handleItemDetail = (story) => {
        console.log("handleItemDetail", story);
        this.setState((prevState) => ({ stories: [ ...prevState.stories, story] })); 
    }

    fetchNewStories = () => {
        this.setState({ isLoading: true }); 

        let storyURL = ''; 
        switch(this.state.type){
            case 'best':
                storyURL = Constants.PATH_BEST_STORIES; 
                break; 
            case 'top':
                storyURL = Constants.PATH_TOP_STORIES; 
                break; 
            case 'ask':
                storyURL = Constants.PATH_ASK_STORIES; 
                break; 
            case 'show':
                storyURL = Constants.PATH_SHOW_STORIES; 
                break; 
            case 'job':
                storyURL = Constants.PATH_JOB_STORIES; 
                break; 
            default:
                storyURL = Constants.PATH_NEWS_STORIES;
                break; 
        }
        
        axios(`${Constants.PATH_BASE_ORIGINAL}${storyURL}`)
        .then(result => this._isMounted && this.handleRegularStories(result.data))
        .catch(error => this._isMounted && this.setState({ error: error })); 
      }
    
    fetchItemDetail = (itemId, isLast) => {
        console.log("fetchItemDetail");
        axios(`${Constants.PATH_BASE_ORIGINAL}${Constants.PATH_ITEM}/${itemId}.json`)
        .then(result => {
            if(this._isMounted){
                
                this.handleItemDetail(result.data);
                this.setState((prevState) => ({
                    storyIDEnding: prevState.storyIDEnding + 1,
                    storyIDBeginning: prevState.storyIDBeginning + 1,
                }));
                if(isLast){
                    this.setState({ isLoading: false });
                    document.addEventListener('scroll', this.trackScrolling);
                }
            } 
        })
        .catch(error => this._isMounted && this.setState({ error: error })); 
    }

    fetchMoreItems = () => {
        const { storyIDBeginning, storyIDs } = this.state; 
        const slicedIDs = storyIDs.slice(storyIDBeginning, storyIDBeginning + Constants.SCROLL_LOAD_COUNT); 
        
        slicedIDs.forEach((id, index, arr) => this.fetchItemDetail(id, index === (arr.length - 1)));
    }

    render() {
        const { error, stories, isLoading, type } = this.state; 
        
        return (
            <div className="page" id={type}>
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