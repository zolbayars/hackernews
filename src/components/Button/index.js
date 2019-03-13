import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

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

export default Button;