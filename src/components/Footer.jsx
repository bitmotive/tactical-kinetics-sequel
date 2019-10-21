/*
=====================================================
OMEGA19 Object
Footer
=====================================================
*/

import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                {this.props.children}
                <div className="clearfix"></div>
            </div>
        );
    }
}