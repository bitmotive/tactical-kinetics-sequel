/*
=====================================================
OMEGA19 Object
Loading Filler
=====================================================
*/

import React from 'react';
import LoadingImage from '../static/img/loading.gif';

export default class LoadingFiller extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="LoadingFiller" style={{ width: "100%" }}>
                <div className="loading-filler-box">
                    <img src={LoadingImage} />
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}