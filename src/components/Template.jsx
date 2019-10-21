/*
=====================================================
OMEGA19 v0.1
Basic Theme Template for RogueShops
=====================================================
*/

/* COMPONENTS */
import React from 'react';
import Navigation from './Navigation';
import NavigationItem from './NavigationItem';
import Footer from './Footer';
import FooterChunk from './FooterChunk';
import Footnote from './Footnote';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


/* STATIC RESOURCES */
import '../static/css/fontawesome.css';
import '../static/css/foundation.css';
import '../static/css/main.scss';
import Logo from '../static/img/updated/Tactical-Kinetics.png';
import Logo2 from '../static/img/updated/TK-Veneer.png';
import privacypolicy from '../static/img/privacypolicy.pdf'
import tos from '../static/img/tos.pdf'

class Template extends React.Component {
    render() {
        return (
            <div className="Application">
                <Navigation image={Logo2} solid={!this.props.index}>
                    <NavigationItem title="Rifle Barrels" link="/collection/all" />
                    <NavigationItem title="Pistol Barrels" link="/collection/all" />
                    <NavigationItem title="Slides" link="/collection/all" />
                    <NavigationItem title="FAQ" link="/frequently-asked-questions" />
                    <NavigationItem title="Support" link="/contact" />
                    <NavigationItem title="About" link="/about" />
                </Navigation>

                {this.props.children}

                <Footer>
                    <FooterChunk className="desktop-third mobile-whole">
                        <img src={Logo} className="full-width footer-logo" />
                        <b><h4>Contact Us</h4></b>
                        <h5>Jeff Kaplan</h5>
                        <p>Phone: <span className="italic"> (864) 382 - 0695</span></p>
                        <p>Email: <span className="italic"> Jeff@TacticalKinetics.com</span></p>
                        <br></br>
                        <h5>Darryl Witte</h5>
                        <p>Phone: <span className="italic"> (815) 786 - 5986</span></p>
                        <p>Email: <span className="italic"> Darryl@TacticalKinetics.com</span></p>
                        <br></br>
                        <p>For Inquiries: <span className="italic">Sales@TacticalKinetics.com</span></p>
                    </FooterChunk>
                    <FooterChunk className="desktop-third mobile-whole footer-links">
                        <Link to="/collection/all">Shop</Link>
                        <Link to="/frequently-asked-questions">FAQ</Link>
                        <Link to="/contact">Support</Link>
                        <Link to="/about">About</Link>
                        <a href={privacypolicy} download="privacypolicy">Privacy Policy</a>
                        <a href={tos} download="termsofservice">Terms of Service</a>
                    </FooterChunk>
                    <FooterChunk className="desktop-third mobile-whole">
                        <h2>Follow Us</h2>
                        <a className="footer-social-facebook" href="https://www.facebook.com/TacticalKinetics/">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a className="footer-social-twitter" href="">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a className="footer-social-instagram" href="https://www.instagram.com/tacticalkinetics/">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </FooterChunk>
                    <FooterChunk className="desktop-whole mobile-whole">
                        <i class="fab fa-cc-visa"></i>
                        <i class="fab fa-cc-mastercard"></i>
                        <i class="fab fa-cc-discover"></i>
                        <i class="fab fa-cc-amex"></i>
                    </FooterChunk>
                </Footer>
                <Footnote content="©2019 Bitmotive, Inc. All rights reserved." />
            </div>
        );
    }
}

export default Template;
