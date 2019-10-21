/*
=====================================================
OMEGA19 Page
FAQ
=====================================================
*/

import React, { Component } from "react";
import Template from "../Template";
import { Link } from "react-router-dom";
import Metadata from '../Metadata';

class FAQ extends Component {
  render() {
    return (
      <Template>
          <Metadata title="Frequently Asked Questions"
                   description=""
                    url={this.props.location.pathname}/>
        <div className="grid-container">
          <div className="grid-x">
            <div className="small-12 large-10 large-offset-1 cell">
              <div className="faq-container">
                <br></br>
                <h1 className="text-center">FAQ</h1>

                <div className="faq-wrapper">
                  <div className="faq-item-container">
                    <h2>Q: Do you machine your own barrels?</h2>
                    <p>
                      A: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices neque ornare aenean euismod elementum nisi quis eleifend. Quis lectus nulla at volutpat diam. Vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Turpis nunc eget lorem dolor sed viverra. Luctus accumsan tortor posuere ac. Rhoncus mattis rhoncus urna neque viverra justo.
                    </p>
                  </div>

                  <div className="faq-item-container">
                    <h2>Q: How do I make a return?</h2>
                    <p>
                      A: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices neque ornare aenean euismod elementum nisi quis eleifend. Quis lectus nulla at volutpat diam. Vulputate odio ut enim blandit volutpat maecenas volutpat blandit.
                    </p>
                    <p>
                      Ultrices neque ornare aenean euismod elementum nisi quis eleifend. Quis lectus nulla at volutpat diam. Vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Turpis nunc eget lorem dolor sed viverra. Luctus accumsan tortor posuere ac. Rhoncus mattis rhoncus urna neque viverra justo. Cursus eget nunc scelerisque viverra mauris. Facilisi cras fermentum odio eu feugiat pretium nibh. Pellentesque sit amet porttitor eget dolor. Arcu non sodales neque sodales ut. Morbi tempus iaculis urna id. Mauris rhoncus aenean vel elit scelerisque. Proin fermentum leo vel orci porta non pulvinar neque.
                    </p>
                    <p>
                      Pellentesque sit amet porttitor eget dolor. Arcu non sodales neque sodales ut. Morbi tempus iaculis urna id. Mauris rhoncus aenean vel elit scelerisque. Proin fermentum leo vel orci porta non pulvinar neque.
                    </p>
                  </div>

                  <div className="faq-item-container">
                    <h2>Q: Where do you ship to?</h2>
                    <p>
                     Quis lectus nulla at volutpat diam. Morbi tempus iaculis urna id. Mauris rhoncus aenean vel elit scelerisque. Proin fermentum leo vel orci porta non pulvinar neque.
                    </p>
                  </div>

                  <div className="faq-item-container">
                    <h2>Q: What's your privacy policy?</h2>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque sit amet porttitor eget dolor. Arcu non sodales neque sodales ut. Morbi tempus iaculis urna id. Mauris rhoncus aenean vel elit scelerisque. Proin fermentum leo vel orci porta non pulvinar neque.
                    </p>
                    <p>
                    Pellentesque sit amet porttitor eget dolor. Arcu non sodales neque sodales ut. Morbi tempus iaculis urna id. Mauris rhoncus aenean vel elit scelerisque. Proin fermentum leo vel orci porta non pulvinar neque.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Template>
    );
  }
}

export default FAQ;
