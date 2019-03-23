import React, { Component } from 'react';
import axios from 'axios'; 
import Constants from '../../constants'; 
import UserInfoSection from './UserInfoSection'; 
import loadingImg from '../../assets/loading.svg';

class UserDetail extends Component {

    _isMounted = false; 

    constructor(props){
        super(props);

        this.state = {
            userID: props.id,
            userData: null, 
            isLoading: false, 
            isListLoading: false, 
            error: null,
        }
    }

    componentDidMount(){
        this._isMounted = true; 
        this.fetchUserDetail(this.state.userID); 
    }

    componentWillUnmount(){
        this._isMounted = false; 
    }

    fetchUserDetail = (id) => {
        this.setState({ isLoading: true }); 
        
        axios(`${Constants.PATH_BASE_ORIGINAL}${Constants.PATH_USER_DETAIL}${id}.json`)
        .then(result => this._isMounted && this.handleUserDetail(result.data))
        .catch(error => this._isMounted && this.setState({ error: error })); 
    }

    handleUserDetail = (result) => {
        let userDataClean = result;
        userDataClean.created = result && result.created && (new Date(result.created * 1000)).toString();  

        this.setState({ userData: userDataClean, isLoading: false })

        this.fetchUserSubmits(result.submitted); 
    }

    fetchUserSubmits = (submittedList) => {
        this.setState({ isListLoading: true }); 

        submittedList.forEach((id) => {
            axios(`${Constants.PATH_BASE_ORIGINAL}${Constants.PATH_ITEM}/${id}.json`)
            .then(result => this._isMounted && this.handleSubmissionResult(result.data))
            .catch(error => this._isMounted && this.setState({ error: error }));                                    
        });
        
    }

    handleSubmissionResult = (result) => {
        console.log(result);
    }

    render(){

        const { userData, error, isLoading, isListLoading } = this.state; 
        
        return(
            <div className="user-detail-container">
                { error ? 
                    <h1>There was something wrong</h1> : 
                    <UserInfoWithLoading isLoading={ isLoading } userData={ userData } /> 
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

const UserInfoWithLoading = withLoading(UserInfoSection); 

export default UserDetail; 