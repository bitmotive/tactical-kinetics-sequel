/*
=====================================================
OMEGA19 Object
Footnote
=====================================================
*/

import React from 'react';

export default class Footnote extends React.Component {
    render() {
        return (
            <div className="footnote">
                <p>{this.props.content}</p>
            </div>
        );
    }
}