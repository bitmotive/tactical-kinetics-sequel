/*
=====================================================
OMEGA19 Object
Instagram Feed
=====================================================
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import axios from 'axios';


export default class InstagramFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      'access_token': '378479996.1677ed0.e884d4b34f814ed4aa3f01110961a284'
    }



  }
  componentDidMount() {
    this.getFeed();
  }


  getFeed() {
    let token = this.state.access_token;
    let num_photos = 11;


    axios.get('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token + '&count=' + num_photos)
        .then(res => {
            this.setState({
              photos: res.data.data
            })
        })
        .catch(err => {
            console.log(err)
        })
  }


  render() {
      return (
       <div  style={{'text-align': "center", "padding-top":"50px"}}>
          <h2 class='product-section-title text-center'>Follow Us on Instagram</h2>
          <div className="insta-feed">
           {this.state.photos.map((photo, key) => {
             return (
               <div className="insta-image-container" key={photo.id}>
                <a href='https://www.instagram.com/headdownarms/'>
                 <img src={photo.images.standard_resolution.url} alt={photo.caption} />
                 <div className="insta-overlay">
                    <div className="insta-text">{photo.caption !== null ? photo.caption.text : ""}</div>
                 </div>
                </a>
               </div>

             )
           })}
          </div>
        </div>
      );
  }
}
