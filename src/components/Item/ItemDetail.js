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
            comments: {},
            commentTreeIds: [],
            isLoading: false, 
            isCommentsLoading: true, 
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
        console.log("item",result);
        
        let itemClean = result;
        itemClean.time = result && result.time && (new Date(result.time * 1000)).toString();  

        this.setState({ itemData: itemClean, isLoading: false })

        this.fetchComments(result.kids); 
    }

    fetchComments = (commentList) => {
        this.setState({ isCommentsLoading: true }); 

        commentList.forEach(element => {
            axios(`${Constants.PATH_BASE_ORIGINAL}${Constants.PATH_ITEM}/${element}.json`)
            .then(result => this._isMounted && this.handleCommentResult(result.data))
            .catch(error => this._isMounted && this.setState({ error: error }));                                    
        });
    }

    handleCommentResult = (result) => {
        // console.log("handleCommentResult result", result);
        
        if(!result.deleted){

            let commentResult = result; 

            if(commentResult.kids){
                this.fetchComments(commentResult.kids); 
            }else{
                // When a comment doesn't have any replies, the parameter just dissappears
                commentResult.kids = []; 
            }

            this.setState((prevState) => ({
                comments: { ...prevState.comments, [commentResult.id]: commentResult },
                commentTreeIds: [ ...prevState.commentTreeIds, commentResult.id ]
            }));
            
        }

        const { itemData, comments } = this.state; 

        // console.log("--- descendants", itemData.descendants);
        // console.log("--- comments.length", comments.length);
        
        if(!itemData.descendants || (itemData.descendants === Object.keys(comments).length)){
            this.setState({ isCommentsLoading: false }); 
        }
    }

    render(){

        const { itemData, error, isLoading, isCommentsLoading, comments, commentTreeIds } = this.state; 

        let kids = [];
        if(itemData){
            kids = itemData.kids; 
        } 

        console.log("comments from state", comments);
        console.log("kids", kids);
        console.log("isCommentsLoading", isCommentsLoading);
        
        return(
            <div className="user-detail-container">
                { error ? 
                    <h1>There was something wrong</h1> : 
                    <UserInfoWithLoading isLoading={ isLoading } itemData={ itemData } /> 
                }       
                { error ? 
                    <h1>There was something wrong</h1> : 
                    <div className="latest-submissions-container">
                        <h3>Comments</h3>
                        <ul>
                            <LatestCommentsWithLoading isLoading={ isCommentsLoading } 
                                comments={ comments } commentTreeIds={ kids }/>
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
const LatestCommentsWithLoading = withLoading(LatestComments); 

export default ItemDetail; 