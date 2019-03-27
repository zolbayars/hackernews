import React, { Component } from 'react';
import axios from 'axios'; 
import Constants from '../../constants'; 
import ItemInfoSection from './ItemInfoSection'; 
import LatestComments from './LatestComments'; 
import loadingImg from '../../assets/loading.svg';

class ItemDetail extends Component {

    _isMounted = false; 

    constructor(props){
        super(props);

        this.state = {
            itemID: props.id,
            itemData: null,
            comments: [],
            commentOffset: 0,
            isLoading: false, 
            error: null,
        }
    }

    componentDidMount(){
        this._isMounted = true; 
        this.fetchItemDetail(this.state.itemID); 
    }

    componentWillUnmount(){
        this._isMounted = false; 
    }

    fetchItemDetail = (id) => {
        this.setState({ isLoading: true }); 
        
        axios(`${Constants.PATH_BASE_ORIGINAL}${Constants.PATH_ITEM}/${id}.json`)
        .then(result => this._isMounted && this.handleItemDetail(result.data))
        .catch(error => this._isMounted && this.setState({ error: error })); 
    }

    handleItemDetail = (result) => {
        console.log(result);
        
        let itemClean = result;
        itemClean.time = result && result.time && (new Date(result.time * 1000)).toString();  

        this.setState({ itemData: itemClean, isLoading: false })

        // this.fetchUserSubmits(result.submitted); 
    }

    fetchUserSubmits = (submittedList) => {
        const { commentOffset } = this.state; 
        let limit = commentOffset + Constants.USER_SUBMISSION_COUNT; 

        if(limit > submittedList.length){
            limit = submittedList.length;
        }

        for(let i = commentOffset; i < limit; i++){
            axios(`${Constants.PATH_BASE_ORIGINAL}${Constants.PATH_ITEM}/${submittedList[i]}.json`)
            .then(result => this._isMounted && this.handleSubmissionResult(result.data))
            .catch(error => this._isMounted && this.setState({ error: error }));                                    
        }

        this.setState((prevState) => {
            let limit = prevState.commentOffset + Constants.USER_SUBMISSION_COUNT; 

            if(limit > submittedList.length){
                limit = submittedList.length;
            }

            return { commentOffset: limit }
        });
    }

    handleSubmissionResult = (result) => {
        console.log(result);
        
        if(!result.deleted){
            this.setState((prevState) => ({
                comments: [ ...prevState.comments, result],
            }));
        }

    }

    render(){

        const { itemData, error, isLoading, comments } = this.state; 

        console.log("comments", comments);
        
        
        return(
            <div className="user-detail-container">
                { error ? 
                    <h1>There was something wrong</h1> : 
                    <UserInfoWithLoading isLoading={ isLoading } itemData={ itemData } /> 
                }       
                { error ? 
                    <h1>There was something wrong</h1> : 
                    <div className="latest-submissions-container">
                        <h3>Latest Activity</h3>
                        <ul>
                            <LatestComments submissions={ comments }/>
                        </ul>
                    </div>
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

const UserInfoWithLoading = withLoading(ItemInfoSection); 

export default ItemDetail; 