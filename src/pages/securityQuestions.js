import React, { useState, useEffect, Component } from "react";
import { Collapse, Loading, Result } from "antd-mobile";
//import { div, sleep } from 'demos'
import BottomPanel from "../layouts/bottom_panel";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import $ from "jquery";
import Header from "../layouts/front_header";
import { Link } from "react-router-dom";
import { Tabs } from "antd";

const { TabPane } = Tabs;

export default class SecurityQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerTitle: "Sign Up",
        };
    }
    callback = (key) => {
        if (key == 1) {
            this.setState({ headerTitle: "Sign Up" });
        } else {
            this.setState({ headerTitle: "Login" });
        }
        console.log(key);
    };
    componentDidMount() {
        window.scroll(0, 0);
        setTimeout(() => {
            $("#preloader").fadeOut();
        }, 2000);
    }

    render() {
        require("antd/dist/antd.css");
        return (
            <>
                <Header isHeader={"Security Questions"} topDetails={false} />
                {/* <div id="preloader">
                <div id="status">
                    <StageSpinner color="#FFB43A" backColor="#FFF" frontColor="#FFF" size={50} />
                </div>
            </div> */}
                <div style={{ marginBottom: "100px", paddingBottom: "50px", paddingLeft: "10px", paddingRight: "10px" }}>
                    <div title="基础用法" padding="0" border="none" className="mt-6">
                        <div className="container-fluid" style={{ marginTop: "100px" }}>
                            <div className="row" style={{ marginTop: "100px" }}>
                                <p style={{ textAlign: "center", fontSize: "14px" }}>Let’s help secure your account by setting up 3 security questions</p>
                                <div className="col-sm-12 mt-4">
                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                            Question 1
                                        </label>
                                        <select className="form-control">
                                            <option></option>
                                            <option>-</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                            Answer
                                        </label>
                                        <input className="form-control" type="text" />
                                    </div>
                                </div>

                                <div className="col-sm-12 mt-4">
                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                            Question 2
                                        </label>
                                        <select className="form-control">
                                            <option></option>
                                            <option>-</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                            Answer
                                        </label>
                                        <input className="form-control" type="text" />
                                    </div>
                                </div>

                                <div className="col-sm-12 mt-4">
                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                            Question 3
                                        </label>
                                        <select className="form-control">
                                            <option></option>
                                            <option>Africa</option>
                                            <option>Asia</option>
                                            <option>Carribean</option>
                                            <option>Europe</option>
                                            <option>India</option>
                                            <option>North America</option>
                                            <option>South America</option>
                                            <option>United Kingdom</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                            Answer
                                        </label>
                                        <input className="form-control" type="text" />
                                    </div>
                                </div>

                                <div className="col-sm-12">
                                    <Link to="/profile">
                                        <button className="btn comp-btn">Confirm</button>
                                    </Link>
                                </div>
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
