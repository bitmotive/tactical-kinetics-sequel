/*
=====================================================
OMEGA19 Object
Warning Banner
=====================================================
*/

import React from 'react';

export default class Warning extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: this.props.message
        }
    }
    render() {
        return (
            <p className="warning">
                <i class="fas fa-exclamation-triangle"></i> {this.state.message}
            </p>
        );
    }
}