/*
=====================================================
OMEGA19 Page
Checkout
=====================================================
*/

import React from 'react';
import Template from '../Template';
import Metadata from '../Metadata';

export default class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            address1: "",
            address2: "",
            city: "",
            state_or_province: "",
            state_or_province_code: "",
            country_code: "",
            postal_code: "",
            phone: "",
            card_number: "",
            card_holder_name: "",
            expiry_month: "",
            expiry_year: "",
            verification_value: "",

            billing_address1: "",
            billing_address2: "",
            billing_city: "",
            billing_postal_code: "",
            billing_state: "",
            billing_state_code: "",
            billing_country_code: "",

            items: [],
            currency: "",
            taxIncluded: false,
            subtotal: 0,
            tax: 0,
            total: 0,

            isProcessing: false,

            isError: false,
            error: ""
        };

        global.API.getCart().then(
            (success) => {
                try {
                    let data = success.Result.Response.data;
                    this.setState({
                        currency: data.currency.code,
                        taxIncluded: data.tax_included,
                        items: data.line_items.physical_items,
                        subtotal: parseFloat(data.base_amount).toFixed(2),
                        total: parseFloat(data.cart_amount).toFixed(2),
                        tax: parseFloat(data.cart_amount - data.base_amount).toFixed(2),
                        isLoaded: true
                    });
                } catch(e) {

                }
            },
            (error) => {}
        );

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCopyClick = this.handleCopyClick.bind(this);
    }
    handleChange(e) {
        const { name, type, value, id } = e.target;
        const val = type === "number" ? parseFloat(value) : value;
        this.setState({ [id]: val });
    }
    raiseProcessing() {
        this.setState({
            isProcessing: true
        });
    }
    stopProcessing() {
        this.setState({
            isProcessing: false
        });
    }
    handleSubmit() {
        if(!this.state.isProcessing) {
            this.clearError();
            this.raiseProcessing();
            let content = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                address1: this.state.address1,
                address2: this.state.address2,
                city: this.state.city,
                state_or_province: this.state.state_or_province_code,
                state_or_province_code: this.state.state_or_province_code,
                country_code: "US",
                postal_code: this.state.postal_code,
                phone: this.state.phone,
                billing_address1: this.state.billing_address1,
                billing_address2: this.state.billing_address2,
                billing_city: this.state.billing_city,
                billing_postal_code: this.state.billing_postal_code,
                billing_state: this.state.billing_state_code,
                billing_state_code: this.state.billing_state_code,
                billing_country_code: "US",
                card_number: this.state.card_number,
                card_holder_name: this.state.card_holder_name,
                expiry_month: parseInt(this.state.expiry_month),
                expiry_year: parseInt(this.state.expiry_year),
                verification_value: this.state.verification_value
            }
            global.API.checkout(content).then(
                (success) => {
                    try {
                        if(success.Result.Response.status == 422) {
                            this.raiseError("The payment was declined.");
                            return;
                        } else if(success.Result.Response.data.status == "success") {
                            window.location = "/thank-you/" + btoa(this.state.email);
                        }
                    } catch {
                        this.raiseError("An error has ocurred. Please try again later.");
                    }
                },
                (error) => {
                    console.log("error");
                    console.log(error);
                    this.raiseError("An error has ocurred. Please try again later. (500)");
                }
            ).finally(
                () => {
                    this.stopProcessing();
                }
            );
        }
    }
    raiseError(error) {
        this.setState({
            isError: true,
            error: error
        });
    }
    clearError() {
        this.setState({
            isError: false,
            error: ""
        });
    }
    handleCopyClick() {
        this.setState((state, props) => ({
            billing_address1: state.address1,
            billing_address2: state.address2,
            billing_city: state.city,
            billing_postal_code: state.state_or_province_code,
            billing_state: state.state_or_province,
            billing_state_code: state.state_or_province,
            billing_country_code: state.country_code,
        }));
    }

    renderError() {
        if(this.state.isError) {
            return (
                <div className="large-12 cell">
                    <div className="message error">
                        {this.state.error}
                    </div>
                </div>
            );
        }
    }

    renderCartItems() {
        var components = [];
        if(this.state.isLoaded) {
            for(var item of this.state.items) {
                let optionsComponent = [];
                if(item.options.length > 0) {
                    for(var option of item.options) {
                        optionsComponent.push(
                            <p style={{color: "grey"}} className="no-margin">{option.name}: <span>{option.value}</span></p>
                        );
                    }
                }
                components.push(
                    <div className="checkout-cart-item">
                        <div className="checkout-cart-item__image-container">
                            <div className="checkout-cart-item__image" style={{ backgroundImage: "url(" + item.image_url + ")"}}></div>
                        </div>
                        <div>
                            <p>{item.name}</p>
                            {optionsComponent}
                            <p className="price-sticker">${item.list_price}</p>
                        </div>
                    </div>
                );
            }
        }
        return components;
    }
    render() {
        return (
            <Template>
                <Metadata title="Checkout"
                          description=""
                          url={this.props.location.pathname}/>
                <div className="Checkout page">
                    <h1>Check Out</h1>
                    <div className="desktop-half mobile-whole space left" style={{marginBottom: "20px"}}>
                        <h6>Items</h6>
                        {this.renderCartItems()}

                        <div className="checkout-totals">
                            <p>Subtotal: ${this.state.subtotal}</p>
                            {/* <p>Tax: ${this.state.tax}</p> */}
                            <p>Grand Total: ${this.state.total}</p>
                        </div>
                    </div>
                    <div className="desktop-half mobile-whole space left">
                        <form className="checkout">
                            <h4>Shipping & Info</h4>
                            <input id="first_name" type="text" onChange={this.handleChange} placeholder="First name" className="desktop-half mobile-whole left"></input>

                            <input id="last_name" type="text" onChange={this.handleChange} placeholder="Last name" className="desktop-half mobile-whole left"></input>
                            <br/>

                            <input id="email" type="text" onChange={this.handleChange} placeholder="E-mail address" className="desktop-whole mobile-whole left"></input>
                            <br/>

                            <input id="address1" type="text" onChange={this.handleChange} placeholder="Address 1" className="desktop-whole mobile-whole left"></input>
                            <br/>

                            <input id="address2" type="text" onChange={this.handleChange} placeholder="Address 2" className="desktop-whole mobile-whole left"></input>
                            <br/>

                            <input id="city" type="text" onChange={this.handleChange} placeholder="City" className="desktop-half mobile-whole left"></input>
                            <br/>

                            {/* <input id="state_or_province_code" onChange={this.handleChange} type="text" placeholder="State" className="desktop-quarter mobile-whole left"></input> */}
                            <select id="state_or_province_code" onChange={this.handleChange} placeholder="State" className="desktop-quarter mobile-whole left">
                                <option value="">State</option>
                                <option value="AL" data-country="US">Alabama</option>
                                <option value="AK" data-country="US">Alaska</option>
                                <option value="AZ" data-country="US">Arizona</option>
                                <option value="AR" data-country="US">Arkansas</option>
                                <option value="AA" data-country="US">Armed Forces (AA)</option>
                                <option value="AE" data-country="US">Armed Forces (AE)</option>
                                <option value="AP" data-country="US">Armed Forces (AP)</option>
                                <option value="CA" data-country="US">California</option>
                                <option value="CO" data-country="US">Colorado</option>
                                <option value="CT" data-country="US">Connecticut</option>
                                <option value="DE" data-country="US">Delaware</option>
                                <option value="DC" data-country="US">District of Columbia</option>
                                <option value="FL" data-country="US">Florida</option>
                                <option value="GA" data-country="US">Georgia</option>
                                <option value="GU" data-country="US">Guam</option>
                                <option value="HI" data-country="US">Hawaii</option>
                                <option value="ID" data-country="US">Idaho</option>
                                <option value="IL" data-country="US">Illinois</option>
                                <option value="IN" data-country="US">Indiana</option>
                                <option value="IA" data-country="US">Iowa</option>
                                <option value="KS" data-country="US">Kansas</option>
                                <option value="KY" data-country="US">Kentucky</option>
                                <option value="LA" data-country="US">Louisiana</option>
                                <option value="ME" data-country="US">Maine</option>
                                <option value="MD" data-country="US">Maryland</option>
                                <option value="MA" data-country="US">Massachusetts</option>
                                <option value="MI" data-country="US">Michigan</option>
                                <option value="MN" data-country="US">Minnesota</option>
                                <option value="MS" data-country="US">Mississippi</option>
                                <option value="MO" data-country="US">Missouri</option>
                                <option value="MT" data-country="US">Montana</option>
                                <option value="NE" data-country="US">Nebraska</option>
                                <option value="NV" data-country="US">Nevada</option>
                                <option value="NH" data-country="US">New Hampshire</option>
                                <option value="NJ" data-country="US">New Jersey</option>
                                <option value="NM" data-country="US">New Mexico</option>
                                <option value="NY" data-country="US">New York</option>
                                <option value="NC" data-country="US">North Carolina</option>
                                <option value="ND" data-country="US">North Dakota</option>
                                <option value="MP" data-country="US">Northern Mariana Islands</option>
                                <option value="OH" data-country="US">Ohio</option>
                                <option value="OK" data-country="US">Oklahoma</option>
                                <option value="OR" data-country="US">Oregon</option>
                                <option value="PA" data-country="US">Pennsylvania</option>
                                <option value="PR" data-country="US">Puerto Rico</option>
                                <option value="RI" data-country="US">Rhode Island</option>
                                <option value="SC" data-country="US">South Carolina</option>
                                <option value="SD" data-country="US">South Dakota</option>
                                <option value="TN" data-country="US">Tennessee</option>
                                <option value="TX" data-country="US">Texas</option>
                                <option value="VI" data-country="US">U.S. Virgin Islands</option>
                                <option value="UT" data-country="US">Utah</option>
                                <option value="VT" data-country="US">Vermont</option>
                                <option value="VA" data-country="US">Virginia</option>
                                <option value="WA" data-country="US">Washington</option>
                                <option value="WV" data-country="US">West Virginia</option>
                                <option value="WI" data-country="US">Wisconsin</option>
                                <option value="WY" data-country="US">Wyoming</option>
                            </select>
                            <br/>

                            <input id="postal_code" onChange={this.handleChange} type="text" placeholder="Zip Code" className="desktop-quarter mobile-whole left"></input>
                            <br/>

                            <br/>

                            <input id="phone" type="text" onChange={this.handleChange} placeholder="Phone" className="desktop-whole mobile-whole left"></input>
                            <br/>

                            <h4>Billing Address</h4>
                            <input id="billing_address1" type="text" onChange={this.handleChange} placeholder="Address 1" className="desktop-whole mobile-whole left"></input>
                            <br/>

                            <input id="billing_address2" type="text" onChange={this.handleChange} placeholder="Address 2" className="desktop-whole mobile-whole left"></input>
                            <br/>

                            <input id="billing_city" type="text" onChange={this.handleChange} placeholder="City" className="desktop-half mobile-whole left"></input>

                            <select id="billing_state_code" onChange={this.handleChange} placeholder="State" className="desktop-quarter mobile-whole left">
                                <option value="">State</option>
                                <option value="AL" data-country="US">Alabama</option>
                                <option value="AK" data-country="US">Alaska</option>
                                <option value="AZ" data-country="US">Arizona</option>
                                <option value="AR" data-country="US">Arkansas</option>
                                <option value="AA" data-country="US">Armed Forces (AA)</option>
                                <option value="AE" data-country="US">Armed Forces (AE)</option>
                                <option value="AP" data-country="US">Armed Forces (AP)</option>
                                <option value="CA" data-country="US">California</option>
                                <option value="CO" data-country="US">Colorado</option>
                                <option value="CT" data-country="US">Connecticut</option>
                                <option value="DE" data-country="US">Delaware</option>
                                <option value="DC" data-country="US">District of Columbia</option>
                                <option value="FL" data-country="US">Florida</option>
                                <option value="GA" data-country="US">Georgia</option>
                                <option value="GU" data-country="US">Guam</option>
                                <option value="HI" data-country="US">Hawaii</option>
                                <option value="ID" data-country="US">Idaho</option>
                                <option value="IL" data-country="US">Illinois</option>
                                <option value="IN" data-country="US">Indiana</option>
                                <option value="IA" data-country="US">Iowa</option>
                                <option value="KS" data-country="US">Kansas</option>
                                <option value="KY" data-country="US">Kentucky</option>
                                <option value="LA" data-country="US">Louisiana</option>
                                <option value="ME" data-country="US">Maine</option>
                                <option value="MD" data-country="US">Maryland</option>
                                <option value="MA" data-country="US">Massachusetts</option>
                                <option value="MI" data-country="US">Michigan</option>
                                <option value="MN" data-country="US">Minnesota</option>
                                <option value="MS" data-country="US">Mississippi</option>
                                <option value="MO" data-country="US">Missouri</option>
                                <option value="MT" data-country="US">Montana</option>
                                <option value="NE" data-country="US">Nebraska</option>
                                <option value="NV" data-country="US">Nevada</option>
                                <option value="NH" data-country="US">New Hampshire</option>
                                <option value="NJ" data-country="US">New Jersey</option>
                                <option value="NM" data-country="US">New Mexico</option>
                                <option value="NY" data-country="US">New York</option>
                                <option value="NC" data-country="US">North Carolina</option>
                                <option value="ND" data-country="US">North Dakota</option>
                                <option value="MP" data-country="US">Northern Mariana Islands</option>
                                <option value="OH" data-country="US">Ohio</option>
                                <option value="OK" data-country="US">Oklahoma</option>
                                <option value="OR" data-country="US">Oregon</option>
                                <option value="PA" data-country="US">Pennsylvania</option>
                                <option value="PR" data-country="US">Puerto Rico</option>
                                <option value="RI" data-country="US">Rhode Island</option>
                                <option value="SC" data-country="US">South Carolina</option>
                                <option value="SD" data-country="US">South Dakota</option>
                                <option value="TN" data-country="US">Tennessee</option>
                                <option value="TX" data-country="US">Texas</option>
                                <option value="VI" data-country="US">U.S. Virgin Islands</option>
                                <option value="UT" data-country="US">Utah</option>
                                <option value="VT" data-country="US">Vermont</option>
                                <option value="VA" data-country="US">Virginia</option>
                                <option value="WA" data-country="US">Washington</option>
                                <option value="WV" data-country="US">West Virginia</option>
                                <option value="WI" data-country="US">Wisconsin</option>
                                <option value="WY" data-country="US">Wyoming</option>
                            </select>

                            <input id="billing_postal_code" type="text" onChange={this.handleChange} placeholder="Zip Code" className="desktop-quarter mobile-whole left"></input>
                            <br/>

                            <h4>Payment</h4>
                            <input id="card_holder_name" type="text" onChange={this.handleChange} placeholder="Cardholder Name" className="desktop-whole mobile-whole left"></input>
                            <br/>

                            <input id="card_number" type="text" onChange={this.handleChange} placeholder="Card Number" className="desktop-whole mobile-whole left"></input>
                            <br/>

                            <select id="expiry_month" onChange={this.handleChange} className="dropdown desktop-whole mobile-whole left">
                                <option value="0">Expiry Month...</option>
                                <option value="1">January (01)</option>
                                <option value="2">February (02)</option>
                                <option value="3">March (03)</option>
                                <option value="4">April (04)</option>
                                <option value="5">May (05)</option>
                                <option value="6">June (06)</option>
                                <option value="7">July (07)</option>
                                <option value="8">August (08)</option>
                                <option value="9">September (09)</option>
                                <option value="10">October (10)</option>
                                <option value="11">November (11)</option>
                                <option value="12">December (12)</option>
                            </select>
                            <br/>

                            <input id="expiry_year" type="text" onChange={this.handleChange} placeholder="Expiry Year (XXXX)" className="desktop-whole mobile-whole left"></input>
                            <br/>

                            <input id="verification_value" onChange={this.handleChange} type="text" placeholder="CVV" className="desktop-whole mobile-whole left"></input>
                            <br/>
                            <div class="credit-cards desktop-whole mobile-whole"><i class="fab fa-cc-visa"></i><i class="fab fa-cc-mastercard"></i><i class="fab fa-cc-discover"></i><i class="fab fa-cc-amex"></i></div>

                            <div className="clearfix"></div>

                            {this.renderError()}
                            <div onClick={this.handleSubmit} className={"button button-login" + (this.state.isProcessing ? " processing" : "")}>Check Out</div>
                            <div className="clearfix"></div>
                        </form>
                    </div>
                    <div className="clearfix"></div>

                </div>
            </Template>
        );
    }
}