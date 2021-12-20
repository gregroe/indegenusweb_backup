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
import { Drawer, Button } from "antd";


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
    toggleClose = () => {
        this.setState({ termsCondition: false, privacyPolicy:false });
    };
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
            <Drawer
            width={345}
                    // footer={
                    //    <div className="container-fluid">
                    //         <a onClick={this.toggleClose} style={{ color: "#CD7F32" }}>Close</a>
                    //     </div>
                    // }
                    title={
                        <p className="text-white" style={{ fontWeight: "700" }}>
                            Terms and conditions
                        </p>
                    }
                    placement="right"
                    onClose={this.toggleClose}
                    visible={this.state.termsCondition}
                >
                     <div className="container-fluid">
                        <p className="text-white" style={{ fontSize: "10px" }}>
                        At IndyGeneUS Health we make your privacy a central part of our Services.
This privacy statement explains our collection, use, and disclosure of Personal Information.
This privacy statement applies to IndyGeneUS Health Group, Inc. and to our controlled
affiliates and subsidiaries (“IndyGeneUS”, “we”, “our”, or “us”). References to our “Services”
in this statement include our websites, apps, software, and related services. This statement
applies to our products that display or reference this statement.
                            <br />
                            <br />
                            This statement however does not apply to any third-party products that display or reference
a different privacy statement.
                            <br />
                            <br />
                            PERSONAL DATA WE COLLECT <br/>

The personal data we collect depends on how you interact with us, the products you use,
and the choices you make.
                            <br />
                            <br />
                            We collect information about you from different sources and in various ways when you use
our products, including information you provide directly, information collected automatically,
third-party data sources, and data we infer or generate from other data.
                            <br />
                            <br />
                            Information you provide directly. We collect personal data you provide to us. For example,
we collect your contact information including name, email address, phone number,
username, and password when you create an account or purchase a Service from us. If you
make a purchase, we also collect credit card numbers and other payment information
through our payment processor.
                            <br />
                            <br />
                            CONTACTING US
                            <br />

You may also provide us other information when interacting with us by email, phone call, via
IndyGeneUS Support or through other methods of communication. This may include
feedback and customer support inquiries. This also includes your preferences for receiving
communications about our activities, events, and publications.

                            <br />
                            <br />
SURVEYS
<br />

We also collect voluntary information through surveys. Basic information surveys may
collect personal traits and characteristics such as sex, age, ethnicity, weight, and height.
This may also include behavioral and social information such as your occupation, commute,
diet, alcohol consumption and tobacco use, fitness and exercise and sleep behavior. Health
surveys may collect more detailed information about your present or past physical or mental
health, medical conditions, diseases and symptoms and other medical information.
                            <br />
                            <br />
                            GENETIC INFORMATION 
                            <br />

Through your use of the services, you may submit a saliva and/or blood sample. DNA is
then extracted from your blood and/or saliva at one of our partner labs and is converted to a
machine-readable code (“DNA Data”) which is used to provide our Gene Sequencing
Services. DNA test kit code, year of birth, and sex may also be collected for activation
purposes.
                            <br />
                            <br />
                            <b><u>INFORMATION COLLECTED AUTOMATICALLY</u></b> When you use our products, some information is
collected automatically. For example, when you visit our websites, our web servers
automatically log your device&#39;s operating system, Internet Protocol (IP) address, access
times, browser type and language, the website you visited before our site, and your activity
on our websites. Depending on your device and app settings, you use our apps or online
services. As further described in the Cookies Notice, our websites and online services store
and retrieve data using cookies set on your device.
                            <br />
                            <br />
                            We also log information about your use of the Services, including your interactions with the
Services and histories of your transactions and the parties with whom you’ve shared your
genetic information.
                            <br />
                            <br />

                            INFORMATION CREATED OR GENERATED <br/>
                            We infer new information from other data we collect,
