/*
=====================================================
OMEGA19 Object
Navigation Bar
=====================================================
*/

import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

/* STATIC RESOURCES */
import logo from '../static/img//updated/TK-Veneer.png';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: this.props.disableSearchBar ? false : true,
      stylingHeader: (this.props.solid ? "header header-solid" : "header") + (this.props.sticky ? " sticky" : ""),
      showMenu: false,
      isLoggedIn: false,
      searchQuery: ""
    }
    if(this.props.searchBar == false) {
      this.setState({
        searchBar: false
      });
    }

    global.API.dashboard().then(
      (success) => {
        const code = parseInt(success.Result.code);
        if(code == 200) {
          this.setState({
            isLoggedIn: true
          });
        }
      },
      (error) => {}
    );

    global.API.getCart().then(
      (success) => {
        try {
          let amountOfItems = success.Result.Response.data.line_items.physical_items.length;
          this.setState({
            cartQuantity: amountOfItems
          });
        } catch(e) {
          console.log(e);
        }
      },
      (error) => {}
    );
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleSearchBarSubmit = this.handleSearchBarSubmit.bind(this);
    this.handleSearchBarKeyDown = this.handleSearchBarKeyDown.bind(this);
  }
  componentDidMount() {

  }

  handleMenuClick() {
    const currentStatus = this.state.showMenu;
    this.setState({
      showMenu: !currentStatus
    });
  }

  handleSearchBarChange(e) {
    this.setState({
      searchQuery: e.target.value
    });
  }

  handleSearchBarSubmit() {
    if(this.state.searchQuery.length > 0) {
      window.location = "/search/" + encodeURIComponent(this.state.searchQuery);
    }
  }

  handleSearchBarKeyDown(e) {
    if(e.keyCode === 13) {
      this.handleSearchBarSubmit();
    }
  }

  renderSearchBar() {
    if(this.state.searchBar) {
      return (
        <div className="search-bar">
          <input onChange={this.handleSearchBarChange} onKeyDown={this.handleSearchBarKeyDown} placeholder="Search..." type="text"></input>
          <i onClick={() => this.handleSearchBarSubmit()} className="fas fa-search"></i>
        </div>
      );
    }
  }

  renderMobileMenu() {
    if(this.state.showMenu) {
      return (
        <div className="nav-mobile-menu">
          <ul>
            {this.renderSearchBar()}
            {this.props.children}
            {this.renderUserFunctions()}
          </ul>
        </div>
      );
    }
  }

  renderUserFunctions() {
    if(this.state.isLoggedIn) {
      return (
        <div>
          <Link to="/logout"><li><i className="fas fa-sign-out-alt"></i> Sign Out</li></Link>
          <Link to="/cart"><li className="no-margin"><i className="fas fa-shopping-cart"></i>{this.state.cartQuantity ? this.state.cartQuantity : ""} <p className="inline desktop-hidden">Cart</p></li></Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/register"><li>Sign Up</li></Link>
          <Link to="/login"><li>Login</li></Link>
          <Link to="/cart"><li className="no-margin"><i className="fas fa-shopping-cart"></i>{this.state.cartQuantity ? this.state.cartQuantity : ""} <p className="inline desktop-hidden">Cart</p></li></Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="Navigation">
        <div className="nav-desktop">
          <div className={this.props.sticky ? "color-bar sticky" : "color-bar"}></div>
          <div className={this.state.stylingHeader}>
              <Link to="/">
                  <img id="Logo" src={this.props.image}/>
              </Link>
              <div className="nav-bar left">
                  <ul>
                      {this.props.children}
                  </ul>
              </div>
              <div className="nav-bar right">
                  {this.renderSearchBar()}
                  <ul>
                      {this.renderUserFunctions()}
                  </ul>
              </div>
          </div>
        </div>

        <div className={"nav-mobile" + (this.props.solid ? " nav-mobile-solid" : "")}>
          <div className={this.props.sticky ? "color-bar sticky" : "color-bar"}></div>
          <div className="nav-mobile-content">
            <Link to="/">
              <img id="Logo" src={logo}/>
            </Link>
            <i onClick={() => this.handleMenuClick()} className={"fas fa-bars nav-hamburger" + (this.state.showMenu ? " nav-hamburger-active" : "")}></i>
          </div>
          {this.renderMobileMenu()}
        </div>
      </div>
    );
  }
}
