import React, { Component } from "react";
import BottomPanel from "../layouts/bottom_panel";
import $ from "jquery";
import Header from "../layouts/front_header";
import profBanner from "../assets/images/profBanner.png";
import profileRound from "../assets/images/profileRound.png";
import { Fade } from "reactstrap";
import { stateKeys } from "../redux/actions";
import { userLoggedIn, logOutUser } from "../utils/auth";
import { Link } from "react-router-dom";
import { StageSpinner } from "react-spinners-kit";
import Endpoint from "../utils/endpoint";
import toast, { Toaster } from "react-hot-toast";
import { Drawer, Button } from "antd";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payLoad: JSON.parse(localStorage.getItem(stateKeys.USER)),
            complianceArr: [],
        };
    }
    InitializeUser = () => {
        if (!userLoggedIn()) {
            logOutUser("/user_validation");
        }
    };
    loadDataSuccess = (msg) =>
        toast.success(msg, {
            style: {
                border: "1px solid #04AA6D",
                padding: "16px",
                background: "#04AA6D",
                color: "#fff",
                borderRadius: "3rem",
            },
            iconTheme: {
                primary: "#04AA6D",
                secondary: "#fff",
            },
        });
    fetchUserComplianceStatus = () => {
        $("#preloader").fadeIn();
        let tempArr = [];
        Endpoint.getUserCompliances(this.state.payLoad?.userId)
            .then((res) => {
                console.log(res.data);

                this.setState({ complianceList: res.data });
                if (res.data != null && res.data.length > 0) {
                    res.data.forEach(function (item) {
                        tempArr.push(item.id);
                    });
                }
                setTimeout(() => {
                    this.setState({ complianceArr: tempArr });

                    console.log(this.state.complianceArr);
                    $("#preloader").fadeOut();
                }, 2000);
                console.log(this.state.complianceList, "compl");
            })
            .catch((error) => {
                //this.loadDataError(error, this);
                console.log(error, "err");
            });
    };

    userAgreementRequest = (data) => {
        
        $("#preloader").fadeIn();
        this.setState({gdprDrawer:false, consentDrawer:false})
        Endpoint.postUserAgreement(this.state.payLoad?.userId, data)
            .then((res) => {
                this.fetchUserComplianceStatus();
                //$("#preloader").fadeOut();
                this.loadDataSuccess("Agreement successfully saved!");
            })
            .catch((error) => {
                $("#preloader").fadeOut();
                console.log(error, "err");
            });
    };
    toggleClose = () => {
        this.setState({ gdprDrawer: false, consentDrawer:false });
    };
    componentDidMount() {
        $("#gdpr__more").click(function () {
            var f = $("#gdpr__cont").height();
            console.log(f);
            if (f < 200) {
                $("#gdpr__cont").height("400px");
            } else {
                $("#gdpr__cont").height("158px");
            }
        });

        setTimeout(() => {
            var html = document.getElementsByTagName("html")[0].getAttribute("lang");
            console.log(html);
            this.setState({ currentLang: html });
        }, 2000);
        console.log(this.state.payLoad);
        window.scroll(0, 0);
        this.InitializeUser();
        this.fetchUserComplianceStatus();
        // setTimeout(() => {
        //     $("#preloader").fadeOut();
        // }, 3000);
    }

    render() {
        require("antd/dist/antd.css");

        return (
            <>
                <Toaster position="top-center" />

                <Drawer
                    footer={
                        this.state.complianceArr.length > 0 && this.state.complianceArr.includes(1) ? null : <div className="container-fluid">
                            <a onClick={() => this.userAgreementRequest(1)} style={{ color: "#CD7F32" }}>Agree</a>
                        </div>
                    }
                    title={
                        <p className="text-white" style={{ fontWeight: "700" }}>
                            GDPR Compliance
                        </p>
                    }
                    placement="right"
                    onClose={this.toggleClose}
                    visible={this.state.gdprDrawer}
                >
                    <div className="container-fluid">
                        <p className="text-white" style={{ fontSize: "10px" }}>
                            At IndyGeneUS Health we make your privacy a central part of our Services. This privacy statement explains our collection, use, and disclosure of Personal Information. This privacy statement applies to IndyGeneUS
                            Health Group, Inc. and to our controlled affiliates and subsidiaries (“IndyGeneUS”, “we”, “our”, or “us”).References to our “Services” in this statement include our websites, apps, software, and related services.
                            This statement applies to our products that display or reference this statement. This statement however does not apply to any third-party products that display or reference a different privacy statement.
                            <br />
                            <br />
                            <br />
                            PERSONAL DATA WE COLLECT
                            <br />
                            <br />
                            The personal data we collect depends on how you interact with us, the products you use, and the choices you make. We collect information about you from different sources and in various ways when you use our
                            products, including information you provide directly, information collected automatically, third-party data sources, and data we infer or generate from other data. Information you provide directly. We collect
                            personal data you provide to us. For example, we collect your contact information including name, email address, phone number, username, and password when you create an account or purchase a Service from us. If
                            you make a purchase, we also collect credit card numbers and other payment information through our payment processor.
                            <br />
                            <br />
                            CONTACTING US
                            <br />
                            You may also provide us other information when interacting with us by email, phone call, via IndyGeneUS Support or through other methods of communication. This may include feedback and customer support inquiries.
                            This also includes your preferences for receiving communications about our activities, events, and publications.
                            <br />
                            <br />
                            SURVEYS
                            <br />
                            We also collect voluntary information through surveys. Basic information surveys may collect personal traits and characteristics such as sex, age, ethnicity, weight, and height. This may also include behavioral
                            and social information such as your occupation, commute, diet, alcohol consumption and tobacco use, fitness and exercise and sleep behavior. Health surveys may collect more detailed information about your present
                            or past physical or mental health, medical conditions, diseases and symptoms and other medical information.
                        </p>
                    </div>
                </Drawer>


                <Drawer
                    footer={
                        this.state.complianceArr.length > 0 && this.state.complianceArr.includes(2) ? null : <div className="container-fluid">
                            <a onClick={() => this.userAgreementRequest(2)} style={{ color: "#CD7F32" }}>Agree</a>
                        </div>
                    }
                    title={
                         <p className="text-white" style={{ fontWeight: "700" }}>
                            Consent
                        </p>
                    }
                    placement="right"
                    onClose={this.toggleClose}
                    visible={this.state.consentDrawer}
                >
                    <div className="container-fluid">
                        <p className="text-white" style={{ fontSize: "10px" }}>
                       
Part of IndyGeneUS Health Group, Inc.’s mission is to help Black and Brown people, women, Veterans, and underserved communities benefit from the human genome. Research is an important part of that mission. Here are some highlights of our Research Consent Document. Please read the entire consent document below before making your decision to participate.
<br/>
<br/>
Key Information:
<br/>
<br/>
• The purpose of IndyGeneUS Health Group, Inc. Research is to make new discoveries about genetics and other factors behind diseases and traits.
<br/>
<br/>
• If you agree to this consent, you allow IndyGeneUS Health Group, Inc. researchers to use certain information including:
<br/>
<br/>

•        Your Genetic Information
<br/>

•        Your electronic medical records 
<br/>

•        Your responses to research surveys
 to study a wide variety of research topics.
<br/>
<br/>

• To protect your privacy, IndyGeneUS Health Group, Inc. conducts research with information that has been stripped of your name and contact information and combined with similar information from many research participants.
<br/>
<br/>

• Some IndyGeneUS Health Group, Inc. Research is conducted in collaboration with third parties, such as non-profit organizations, pharmaceutical companies, or academic institutions. We may share summaries of research results, which do not identify any particular individual, with qualified research collaborators and in scientific publications.
<br/>
<br/>

• It is unlikely that you will directly benefit from your participation, though you and others may benefit in the future from discoveries that lead to healthcare advances or improvements to IndyGeneUS Health Group, Inc.’s product or services. There is a very small risk that someone could get access to your Personal Information (information that can be used to identify you) without your permission in the event of a privacy breach.
<br/>
<br/>

• Taking part in this research is completely voluntary, and you can change your consent choice at any time without affecting your access to the IndyGeneUS Health Group, Inc's. product or services.
                            <br />
                            <br />
                            <br />
                           
                        </p>
                    </div>
                </Drawer>
                <Fade>
                    <Header isHeader={"Profile"} topDetails={true} />
                    <div id="preloader">
                        <div id="status">
                            <StageSpinner color="#FFB43A" backColor="#FFF" frontColor="#FFF" size={50} />
                        </div>
                    </div>

                    <div style={{ marginBottom: "100px", paddingBottom: "100px" }}>
                        <div title="基础用法" padding="0" border="none" className="mt-6">
                            <div class="user-banner -large" style={this.state.currentLang != "en" ? { backgroundImage: `url(${profBanner})`, marginTop: "-42px" } : { backgroundImage: `url(${profBanner})`, marginTop: "-3px" }}></div>

                            <div style={{ textAlign: "center", width: "100%", marginTop: "-71px" }}>
                                <div class="user-avatar -large" style={{ backgroundImage: `url(${profileRound})`, textAlign: "center" }}></div>
                                <p style={{ fontWeight: "700" }}>{this.state.payLoad?.isUpdatedProfile ? this.state.payLoad?.fullName : this.state.payLoad?.userName}</p>
                                <Link to="/profile_setup">
                                    <p style={{ fontWeight: "500", marginTop: "-15px", color: "#CD7F32" }}>
                                        Update Profile &nbsp; <i className="fa fa-angle-right" />
                                    </p>
                                </Link>
                            </div>
                            <div className="container-fluid" style={{ marginTop: "10px", paddingLeft: "15px", paddingRight: "15px" }}>
                                <div style={{ width: "100%", minHeight: "158px", background: "#EEEEEE", border: "1px solid #C4C4C4", borderRadius: "9px", padding: "10px" }} id="gdpr__cont">
                                    <p style={{ fontSize: "12px", fontWeight: "700", textAlign: "center" }}>GDPR Compliance</p>
                                    <p style={{ fontSize: "11px" }}>
                                        At IndyGeneUS Health we make your privacy a central part of our Services. This privacy statement explains our collection, use, and disclosure of Personal Information. This privacy statement...
                                    </p>
                                    <div className="col-sm-12" style={{ paddingBottom: "20px", marginTop: "20px" }}>
                                        <a className="text-black" onClick={() => this.setState({ gdprDrawer: true })} style={{ float: "left", fontSize: "11px" }}>
                                            More...
                                        </a>
                                        {this.state.complianceArr.length > 0 && this.state.complianceArr.includes(1) ? (
                                            <a className="" style={{ float: "right", color: "green", fontSize: "11px" }}>
                                                Agreed <i className="fa fa-check-circle" />
                                            </a>
                                        ) : (
                                            <a className="" onClick={() => this.userAgreementRequest(1)} style={{ float: "right", color: "#CD7F32", fontSize: "11px" }}>
                                                Agree
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div style={{ width: "100%", minHeight: "158px", background: "#EEEEEE", border: "1px solid #C4C4C4", borderRadius: "9px", padding: "10px", marginTop: "10px" }}>
                                    <p style={{ fontSize: "12px", fontWeight: "700", textAlign: "center" }}>Consent</p>
                                    <p style={{ fontSize: "11px" }}>This is the informed consent that you complete if you are interested in sharing your clinical/EHR data and participating in research that can help your community...</p>
                                    <div className="col-sm-12" style={{ paddingBottom: "20px", marginTop: "20px" }}>
                                        <a className="text-black" onClick={() => this.setState({ consentDrawer: true })} style={{ float: "left", fontSize: "11px" }}>
                                            More...
                                        </a>
                                        {this.state.complianceArr.length > 0 && this.state.complianceArr.includes(2) ? (
                                            <a className="" style={{ float: "right", color: "green", fontSize: "11px" }}>
                                                Agreed <i className="fa fa-check-circle" />
                                            </a>
                                        ) : (
                                            <a className="" onClick={() => this.userAgreementRequest(2)} style={{ float: "right", color: "#CD7F32", fontSize: "11px" }}>
                                                Agree
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <BottomPanel />
                </Fade>
            </>
        );
    }
}
