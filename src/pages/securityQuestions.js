import React, { useState, useEffect, Component } from "react";
import { Collapse, Loading, Result } from "antd-mobile";
//import { div, sleep } from 'demos'
import BottomPanel from "../layouts/bottom_panel";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import $ from "jquery";
import Header from "../layouts/front_header";
import { Link } from "react-router-dom";
import { Tabs } from "antd";
import { stateKeys } from "../redux/actions";
import Endpoint from "../utils/endpoint";
import toast, { Toaster } from "react-hot-toast";

const { TabPane } = Tabs;

export default class SecurityQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerTitle: "Sign Up",
            payLoad: JSON.parse(localStorage.getItem(stateKeys.USER)),
            validationArr: []

        };
    }
    loadDataError = (error) =>
        toast.error(error, {
            style: {
                border: "1px solid #DC2626",
                padding: "16px",
                background: "#DC2626",
                color: "#fff",
                borderRadius: "3rem",
            },
            iconTheme: {
                primary: "#FFFAEE",
                secondary: "#DC2626",
            },
        });
    handleInput = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };
    handleQuestionInput = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        if(this.state.validationArr.includes(value)){
            this.loadDataError('Question already selected!');
            console.log(this.state.validationArr)
            $("#submit__btn").fadeOut()
            return
        }
        else{
            if(!this.state.validationArr.includes(value) && this.state.validationArr.length < 3) this.state.validationArr.push(value)            
            console.log(this.state.validationArr)
            $("#submit__btn").fadeIn()
        }
        this.setState({
            [name]: value,
        });
    };
    SubmitSecurityAnswer = () => {
        if(this.state.validationArr.length !== 3 && this.state.sq1 == null || this.state.sq2 == null || this.state.sq3 == null){
            this.loadDataError("Select security questions and provide answers accordingly")
            return
        }
        $("#preloader").fadeIn();
        var holdArray = [
            {
                "id": parseInt(this.state.sq1),
                "name": this.state.answer_one
              },
              {
                "id": parseInt(this.state.sq2),
                "name": this.state.answer_two
              },
              {
                "id": parseInt(this.state.sq3),
                "name": this.state.answer_three
              }
        ];
        Endpoint.postSecurityQuestions(this.state.payLoad?.userId, holdArray)
        .then((res) => {
            var ls = JSON.parse(localStorage.getItem(stateKeys.USER));
                //console.log(ls, "ls");
                ls.securityQuestion = true;
                //console.log(ls, "ls");
                localStorage.removeItem(stateKeys.USER);
                setTimeout(() => {
                    localStorage.setItem(stateKeys.USER, JSON.stringify(ls));
                    if(res.data == 200) window.location.href = "/profile";
                }, 1000);
        })
        .catch((error) => {
            this.loadDataError(error, this);
        });
    }
    callback = (key) => {
        if (key == 1) {
            this.setState({ headerTitle: "Sign Up" });
        } else {
            this.setState({ headerTitle: "Login" });
        }
        console.log(key);
    };
    fetchSecurityQuestions = () => {
        Endpoint.getSecurityQuestions()
            .then((res) => {
                this.setState({ security_questions: res.data });
            })
            .catch((error) => {
                this.loadDataError(error, this);
            });
    };
    componentDidMount() {
        window.scroll(0, 0);
        this.fetchSecurityQuestions();
        setTimeout(() => {
            $("#preloader").fadeOut();
        }, 2000);
    }

    render() {
        require("antd/dist/antd.css");
        return (
            <>
            <Toaster position="top-center" />
                <Header isHeader={"Security Questions"} topDetails={false} />
                <div id="preloader">
                <div id="status">
                    <StageSpinner color="#FFB43A" backColor="#FFF" frontColor="#FFF" size={50} />
                </div>
            </div>
                <div style={{ marginBottom: "100px", paddingBottom: "50px", paddingLeft: "10px", paddingRight: "10px" }}>
                    <div title="基础用法" padding="0" border="none" className="mt-6">
                        <div className="container-fluid" style={{ marginTop: "100px" }}>
                            <div className="row" style={{ marginTop: "100px" }}>
                                <p style={{ textAlign: "center", fontSize: "14px" }}><b style={{fontWeight:'700'}}>Hi {this.state.payLoad?.fullName}, </b>Let’s help secure your account by setting up 3 security questions</p>
                                <div className="col-sm-12 mt-4">
                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                            Question 1 
                                        </label>
                                        <select className="form-control" name="sq1" onChange={this.handleQuestionInput}>
                                            <option>Select security question</option>
                                            {this.state.security_questions &&
                                                            this.state.security_questions.map((x) => {
                                                                return (
                                                                    <>
                                                                        <option value={x.id}>
                                                                            {x.name}
                                                                        </option>
                                                                    </>
                                                                );
                                                            })}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                            Answer
                                        </label>
                                        <input className="form-control" type="text" name="answer_one" onChange={this.handleInput}/>
                                    </div>
                                </div>

                                <div className="col-sm-12 mt-4">
                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                            Question 2
                                        </label>
                                        <select className="form-control" name="sq2" onChange={this.handleQuestionInput}>
                                            <option>Select security question</option>
                                            {this.state.security_questions &&
                                                            this.state.security_questions.map((x) => {
                                                                return (
                                                                    <>
                                                                        <option value={x.id}>
                                                                            {x.name}
                                                                        </option>
                                                                    </>
                                                                );
                                                            })}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                            Answer
                                        </label>
                                        <input className="form-control" type="text" name="answer_two" onChange={this.handleInput}/>
                                    </div>
                                </div>

                                <div className="col-sm-12 mt-4">
                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                            Question 3
                                        </label>
                                        <select className="form-control" name="sq3" onChange={this.handleQuestionInput}>
                                            <option>Select security question</option>
                                            {this.state.security_questions &&
                                                            this.state.security_questions.map((x) => {
                                                                return (
                                                                    <>
                                                                        <option value={x.id}>
                                                                            {x.name}
                                                                        </option>
                                                                    </>
                                                                );
                                                            })}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                            Answer
                                        </label>
                                        <input className="form-control" type="text" name="answer_three" onChange={this.handleInput}/>
                                    </div>
                                </div>

                                <div className="col-sm-12">
                                    {/* <Link to="/profile"> */}
                                        <button className="btn comp-btn" id="submit__btn" onClick={this.SubmitSecurityAnswer}>Confirm</button>
                                    {/* </Link> */}
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
