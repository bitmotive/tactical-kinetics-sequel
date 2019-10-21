/*
=====================================================
OMEGA19 Component
Navigation Item
=====================================================
*/

import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class NavigationItem extends React.Component {
  constructor(props) {
    super(props);
  }
  didComponentMount() {
    
  }
  renderLink() {
      if(this.props.external) {
        return (
            <a href={this.props.link}>
              <li>{this.props.title}</li>
            </a>
        );
      } else {
        return (
            <Link to={this.props.link}>
              <li>{this.props.title}</li>
            </Link>
          );
      }
  }
  render() {
    return this.renderLink();
  }
}