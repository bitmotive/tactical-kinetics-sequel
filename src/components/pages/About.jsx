/*
=====================================================
OMEGA19 Page
About
=====================================================
*/

import React, { Component } from "react";
import Template from "../Template";
import Metadata from '../Metadata';

class About extends Component {
  render() {
    return (
      <Template>
          <Metadata title="About Us"
                   description=""
                    url={this.props.location.pathname}/>
        <div className="grid-container about-page">
          <div className="grid-x grid-padding-x">
            <div className="small-12 large-12 cell text-center">
              <h1>About Us</h1>
            </div>
            <div className="small-12 large-8 large-offset-2 cell">
              <p>
                Everyone at Tactical Kinetics is passionate about two things:
                We pride ourselves in the quality of our work, and
                We love firearms of all shapes, sizes, make, and model.
              </p>
              <p>
                We have combined these passions with our technical skills in CNC manufacturing technology to bring products to our customers that we can be both proud of and be certain will meet and exceed the expectations of our most demanding customers.
              </p>
              <p>
                Reach out to us today, and you’ll feel the passion we have in our products.
              </p>
              <p>
                Tactical Kinetics was formed to combine precision CNC manufacturing and superior inspection techniques with complete supply chain and flexible component assembly management to roll out high quality weapon system components to the OEM, Defense, and Export sales markets at prices that are reflect the quality of our workmanship and customer service. A great product at a fair and reasonable price, with unmatched service and technical ability.
              </p>
              <p>
                100% of our manufacturing and assembly is completed in the Knoxville / Oak Ridge, Tennessee area and our distribution network is nationwide.
              </p>
            </div>
          </div>
        </div>
      </Template>
    );
  }
}

export default About;
