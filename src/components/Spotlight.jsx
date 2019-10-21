/*
=====================================================
OMEGA19 Object
Spotlight
=====================================================
*/

import React from 'react';

export default class Spotlight extends React.Component {
    render() {
        return (
            <div className="Spotlight">
                <div className="spotlight-container">
                    {this.props.children}
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}