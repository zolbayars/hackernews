import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  export default Search; 