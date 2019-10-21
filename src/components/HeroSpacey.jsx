/*
=====================================================
OMEGA19 Object
Product Spotlight
=====================================================
*/

import React from 'react';
import Logo from '../static/img/icon.png';

import NoImage from '../static/img/no-image.png';

export default class HeroSpacey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonLink: this.props.buttonLink ? this.props.buttonLink : "",
            buttonText: this.props.buttonText ? this.props.buttonText : "",
            image: this.props.image
        }
    }

    returnDescriptionHTML() {
        return {
            __html: this.state.description
        }
    }
    
    handleClick() {
        window.location = String(this.state.buttonLink);
    }

    renderButton() {
        if (this.state.buttonText) {
            return (
                <div className="button button-outline-white" onClick={() => this.handleClick()}>
                    {this.state.buttonText}
                </div>
            );
        }
    }

    render() {
        return (
            <div className="section product-spotlight" style={{ backgroundImage: "url('" + this.state.image + "')" }}>
                <div className="desktop-quarter mobile-whole left product-spotlight-content">
                    {this.props.children}
                    {this.renderButton()}
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}