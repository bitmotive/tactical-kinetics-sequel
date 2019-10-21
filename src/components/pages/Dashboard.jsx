/*
=====================================================
OMEGA19 Page
Dashboard
=====================================================
*/

import React from 'react';
import Template from '../Template';
import Metadata from '../Metadata';
import SearchConstructor from '../SearchConstructor';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        var stringSanitizer = require("string-sanitizer");

        this.state = {
            query: this.props.match.params.searchURI ? this.props.match.params.searchURI : "",
            email: "",
            fname: "",
            lname: "",
            address1: "",
            address2: "",
            phone: "",
            city: "",
            state_or_province: "",
            state_or_province_code: "",
            postal_code: "",
            isLoggedIn: false,
            isLoaded: false
        }

        global.API.getUserInfo().then(
            (success) => {
                var data = success.Result.Response;

                if(success.Result.code != "401") {
                    this.setState({
                        email: data.email,
                        fname: data.first_name,
                        lname: data.last_name,
                        address1: data.address1,
                        address2: data.address2,
                        phone: data.phone,
                        city: data.city,
                        state_or_province: data.state_or_province,
                        state_or_province_code: data.state_or_province_code,
                        postal_code: data.postal_code,
                        isLoggedIn: true,
                        isLoaded: true
                    })
                } else {
                    this.setState({
                        isLoaded: true,
                        isLoggedIn: false
                    });
                }
            },
            (error) => {

            }
        );
    }

    renderDetails() {
        if(this.state.isLoaded) {
            if(this.state.isLoggedIn) {
                return (
                    <div>
                        <h1>Dashboard</h1>
                        <h4>{this.state.fname + " " + this.state.lname}</h4>
                        <p>{this.state.address1}</p>
                        <p>{this.state.address2}</p>
                        <p>{this.state.city + ", " + this.state.state_or_province + ", " + this.state.postal_code}</p>
                        <p>{this.state.phone}</p>
                    </div>
                );
            } else {
                return (
                    <div>
                        <h1>You are not logged in.</h1>
                        <p>Log in to view dashboard</p>
                        <a className="button button-contrast" href="/login">Log In</a>
                    </div>
                );
            }
        }
    }

    render() {
        return (
            <Template>
                <Metadata title="Dashboard"
                          description=""
                          url={this.props.location.pathname}/>
                <div className="page">
                    {this.renderDetails()}
                </div>
            </Template>
        );
    }
}