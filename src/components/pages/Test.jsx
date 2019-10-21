/*
=====================================================
OMEGA19 Page
Order Confirmation / Thank You
=====================================================
*/

import React from 'react';
import Template from '../Template';
import Metadata from '../Metadata';
import LoadingFiller from '../LoadingFiller';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.match.params.orderContent ? atob(this.props.match.params.orderContent) : ""
        }
    }

    render() {
        return (
            <Template>
                <LoadingFiller/>
            </Template>
        );
    }
}