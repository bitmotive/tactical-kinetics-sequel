/*
=====================================================
OMEGA19 Component
Picture With Content
=====================================================
*/

import React from 'react';

export default class PictureWithContent extends React.Component {
    render() {
        return (
            <div className="section picture-w-content">
                <div className="desktop-half mobile-whole picture-w-content-half left">
                    <img style={{ maxHeight: (this.props.limitPictureHeight ? this.props.limitPictureHeight + "px" : "none") }} src={this.props.image}></img>
                </div>
                <div className="desktop-half mobile-whole picture-w-content-half right">
                    {this.props.children}
                </div>
            </div>
        );
    }
}