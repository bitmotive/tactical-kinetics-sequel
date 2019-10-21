/*
=====================================================
OMEGA19 Object
Spotlight
=====================================================
*/

import React from 'react';

export default class SpotlightItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    handleButtonClick() {
        window.location = this.props.buttonLink;
    }

    render() {
        return (
            <div className="spotlight-item-container desktop-third mobile-whole left">
                <div className="spotlight-item" style={{ backgroundImage: "url('" + this.props.image + "')" }}>
                    <div className="spotlight-item-content">
                        <h6>{this.props.subtitle}</h6>
                        <h2>{this.props.title}</h2>
                        <div className="spotlight-button" onClick={() => this.handleButtonClick()}>
                            {this.props.buttonText}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
