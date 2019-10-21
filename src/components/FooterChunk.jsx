/*
=====================================================
OMEGA19 Object
Footer Chunk
=====================================================
*/

import React from 'react';

export default class FooterChunk extends React.Component {
    render() {
        return (
            <div className={"footer-chunk " + this.props.className}>
                {this.props.children}
            </div>
        );
    }
}