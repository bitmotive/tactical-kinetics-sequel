/*
=====================================================
OMEGA19 Component
Video With Content
=====================================================
*/

import React from 'react';

export default class VideoWithContent extends React.Component {
    render() {
        return (
            <div className="section picture-w-content">
                <div className="desktop-half mobile-whole picture-w-content-half left">
                    <video autoPlay muted loop={this.props.loop ? true : false} controls={this.props.loop ? true : false}>
                        <source type="video/mp4" src={this.props.video} />
                    </video>
                </div>
                <div style={{ right: "0" }} className="desktop-half mobile-whole picture-w-content-half right picture-w-content-right vertical-center">
                    {this.props.children}
                </div>
            </div>
        );
    }
}