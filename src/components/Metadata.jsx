/*
=====================================================
OMEGA19 Object
Metadata
=====================================================
*/

import React from 'react';
import {Helmet} from 'react-helmet';

import Logo from '../static/img/rogueshops.png';

export default class Metadata extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            siteName: global.SITE_NAME,
            siteDomain: global.SITE_DOMAIN,
            title: this.props.title,
            description: this.props.description,
            url: this.props.url,
            image: this.props.image ? this.props.image : Logo,
        }
    }

    render() {
        return (
            <Helmet>
                <meta charset="utf-8"/>

                <title>{this.state.siteName} - {this.state.title}</title>
                <meta name="description" content={this.state.description}/>
                
                <meta property="og:title" content={this.state.title} />
                <meta property="og:type" content="website" />
                <meta property="og:description" content={this.state.description} />
                <meta property="og:url" content={this.state.siteDomain + this.state.url}/>
                <meta property="og:image" content={this.state.image}/>
                <meta property="og:image:secure_url" content={this.state.image} />

                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content={this.state.siteName} />
            </Helmet>
        );
    }
}