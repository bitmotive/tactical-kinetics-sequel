/*
=====================================================
OMEGA19 Component
Tabs Page
=====================================================
*/

import React from 'react';

export default class TabsPage extends React.Component {
    render() {
        return (
            <div className="tabs-page">
                {this.props.children}
            </div>
        );
    }
}