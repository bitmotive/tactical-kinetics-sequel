/*
=====================================================
OMEGA19 Object
Testimonials
=====================================================
*/

import React from 'react';

export default class Testimonials extends React.Component {
    render() {
        return (
            <div className="Testimonials">
                <div className="section testimonials-container">
                    {this.props.children}
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}