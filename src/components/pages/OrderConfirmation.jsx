/*
=====================================================
OMEGA19 Page
Order Confirmation / Thank You
=====================================================
*/

import React from 'react';
import Template from '../Template';
import Metadata from '../Metadata';

export default class OrderConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.match.params.orderContent ? atob(this.props.match.params.orderContent) : ""
        }
    }

    render() {
        return (
            <Template>
                <Metadata title="Thank You"
                          description=""
                          url={this.props.location.pathname}/>
                <div className="thank-you page">
                    <div className="thank-you-header">
                        <i className="fas fa-check-circle"></i>
                        <h1>Thank you for your order!</h1>
                        <p>A receipt has been sent to <span className="thank-you-email">{this.state.email}</span> with a confirmation of your order.</p>
                        <a href="/">
                            <div className="button button-login">
                                Go to Store
                            </div>
                        </a>
                    </div>
                </div>
            </Template>
        );
    }
}