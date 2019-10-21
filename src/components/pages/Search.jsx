/*
=====================================================
OMEGA19 Page
Search
=====================================================
*/

import React from 'react';
import Template from '../Template';
import SearchConstructor from '../SearchConstructor';
import Metadata from '../Metadata';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        var stringSanitizer = require("string-sanitizer");

        this.state = {
            query: this.props.match.params.searchURI ? this.props.match.params.searchURI : ""
        }
    }
    render() {
        return (
            <Template>
                <Metadata title="Search"
                          description=""
                          url={this.props.location.pathname}/>
                <SearchConstructor query={this.state.query}/>
            </Template>
        );
    }
}