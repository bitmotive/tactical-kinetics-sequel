/*
=====================================================
OMEGA19 Page
Cart
=====================================================
*/

import React from 'react';
import Template from '../Template';
import Metadata from '../Metadata';

import ProductImage1 from '../../static/img/no-image.png';
import { optionalCallExpression } from '@babel/types';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            currency: "",
            taxIncluded: false,
            subtotal: 0,
            total: 0,
            isLoaded: false,
            isEmpty: false,
            couponCode: "",
            showCouponCode: false,
        }
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
                        tax: Math.abs((parseFloat(data.cart_amount).toFixed(2) - parseFloat(data.base_amount).toFixed(2))).toFixed(2),
                        coupons: data.coupons,
                        isLoaded: true
                    });
                } catch(e) {
                    this.setState({
                        isEmpty: true
                    });
                }
            },
            (error) => {}
        );
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, type, value, id } = e.target;
        const val = type === "number" ? parseFloat(value) : value;
        this.setState({ [id]: val });
    }

    removeProduct(e) {
        let pid = e.target.id;
        global.API.removeFromCart(pid).then(
            (success) => {
                window.location = "/cart";
            },
            (error) => {
                console.log("error");
                console.log(error);
            }
        );
    }

    renderCoupons() {
        let components = [];
        if(this.state.isLoaded) {
            if(this.state.coupons.length > 0) {
                for(var i = 0; i < this.state.coupons.length; i++) {
                    var coupon = this.state.coupons[i];
                    components.push(
                        <div>
                            <p style={{color: "red"}}>
                                <i key={i} style={{margin: "0px 5px 0px 0px"}} onClick={() => this.handleRemoveCouponCode(coupon.code)} class="fas fa-minus-circle pointer"></i>
                                {coupon.name} ({coupon.code}): -{global.API.tools.formatMoney(coupon.discounted_amount)}
                            </p>
                        </div>
                    );
                }
            }
        }
        return components;
    }

    renderProducts(mobile = false) {
        let items = [];
        if(this.state.isLoaded) {
            if(mobile == false) {
                for(var i = 0; i < this.state.items.length; i++) {
                    let product = this.state.items[i];
                    let optionsComponent = [];
                    if(product.options.length > 0) {
                        for(var option of product.options) {
                            optionsComponent.push(
                                <p style={{color: "grey"}} className="no-margin">{option.name}: <span>{option.value}</span></p>
                            );
                        }
                    }
                    items.push(
                        <tr>
                            <td className="cart-table-image">
                                <img src={product.image_url}/>
                            </td>
                            <td className="cart-table-title">
                                <a href={"/product/" + global.API.tools.toSlug(product.product_id, product.name)}>{product.name}</a>
                                {optionsComponent}
                            </td>
                            <td className="cart-table-quantity">
                                {/* <input type="text" value={product.quantity} onChange={this.handleChange}/> */}
                                <p>{product.quantity}</p>
                                <a id={product.product_id} onClick={this.removeProduct}>Remove</a>
                            </td>
                            <td className="cart-table-price">${parseFloat(product.sale_price).toFixed(2)}</td>
                        </tr>
                    );
                }
            } else {
                for(var i = 0; i < this.state.items.length; i++) {
                    let product = this.state.items[i];
                    let optionsComponent = [];
                    if(product.options.length > 0) {
                        for(var option of product.options) {
                            optionsComponent.push(
                                <p style={{color: "rgb(44, 117, 150)"}} className="no-margin">{option.name}: <span>{option.value}</span></p>
                            );
                        }
                    }
                    items.push(
                        <div className="cart-mobile-items">
                            <div className="mobile-fifth">
                                <a href={"/product/" + global.API.tools.toSlug(product.product_id, product.name)}>
                                    <img src={product.image_url}/>
                                </a>
                            </div>
                            <div className="cart-mobile-items__info">
                                <a href={"/product/" + global.API.tools.toSlug(product.product_id, product.name)}>
                                    <div className="cart-mobile-items__name">{product.name}</div>
                                </a>
                                <div>
                                    {optionsComponent}
                                </div>
                                <div className="cart-mobile-items__quantity">Quantity: {product.quantity}</div>
                                <div className="cart-mobile-items__price">${parseFloat(product.sale_price).toFixed(2)}</div>
                                <br/>
                                <div className="mobile-whole" style={{margin: "20px 0px 0px 0px"}}>
                                    <a id={product.product_id} onClick={this.removeProduct}>Remove</a>
                                </div>

                            </div>
                        </div>
                    );
                }
            }
        } else {
            return;
        }
        return items;
    }

    handleShowCouponCode() {
        var currentState = this.state.showCouponCode;
        this.setState({
            showCouponCode: !currentState
        });
    }

    handleAddCouponCode() {
        global.API.addCoupon(this.state.couponCode).then(
            (success) => {
                window.location = "/cart";
            },
            (error) => {}
        );
    }

    handleRemoveCouponCode(code) {
        global.API.removeCoupon(code).then(
            (success) => {
                window.location = "/cart";
            },
            (error) => {}
        );
    }

    render() {
        return (
            <Template>
                <Metadata title="Cart"
                          description=""
                          url={this.props.location.pathname}/>
                <div className="cart page">
                    <div className={"cart-desktop " + (this.state.isEmpty ? "hidden" : "")}>
                        <h1>Cart</h1>
                        <table className={"cart-table"}>
                            <thead>
                                <td></td>
                                <td>Item</td>
                                <td>Quantity</td>
                                <td>Price</td>
                            </thead>
                            {this.renderProducts()}
                        </table>

                        <div className="desktop-quarter left">
                            <p className="coupon-code-button" onClick={() => this.handleShowCouponCode()}>+ Add Coupon Code</p>
                            <div className={"coupon-code " + (this.state.showCouponCode ? "" : "coupon-code-hidden")}>
                                <input id="couponCode" onChange={this.handleChange} type="text" placeholder="Enter a coupon code..."/>
                                <div className="button button-contrast" onClick={() => this.handleAddCouponCode()}>Apply</div>
                            </div>
                        </div>

                        <div className="desktop-quarter right text-align-right">
                            <p className="no-margin">Subtotal: ${this.state.subtotal}</p>
                            {this.renderCoupons()}
                            <p className="no-margin">Grand Total: ${this.state.total}</p>
                            <a href="/checkout"><div className="button button-contrast">Checkout</div></a>
                        </div>
                        <div className="clearfix"></div>
                    </div>


                    <div className={"cart-mobile " + (this.state.isEmpty ? "hidden" : "")}>
                        <h1>Cart</h1>
                        {this.renderProducts(true)}
                        <div className="cart-mobile-pricing mobile-whole">
                            <p className="coupon-code-button" style={{margin: "0px 0px 10px 0px"}} onClick={() => this.handleShowCouponCode()}>+ Add Coupon Code</p>
                            <div className={"coupon-code " + (this.state.showCouponCode ? "" : "coupon-code-hidden")}>
                                <input id="couponCode" onChange={this.handleChange} type="text" placeholder="Enter a coupon code..."/>
                                <div className="button button-contrast" onClick={() => this.handleAddCouponCode()}>Apply</div>
                            </div>
                            <p>Subtotal: ${this.state.subtotal}</p>
                            {this.renderCoupons()}
                            <p className="no-margin">+ Additional Fees & Tax</p>
                            <p>Grand Total: ${this.state.total}</p>
                            <a href="/checkout"><div className="button button-contrast">Checkout</div></a>
                        </div>
                    </div>

                    <div className={"cart-empty " + (this.state.isEmpty ? "" : "hidden")}>
                        <i class="fas fa-shopping-bag"></i>
                        <h1>Your cart is empty.</h1>
                        <p>Try adding some products to get started.</p>
                    </div>
                </div>
            </Template>
        );
    }
}