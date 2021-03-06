/*
=====================================================
OMEGA19 Core
Table of Contents
=====================================================
*/

/* COMPONENTS */
import React from 'react';
import { Route } from "react-router-dom";
import {Helmet} from "react-helmet";
import ScrollToTop from "./components/ScrollToTop";

/* PAGES */
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import Collection from './components/pages/Collection';
import Product from './components/pages/Product';
import Cart from './components/pages/Cart';
import Checkout from './components/pages/Checkout';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import ForgotPassword from './components/pages/ForgotPassword';
import Logout from './components/pages/Logout';
import OrderConfirmation from './components/pages/OrderConfirmation';
import Collections from './components/pages/Collections';
import Dashboard from './components/pages/Dashboard';
import Test from './components/pages/Test';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import FAQ from './components/pages/Faq';


export default function TOC() {
    return (
        <div>
            <Helmet>
                <title>Loading...</title>
            </Helmet>
            <ScrollToTop>
                <Route path="/" exact component={Home}/>
                <Route path="/collection/:collectionURI" exact component={Collection}/>
                <Route path="/product/:productURI" exact component={Product}/>
                <Route path="/cart" exact component={Cart}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/checkout" exact component={Checkout}/>
                <Route path="/forgot" exact component={ForgotPassword}/>
                <Route path="/logout" exact component={Logout}/>
                <Route path="/thank-you" exact component={OrderConfirmation}/>
                <Route path="/search" exact component={Search}/>
                <Route path="/collections" exact component={Collections}/>
                <Route path="/rifle-barrels" exact component={Collections}/>
                <Route path="/pistol-barrels" exact component={Collections}/>
                <Route path="/slides" exact component={Collections}/>
                <Route path="/search/:searchURI" exact component={Search}/>
                <Route path="/dashboard" exact component={Dashboard}/>
                <Route path="/about" exact component={About}/>
                <Route path="/contact" exact component={Contact}/>
                <Route path="/frequently-asked-questions" exact component={FAQ}/>
                <Route path="/test" exact component={Test}/>
            </ScrollToTop>
        </div>
    );
}
