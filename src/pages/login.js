import React, { useState, useEffect, Component } from "react";
import { Collapse, Loading, Result } from "antd-mobile";
//import { div, sleep } from 'demos'
import BottomPanel from "../layouts/bottom_panel";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import $ from "jquery";
import Header from "../layouts/front_header";
import { Link } from "react-router-dom";
import { Tabs } from "antd";
import Endpoint from "../utils/endpoint";
import { loginUser, userLoggedIn } from "../utils/auth";
import toast, { Toaster } from "react-hot-toast";
import { stateKeys } from "../redux/actions";
import { reduxState, validateEmail } from "../utils/helpers";


const { TabPane } = Tabs;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerTitle:'Sign Up',
            payLoad: JSON.parse(localStorage.getItem(stateKeys.USER)),
            activeKey: reduxState(stateKeys.ROUTE_KEY, ""),
            regionId: reduxState(stateKeys.REGION, ""),
            // nn : this.props.location?.state?.activeTabKey
        };
    }
    handleInput = (event) => {
        this.setState({isVerified:null})
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };
onPageValidation = () => {
    var val_email = validateEmail(this.state.email);
    if(!val_email){
        this.loadDataError("Email address is not valid!")
        return;
    }
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

    callback = (key) => {
        if(key == 1){
            this.setState({headerTitle:'Sign Up'})
        }
        else{
            this.setState({headerTitle:'Login'})
        }
        console.log(key);
    };
handleSignUp = () => {
    if(this.state.email == null || this.state.pass == null || parseInt(this.state.regionId) <= 0){
        this.loadDataError("Enter email address and password")
        return;
    }
    var val_email = validateEmail(this.state.email);
    if(!val_email){
        this.loadDataError("Enter a valid email address")
        return;
    }
    if(this.state.pass !== this.state.confirm_pass){
        this.loadDataError("Password and confirm password mismatch!")
        return;
    }
    
    $("#preloader").fadeIn();
    const payload = {
            "userName": this.state.email,
            "password": this.state.pass,
            "regionId": parseInt(this.state.regionId) > 0 ? parseInt(this.state.regionId) : 1
    }
    Endpoint.signup(payload)
    .then((res) => {
        console.log(res)
        console.log(res.data)
        if(res.status == 200 && res.data.token != null){
            loginUser(res.data.token, res.data, true);               
        }
        else{
            $("#preloader").fadeOut("slow");
            this.loadDataError("Oops! something went wrong. Please try again.")
                return
           
        }
     //$("#preloader").fadeOut("slow");
        
    })
    .catch((error) => {
        //handleFormSubmissionError(error, this);
        console.log(error, "error")
        $("#preloader").fadeOut("slow");
       
            this.loadDataError(error != null && error.statusText != null ? error.statusText : "Error! User with email already exists");
            this.setState({
                loginMessage:error.statusText
            })
        
            //$("#invalidLogin").fadeIn();
    })
   
}
    handleSignIn = () => {
        if(this.state.email == null || this.state.pass == null){
            this.loadDataError("Enter email address and password")
            return;
        }
        
        $("#preloader").fadeIn();
        const payload = {
                "userName": this.state.email,
                "password": this.state.pass
        }
        Endpoint.login(payload)
        .then((res) => {
            console.log(res)
            console.log(res.data)
            if(res.status == 200 && res.data.token != null){
                loginUser(res.data.token, res.data, true);               
            }
            else{
                $("#preloader").fadeOut();
                this.loadDataError("Email and password could not be validated")
                    return
               
            }
            
                $("#preloader").fadeOut("slow");
            
        })
        .catch((error) => {
            //handleFormSubmissionError(error, this);
            console.log(error, "error")
            if(error.status == 400){
                this.setState({
                    loginMessage:"Your email and password could not be validated. Kindly double check and try again"
                })
            }
            else{
                this.loadDataError(error.statusText);
                this.setState({
                    loginMessage:error.statusText
                })
            }
            $("#preloader").fadeOut("slow");
                $("#invalidLogin").fadeIn();
        })
       
    };

    InitializeUser = () => {
        if(userLoggedIn()){
            loginUser(this.state.payLoad?.token, this.state.payLoad, true);   
        }
        else{
            //alert("f")
        }
    }
    componentDidMount() {
        window.scroll(0, 0);
        this.InitializeUser();
        setTimeout(() => {
            $("#preloader").fadeOut();

        }, 2000);
    }

    render() {
        require("antd/dist/antd.css");
        return (
            <>
            <Toaster position="top-center"/>
                <Header isHeader={this.state.headerTitle} topDetails={false}/>
                <div id="preloader">
                <div id="status">
                    <StageSpinner color="#FFB43A" backColor="#FFF" frontColor="#FFF" size={50} />
                </div>
            </div>
                <div style={{ marginBottom: "100px", paddingLeft: "10px", paddingRight: "10px" }}>
                    <div title="基础用法" padding="0" border="none" className="mt-6">
                        <div className="container-fluid" style={{ marginTop: "100px" }}>
                            <Tabs defaultActiveKey={this.state.activeKey ? this.state.activeKey : "login"} onChange={this.callback}>
                                <TabPane tab={<p style={{ fontSize: "16px", marginBottom: "0em" }}>Sign Up</p>} key="signup">
                                    <div className="">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label className="label-control">Email</label>
                                                    <input className="form-control" type="text" style={{ background: "#EDEDED", border: "none" }} name="email" onChange={this.handleInput}/>
                                                </div>
                                            </div>

                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label className="label-control">Password</label>
                                                    <input className="form-control" type="password" style={{ background: "#EDEDED", border: "none" }} name="pass" onChange={this.handleInput}/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label className="label-control">Confirm password</label>
                                                    <input className="form-control" type="password" style={{ background: "#EDEDED", border: "none" }} name="confirm_pass" onChange={this.handleInput}/>
                                                </div>
                                            </div>

                                            <div className="col-sm-12">
                                                <p style={{lineHeight:'18px', fontSize:'13px'}}>
                                                <small> By proceeding I accept the IngyGeneUS Health Terms & Conditions and confirm that I have read IndyGeneUS Health Privacy Policy</small>
                                                </p>
                                            </div>
                                            <div className="col-sm-12">
                                                {/* <Link to="/security_questions"> */}
                                                <button className="btn comp-btn" onClick={this.handleSignUp}>Sign Up</button>
                                                {/* </Link> */}
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab={<p style={{ fontSize: "16px", marginBottom: "0em" }}>Login</p>} key="login">
                                <div className="">
                                        <div className="row">
                                        <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label className="label-control">Email</label>
                                                    <input className="form-control" type="text" style={{ background: "#EDEDED", border: "none" }} name="email" onChange={this.handleInput}/>
                                                </div>
                                            </div>

                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label className="label-control">Password</label>
                                                    <input className="form-control" type="password" style={{ background: "#EDEDED", border: "none" }} name="pass" onChange={this.handleInput}/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <Link to="/"><small style={{color:'#8b959f'}}>Forgot Password?</small></Link>
                                                
                                            </div>
                                            <br/>
                                            <br/>
                                            <div className="col-sm-12">
                                                <p style={{lineHeight:'18px', fontSize:'13px'}}>
                                                <small> By proceeding I accept the IngyGeneUS Health Terms & Conditions and confirm that I have read IndyGeneUS Health Privacy Policy</small>
                                                </p>
                                            </div>
                                            <div className="col-sm-12">
                                                <button className="btn comp-btn" onClick={this.handleSignIn}>Login</button>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
