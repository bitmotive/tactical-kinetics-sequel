/*
=====================================================
OMEGA19 Page
Product
=====================================================
*/

import React from 'react';
import Template from '../Template';
import Tabs from '../Tabs';
import TabsPage from '../TabsPage';
import Metadata from '../Metadata';
import ImageZoom from 'react-medium-image-zoom';

import ProductImage1 from '../../static/img/no-image.png';
import NoImage from '../../static/img/no-image.png';
import FeaturedProducts from '../FeaturedProducts';

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: parseInt(this.props.match.params.productURI.split("-")[0]),
            name: "",
            price: 0,
            description: "",
            isLoaded: false,
            quantity: 1,
            featuredImage: "",
            images: null,
            currentImage: 0,
            data: {},
            errorRaised: false,
            messageRaised: false,
            message: "",
            isProcessing: false,
            options: [
                {
                    id: "1",
                    name: "test",
                    label: "Test",
                    currentValue: 0,
                    values: [
                        {
                            id: "3",
                            label: "Right"
                        }
                    ]
                }
            ]
        };

        global.API.getProducts(this.state.id).then(
            (success) => {
                let options = success.data.options;
                let optionsCondensed = [];
                if(options.length > 0) {
                    for(var i = 0; i < options.length; i++) {
                        let option = options[i];
                        let hasSetFirst = false;
                        let item = {
                            id: option.id,
                            label: option.display_name,
                            currentValue: 0,
                            values: []
                        }
                        for (var value of option.option_values) {
                            if(!hasSetFirst) {
                                item.currentValue = value.id;
                                hasSetFirst = true;
                            }
                            let itemPush = {
                                id: value.id,
                                label: value.label
                            }
                            item.values.push(itemPush);
                        }
                        optionsCondensed.push(item);
                    }
                }
                this.setState({
                    data: success.data,
                    name: success.data.name,
                    price: success.data.price,
                    featuredImage: (success.data.images.length > 0 ? success.data.images[0].url_zoom : NoImage),
                    images: (success.data.images.length > 0 ? success.data.images : null),
                    options: optionsCondensed.length > 0 ? optionsCondensed : [],
                    description: success.data.description,
                    isLoaded: true
                });
            },
            (error) => {}
        );

        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleShareClick(linkType) {
        if(linkType == "facebook") {
            window.location = "https://www.facebook.com/sharer.php?s=100&p[url]=" + encodeURI(global.SITE_DOMAIN + this.props.location.pathname);
        } else if(linkType == "twitter") {
            window.location = "https://twitter.com/share?url=" + encodeURI(global.SITE_DOMAIN + this.props.location.pathname);
        } else if(linkType == "pinterest") {
            window.location = "https://twitter.com/share?url=" + encodeURI(global.SITE_DOMAIN + this.props.location.pathname);
        }
    }

    renderOptions() {
        let renderable = [];
        if(this.state.isLoaded) {
            if(this.state.options.length > 0) {
                for(var option of this.state.options) {
                    let items = [];
                    for(var value of option.values) {
                        items.push(
                            <option value={value.id}>{value.label}</option>
                        );
                    }
                    renderable.push(
                        <div className="product-page-option">
                            <label>{option.label}</label>
                            <select id={renderable.length} onChange={this.handleOptionChange}>
                                {items}
                            </select>
                        </div>
                    );
                }
            }
        }
        return renderable;
    }

    handleOptionChange(e) {
        var optionID = e.target.id;
        var optionValue = e.target.value;
        var options = this.state.options;

        options[optionID].currentValue = optionValue;
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
    handleAddToCart() {
        this.raiseProcessing();
        this.clearMessage();
        global.API.addToCart(this.state.id, this.state.quantity, (this.state.options.length > 0 ? this.state.options : null )).then(
            (success) => {
                if(success.Result.Response.errors) {
                    this.raiseError("An error has occured. Please try again later.");
                } else {
                    this.raiseMessage(this.state.name + (this.state.quantity > 1 ? "(" + this.state.quantity + ") " : " ") + 'has been added to your cart.');
                }
            },
            (error) => {
                console.log("api error");
                this.raiseError("An error has occured. Please try again later.");
            }
        ).finally(
            () => {
                this.stopProcessing();
            }
        );
    }

    raiseMessage(message) {
        this.setState({
            messageRaised: true,
            errorRaised: false,
            message: message
        });
    }
    
    clearMessage() {
        this.setState({
            messageRaised: false,
            errorRaised: false,
            message: ""
        });
    }

    raiseError(message) {
        this.setState({
            errorRaised: true,
            messageRaised: false,
            message: message
        });
    }

    clearError() {
        this.clearMessage();
    }

    handleQuantityChange(event) {
        let value = parseInt(event.target.value);
        this.setState({
            quantity: value < 1 ? 1 : value > 20 ? 20 : value
        });
    }

    returnDescriptionHTML() {
        return {
            __html: this.state.description
        }
    }

    renderTabs() {
        if(this.state.isLoaded) {
            return (
                // <Tabs className="desktop-whole mobile-whole right">
                //     <TabsPage title="Description">
                <div>
                    <h5 className="product-page-description-title">Description</h5>
                    <div dangerouslySetInnerHTML={this.returnDescriptionHTML()}></div>
                </div>
                //     </TabsPage>
                //     <TabsPage title="Reviews">
                //         <h1>Coming Soon!</h1>
                //         <p>RogueShops is currently in alpha. We will be adding this soon.</p>
                //     </TabsPage>
                // </Tabs>
            );
        }
    }

    renderThumbnails() {
        let thumbnails = [];
        if(this.state.isLoaded) {
            if(this.state.images) {
                for(var i = 0; i < this.state.images.length; i++) {
                    const image = this.state.images[i]
                    thumbnails.push(
                        <div id={i} onClick={this.handleThumbnailClick} className="product-page-thumbnail" style={{backgroundImage: "url(" + image.url_standard + ")"}}></div>
                    );
                }
            }
        }
        return thumbnails;
    }

    handleThumbnailClick(e) {
        let id = e.target.id;
        this.setState({
            featuredImage: this.state.images[id].url_zoom
        });
    }
    
    setImageSource() {
        if(this.state.isLoaded) {
            this.setState((state, props) => ({
                featuredImage: state.images[state.currentImage].url_zoom
            }));
        }
    }

    renderImagePlaceholder() {
        if(!this.state.isLoaded) {
            return (
                <div style={{ width: "100%", height: "400px"}}></div>
            );
        }
    }

    renderTitlePlaceholder() {
        if(!this.state.isLoaded) {
            return (
                <div style={{ width: "300px", height: "35px", backgroundColor: "rgb(240, 240, 240)", borderRadius: "2px", margin: "0px 0px 30px 0px"}}></div>
            );
        }
    }

    renderMessage() {
        if(this.state.messageRaised) {
            return (
                <div className="message">
                    {this.state.message}
                </div>
            );
        } else if(this.state.errorRaised) {
            return (
                <div className="message error">
                    {this.state.message}
                </div>
            );
        }
    }

    renderMetadata() {
        if(this.state.isLoaded) {
            return (
                <Metadata title={this.state.name}
                        description={"$" + this.state.price}
                        url={this.props.location.pathname}
                        image={this.state.featuredImage}/>
            );
        }
    }

    render() {
        return (
            <Template>
                {this.renderMetadata()}
                <div className="Product page product-page">
                    <div className="product-page-breadcrumb">
                        {/* <p>Collection > {this.state.name}</p> */}
                    </div>
                    <div className="desktop-half mobile-whole left product-page-head-half product-page-head-image">
                        {/* <img className="full-width" src={this.state.featuredImage}/> */}
                        <ImageZoom image={{
                                src: this.state.featuredImage,
                                alt: this.state.name,
                                style: {width: "100%"}
                            }}
                            zoomImage={{
                                src: this.state.featuredImage,
                                alt: this.state.name
                            }}
                        />
                        {this.renderImagePlaceholder()}
                        {this.renderThumbnails()}
                    </div>
                    <div className="desktop-half mobile-whole right product-page-head-half">
                        {this.renderTitlePlaceholder()}
                        <h1>{this.state.name}</h1>
                        {/* <p className="product-page-stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </p> */}
                        
                        <h6>{"$" + parseFloat(this.state.price).toFixed(2)}</h6>
                        {this.renderOptions()}
                        <label htmlFor="Quantity">Quantity</label>
                        <input id="Quantity" type="number" min={1} max={100} value={this.state.quantity} onChange={this.handleQuantityChange}/>

                        {this.renderMessage()}
                        <div id="AddToCart" className={"button" + (this.state.isProcessing ? " processing" : "")} onClick={() => this.handleAddToCart()}>Add to Cart</div>

                        <br/>
                        <span className="italic grey">Ships from United States</span>
                        <div className="share-links">
                            <h6>Share</h6>
                            <div>
                                <a target="_blank" href={"https://www.facebook.com/sharer.php?s=100&p[url]=" + encodeURI(global.SITE_DOMAIN + this.props.location.pathname)}><i class="fab fa-facebook-f"></i></a>
                            </div>
                            <div>
                                <a target="_blank" href={"https://twitter.com/share?url=" + encodeURI(global.SITE_DOMAIN + this.props.location.pathname)}><i class="fab fa-twitter"></i></a>
                            </div>
                            <div>
                                <a target="_blank" href={"https://pinterest.com/pin/create/bookmarklet/?url=" + encodeURI(global.SITE_DOMAIN + this.props.location.pathname)}><i class="fab fa-pinterest-p"></i></a>
                            </div>
                        </div>
                        {this.renderTabs()}
                    </div>
                    
                    <div className="clearfix"></div>

                    <FeaturedProducts title="Check out our other products!" collectionID="all"/>
                </div>
            </Template>
        );
    }
}