including using automated means to generate information about your likely preferences or
other characteristics. For example, Google Analytics aids us in inferring your city, state, and
country location based on your IP address. We also generate your DNA sequence from
your saliva sample with assistance from our lab partners.
                            <br />
                            <br />
                            When you are asked to provide Personal Information, you may decline. But if you choose
not to provide or allow information that is necessary for certain products or features, those
products or features may not be available or function correctly.
                            <br />
                            <br />

                            <br />
                            <br />

                            <br />
                            <br />

                            <br />
                            <br />

                            <br />
                            <br />
                        </p>
                    </div>
                </Drawer>


                <Drawer
            width={345}
                    // footer={
                    //    <div className="container-fluid">
                    //         <a onClick={this.toggleClose} style={{ color: "#CD7F32" }}>Close</a>
                    //     </div>
                    // }
                    title={
                        <p className="text-white" style={{ fontWeight: "700" }}>
                            Privacy Policy
                        </p>
                    }
                    placement="right"
                    onClose={this.toggleClose}
                    visible={this.state.privacyPolicy}
                >
                    <div className="container-fluid">
                        <p className="text-white" style={{ fontSize: "10px" }}>
                        IndyGeneUS participates in and has certified its compliance with both the EU-U.S. and
Swiss-U.S. Privacy Shield Frameworks as set forth by the U.S. Department of Commerce
regarding the collection, use and retention of personal data transferred to the United States
from the European Union (EU), European Economic Area (EEA), and Switzerland. To learn
more about the Privacy Shield program, and to view our certification, please visit the U.S.
Department of Commerce’s Privacy Shield List.
                            <br />
                            <br />
                            <br />
                            We are committed to subjecting all personal data that we receive from the EU member
countries, the EEA, and Switzerland to the Privacy Shield Framework Principles in the
European Union Data Protection Rights section above. If third-party agents process
personal data on our behalf in a manner inconsistent with the principles of either Privacy
Shield Framework, they remain liable unless they prove we are responsible for the event
giving rise to the damage. If there is any conflict between the terms of this Privacy
Statement and the Privacy Shield Principles, the Privacy Shield Principles shall govern.
                            <br />
                            <br />
                            <br />
                            In regard to personal data received or transferred pursuant to the Privacy Shield
Frameworks, IndyGeneUS is subject to the regulatory enforcement powers of the U.S.
Federal Trade Commission (FTC). Further, in certain situations we may be required to
disclose personal data in response to lawful requests by public authorities, including to meet
national security or law enforcement requirement.
                            <br />
                            <br />
                            <br />
                            If you have a question or complaint related to our participation in the EU-U.S. or Swiss-U.S.
Privacy Shield, please contact us as indicated at the bottom of this privacy statement. For
any complaints related to the Privacy Shield frameworks that cannot be resolved with us
directly, you may refer the matter to your local Data Protection Authority or the Swiss
Federal Data Protection and Information Commissioner (FDPIC) if you are located in
Switzerland. Finally, under limited circumstances and after other available dispute resolution
mechanisms have been exhausted, binding arbitration is available for EU and Swiss
individuals to address certain residual complaints not resolved by other means.
                            <br />
                            <br />
                            

                        </p>
                    </div>
                </Drawer>
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
                                                <small> By proceeding I accept the IndyGeneUS Health <span style={{color:'blue'}} onClick={() => this.setState({termsCondition:true})}>Terms & Conditions</span> and confirm that I have read IndyGeneUS Health <span onClick={() => this.setState({privacyPolicy:true})} style={{color:'blue'}}>Privacy Policy</span></small>
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
                                                <small> By proceeding I accept the IndyGeneUS Health <span style={{color:'blue'}} onClick={() => this.setState({termsCondition:true})}>Terms & Conditions</span> and confirm that I have read IndyGeneUS Health <span onClick={() => this.setState({privacyPolicy:true})} style={{color:'blue'}}>Privacy Policy</span></small>
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
