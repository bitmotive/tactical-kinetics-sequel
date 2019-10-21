/*
=====================================================
OMEGA19 Page
Contact
=====================================================
*/

import React from "react";
import Template from "../Template";
import { Link } from "react-router-dom";
import Metadata from '../Metadata';

/* STATIC RESOURCES */
import dark_logo from "../../static/img/updated/Tactical-Kinetics.png";

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],

            first_name: "",
            last_name: "",
            email: "",
            order_number: "",
            company_name: "",
            rma_number: "",
            subject: "",
            message: "",


            isProcessing: false,
            isError: false,
            isMessage: false,
            error: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        document.body.classList.add("signup-page");
    }

    componentWillUnmount() {
        document.body.classList.remove("signup-page");
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
    raiseError(error) {
        this.setState({
            isError: true,
            isMessage: false,
            error: error
        });
    }
    clearError() {
        this.setState({
            isError: false,
            isMessage: false,
            error: ""
        });
    }
    raiseMessage(message) {
        this.setState({
            isError: false,
            isMessage: true,
            error: message
        });
    }
    clearMessage() {
        this.setState({
            isError: false,
            isMessage: false,
            error: ""
        });
    }
    renderMessage() {
        if (this.state.isError || this.state.isMessage) {
            return (
                <div className="large-12 cell">
                    <div className={"message" + (this.state.isError ? " error" : "")}>
                        {this.state.error}
                    </div>
                </div>
            );
        }
    }
    handleChange(e) {
        const { name, type, value, id } = e.target;
        const val = type === "number" ? parseFloat(value) : value;
        this.setState({ [id]: val });
    }

    handleSubmit() {
        this.raiseProcessing();
        var content = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            order_number: this.state.order_number,
            company_name: this.state.company_name,
            rma_number: this.state.rma_number,
            subject: this.state.subject,
            message: this.state.message
        }
        global.API.sendContactMessage(content).then(
            (success) => {
                this.raiseMessage("Your message has been submitted! Our team will be getting back to you within 24-48 hours.");
            },
            (error) => {
                this.raiseError("An error has occured. Please try again later.");
            }
        ).finally(
            () => {
                this.stopProcessing();
            }
        );
    }

    render() {
        return (
            <Template>
                <Metadata title="Contact"
                    description=""
                    url={this.props.location.pathname} />
                <div className="grid-container page-content signup-wrapper">
                    <div className="grid-x">
                        <div className="small-12 large-8 large-offset-2 cell content-wrap">
                            <section className="signup login">
                                <form>
                                    <div className="grid-container signup-grid">
                                        <div className="grid-x grid-padding-x">
                                            <div className="large-12 cell">
                                                <br></br>
                                                <h3 className="form-header text-center">Contact Us</h3>
                                                <p>
                                                    We're happy to answer questions or help you with
                                                    exchanges or warranty issues. Please fill out the form
                                                    below if you need assistance.
                                                </p>
                                                <br></br>
                                            </div>
                                            <div className="large-12 cell">
                                                <input
                                                    type="text"
                                                    id="first_name"
                                                    name="first_name"
                                                    placeholder="First Name"
                                                    required
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <div className="large-12 cell">
                                                <input
                                                    type="text"
                                                    id="last_name"
                                                    name="last_name"
                                                    placeholder="Last Name"
                                                    required
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <div className="large-12 cell">
                                                <input
                                                    type="text"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email address"
                                                    required
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <div className="large-12 cell">
                                                <input
                                                    type="text"
                                                    id="order_number"
                                                    name="order_number"
                                                    placeholder="Order Number"
                                                    required
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <div className="large-12 cell">
                                                <input
                                                    type="text"
                                                    id="company_name"
                                                    name="company_name"
                                                    placeholder="Company Name"
                                                    required
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <div className="large-12 cell">
                                                <input
                                                    type="text"
                                                    id="rma_number"
                                                    name="rma_number"
                                                    placeholder="RMA Number"
                                                    required
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <div className="large-12 cell">
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    placeholder="Message"
                                                    required
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="large-12 cell">
                                                {this.renderMessage()}
                                            </div>
                                            <div className="large-12 cell">
                                                <div
                                                    id="submitContact"
                                                    className={"button expanded cta-main" + (this.state.isProcessing ? " processing" : "")}
                                                    onClick={() => this.handleSubmit()}
                                                >
                                                    SUBMIT
                                                </div>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </Template>
        );
    }
}
