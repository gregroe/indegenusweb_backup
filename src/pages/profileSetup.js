import React, { useState, useEffect, Component } from "react";
import { Collapse, Loading, Result } from "antd-mobile";
//import { div, sleep } from 'demos'
import BottomPanel from "../layouts/bottom_panel";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import $ from "jquery";
import Header from "../layouts/front_header";
import { Link } from "react-router-dom";
import { Tabs } from "antd";
import { Fade } from "reactstrap";
import { DatePicker, Space } from "antd";
import Endpoint from "../utils/endpoint";
import googleTranslateElementInit from "./translate";
import { stateKeys } from "../redux/actions";
import toast, { Toaster } from "react-hot-toast";

const { TabPane } = Tabs;

function onChange(date, dateString) {
    console.log(date, dateString);
}
// function googleTranslateElementInit() {
//     new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
//   }
export default class ProfileSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerTitle: "Sign Up",
            pageIindex: 1,
            payLoad: JSON.parse(localStorage.getItem(stateKeys.USER)),
            
        };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeGenderValue = this.onChangeGenderValue.bind(this);
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
    handleInput = (event) => {
        this.setState({ isVerified: null });
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };
    loadDataFromServer = () => {
        this.fetchUserProfile();
        this.fetchGender();
        this.fetchSexualOrientation();
        this.fetchAncestry();
        this.fetchResponseType();
        this.fetchNationality();
        //$("#preloader").fadeOut();
    };
    fetchUserProfile = () => {
        var split = this.state.payLoad?.fullName.split(" ");
        Endpoint.getUserProfile(this.state.payLoad?.userId)
            .then((res) => {
                this.setState({ userDetails: res.data, activeSexualOrientation:res.data?.sexualOrientationId, activeGender: res.data?.genderId, first_name: split[0], last_name : split[1]  });
        $("#preloader").fadeOut();

            })
            .catch((error) => {
                this.loadDataError(error, this);
            });
    };
    fetchGender = () => {
        Endpoint.getGender()
            .then((res) => {
                this.setState({ genderList: res.data });
            })
            .catch((error) => {
                this.loadDataError(error, this);
            });
    };
    fetchAncestry = () => {
        Endpoint.getAncestry()
            .then((res) => {
                this.setState({ ancestryList: res.data });
            })
            .catch((error) => {
                this.loadDataError(error, this);
            });
    };
    fetchNationality= () => {
        Endpoint.getNationality()
            .then((res) => {
                this.setState({ nationality: res.data });
            })
            .catch((error) => {
                this.loadDataError(error, this);
            });
    };
    fetchSexualOrientation = () => {
        Endpoint.getSexualOrientation()
            .then((res) => {
                this.setState({ sexOrientation: res.data });
            })
            .catch((error) => {
                this.loadDataError(error, this);
            });
    };
    fetchResponseType = () => {
        Endpoint.getResponseType()
            .then((res) => {
                this.setState({ responseType: res.data });
            })
            .catch((error) => {
                this.loadDataError(error, this);
            });
    };
    callback = (key) => {
        if (key == 1) {
            this.setState({ headerTitle: "Sign Up" });
        } else {
            this.setState({ headerTitle: "Login" });
        }
        console.log(key);
    };
    resolvePageIndex = (arg) => {
        if (arg == "add") {
            this.setState({ pageIindex: 2 });
            window.scroll(0, 0);
        }
        if (arg == "min") {
            this.setState({ pageIindex: 1 });
            window.scroll(0, 0);
        }
    };
    handleSexualOrientation = (data) => {
        console.log(data)
        // var navItems = document.querySelectorAll(".sex__or");
        // navItems.forEach(function (e, i) {
        //     e.setAttribute("checked", false);        
        // })
        // $("#"+data+"so").attr("checked", true);
    }
    onChangeValue(event) {
        console.log(event.target.value);
        this.setState({activeSexualOrientation:event.target.value})
      }
      onChangeGenderValue(event) {
        console.log(event.target.value);
        this.setState({activeGender:event.target.value})
      }
    
      executeUpdate = (e) => {
          e.preventDefault();
    $("#preloader").fadeIn();

        const payload = {
            "firstname": this.state.first_name,
            "lastname": this.state.last_name,
            "mobileNumber": this.state.mobile_number,
            //"email": "string",
            "dob": this.state.dob,
            "isTextMessageContact": true,
            "genderId": parseInt(this.state.activeGender),
            "ancestryId": parseInt(this.state?.ancestry_select),
            "nationalityId": parseInt(this.state.nationality_select),
            //"platformDiscoveryId": 0,
            "referalName": this.state.referal,
            "salivaBloodResponse": parseInt(this.state.saliva_blood),
            "clinicalTrialsResponse": parseInt(this.state.clinical_trials),
            "memberBlackCommunityResponse": parseInt(this.state.black_community),
            "armedForceVeteranResponse": parseInt(this.state.armed_forces),
            //"weight": "string",
            //"height": "string",
            "sexualOrientationId": parseInt(this.state.activeSexualOrientation)
          }

          Endpoint.updateUserProfile(payload, this.state.payLoad?.userId)
            .then((res) => {
                $("#preloader").fadeOut();

                this.loadDataSuccess("Profile update was successful");
                var ls = JSON.parse(localStorage.getItem(stateKeys.USER));
                console.log(ls, "ls")
                ls.fullName = this.state.first_name + " " + this.state.last_name;
                ls.isUpdatedProfile = true
               console.log(ls, "ls")

                localStorage.removeItem(stateKeys.USER)
                setTimeout(() => {
                localStorage.setItem(stateKeys.USER, JSON.stringify(ls));
                    
                }, 1000);

            })
            .catch((error) => {
                $("#preloader").fadeOut();
                this.loadDataError(error.statusText);

            });
      }
    componentDidMount() {
        

        window.scroll(0, 0);
        this.loadDataFromServer();
        // setTimeout(() => {
        //     $("#preloader").fadeOut();
        // }, 2000);
    }

    render() {
        const { userDetails, activeSexualOrientation, activeGender } = this.state;
        require("antd/dist/antd.css");
        return (
            <>
             <Toaster position="top-center"/>
                <Fade>
                    <Header isHeader={"Profile Setup"} topDetails={true} />
                    <div id="preloader">
                        <div id="status">
                            <StageSpinner color="#FFB43A" backColor="#FFF" frontColor="#FFF" size={50} />
                        </div>
                    </div>
                    <div style={{ marginBottom: "200px", paddingBottom: "120px", paddingLeft: "10px", paddingRight: "10px" }}>
                        <div title="" padding="0" border="none" className="mt-4">
                            <div className="container-fluid" style={{ marginTop: "85px" }}>
                                {this.state.pageIindex == 1 ? (
                                    <Fade>
                                        {" "}
                                        <div className="row" style={{ marginTop: "80px" }}>
                                            <div className="col-sm-12" style={{ border: "2px solid #C4C4C4", borderRadius: "15px", padding: "15px" }}>
                                                <div className="form-group">
                                                    <label className="label-control" style={{ fontWeight: "700", fontSize: "14px" }}>
                                                        First Name
                                                    </label>
                                                    <input className="form-control" type="text" style={{ background: "#EDEDED", border: "none" }} name="first_name" defaultValue={userDetails?.firstname} onChange={this.handleInput} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="label-control" style={{ fontWeight: "700", fontSize: "14px" }}>
                                                        Last Name
                                                    </label>
                                                    <input className="form-control" type="text" style={{ background: "#EDEDED", border: "none" }} name="last_name" defaultValue={userDetails?.lastname} onChange={this.handleInput} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="label-control" style={{ fontWeight: "700", fontSize: "14px" }}>
                                                        Date of Birth
                                                    </label>
                                                    {/* <DatePicker onChange={onChange}  className="col-sm-12" value={userDetails?.dob != null ? userDetails?.dob.substring(0, 10) : null}/> */}
                                                    <input className="form-control" type="date" name="dob" value={userDetails?.dob != null ? userDetails?.dob.substring(0, 10) : null} onChange={this.handleInput} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="label-control" style={{ fontWeight: "700", fontSize: "14px" }}>
                                                        Mobile Number
                                                    </label>
                                                    <input className="form-control" type="text" style={{ background: "#EDEDED", border: "none" }} name="mobile_number" defaultValue={userDetails?.mobileNumber} onChange={this.handleInput} />
                                                    {/* <p style={{marginTop:'10px', fontSize:'11px', fontWeight:'700'}}>
                                        <input className="" checked={userDetails?.isTextMessageContact ? true : false} type="checkbox" style={{ background: "#EDEDED", border: "none" }} name="isMobileContacted" onChange={this.handleInput}/> &nbsp; I want to be contacted via text message
                                        </p> */}
                                                </div>
                                            </div>

                                            <div className="col-sm-12" style={{ border: "2px solid #C4C4C4", borderRadius: "15px", padding: "15px", marginTop: "10px" }}>
                                                <div className="form-group">
                                                    <label className="label-control" style={{ fontWeight: "700", fontSize: "14px" }}>
                                                        Gender
                                                    </label>
                                                </div>
                                                {this.state.genderList &&
                                                    this.state.genderList.map((x) => {
                                                        return (
                                                            <>
                                                               <div className="form-group" style={{ marginTop: "-24px" }}>
                                                    <input className="" checked={this.state.activeGender == x.id} type="radio" style={{ background: "#EDEDED", border: "none" }} value={x.id != null ? x.id : null} name="gender"  onChange={this.onChangeGenderValue} />
                                                    <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                                        &nbsp; &nbsp; {x.name}
                                                    </label>
                                                </div>
                                                            </>
                                                        );
                                                    })}
                                               
                                                

                                                <div className="form-group">
                                                    <label className="label-control" style={{ fontWeight: "700", fontSize: "14px" }}>
                                                        Sexual Orientation
                                                    </label>
                                                </div>
                                                {this.state.sexOrientation &&
                                                    this.state.sexOrientation.map((x) => {
                                                        return (
                                                            <>
                                                                <div className="form-group" style={{ marginTop: "-24px" }}>
                                                                    <input className="sex__or" id={x.id+"so"} type="radio" style={{ background: "#EDEDED", border: "none" }} value={x.id} name="sexual_orientation" 
                                                                    checked={this.state.activeSexualOrientation == x.id}
                                                                    onChange={this.onChangeValue} />
                                                                    <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                                                        &nbsp; &nbsp; {x.name}
                                                                    </label>
                                                                </div>
                                                            </>
                                                        );
                                                    })}

                                               

                                                <div className="form-group">
                                                    <label className="label-control" style={{ fontWeight: "700", fontSize: "14px" }}>
                                                        Ancestry
                                                    </label>
                                                    <select className="form-control" onChange={this.handleInput} name="ancestry_select">
                                                        <option></option>
                                                        {this.state.ancestryList &&
                                                            this.state.ancestryList.map((x) => {
                                                                return (
                                                                    <>
                                                                        <option selected={x.id == userDetails?.ancestryId} value={x.id}>{x.name}</option>
                                                                    </>
                                                                );
                                                            })}
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label className="label-control" style={{ fontWeight: "700", fontSize: "14px" }}>
                                                        Who refered you?
                                                    </label>
                                                    <input className="form-control" type="text" defaultValue={userDetails?.referalName} style={{ background: "#EDEDED", border: "none" }} name="referal" onChange={this.handleInput} />
                                                </div>
                                            </div>

                                            <div style={{ width: "100%", paddingBottom: "100px", marginTop: "20px" }}>
                                                {/* <button style={{ border: "none", background: "none", color: "#000", width: "150px", float: "left", fontSize:'16px' }}>
                                                            <i className="fa fa-angle-left" /> &nbsp; Back
                                                        </button> */}

                                                {/* <Link to="/survey_complete"> */}
                                                <button onClick={() => this.resolvePageIndex("add")} style={{ border: "none", background: "none", color: "#CD7F32", width: "150px", float: "right", fontSize: "16px" }}>
                                                    Almost there &nbsp; <i className="fa fa-angle-right" />
                                                </button>
                                                {/* </Link> */}
                                            </div>
                                            <br />
                                            <br />
                                        </div>{" "}
                                    </Fade>
                                ) : null}

                                {this.state.pageIindex == 2 ? (
                                    <Fade>
                                        <div className="row" style={{ marginTop: "80px" }}>
                                            <div className="col-sm-10" style={{ border: "2px solid #C4C4C4", borderRadius: "15px", padding: "15px" }}>
                                                <div className="form-group">
                                                    <label className="label-control" style={{ fontWeight: "700", fontSize: "14px" }}>
                                                        Would you support the ByUsForAll movement by givingyour saliva and blood sample
                                                    </label>
                                                    <select className="form-control" onChange={this.handleInput} name="saliva_blood">
                                                        <option></option>
                                                        {this.state.responseType && this.state.responseType.map(x => {
                                                            return(
                                                                <>
                                                                <option selected={this.state.userDetails?.salivaBloodResponse == x.id} value={x.id}>{x.name}</option>
                                                                </>
                                                            )
                                                        })}
                                                        
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label className="label-control" style={{ fontWeight: "700", fontSize: "14px" }}>
                                                        Would you like to learn about clinical trials you may be eligible for?
                                                    </label>
                                                    <select className="form-control" onChange={this.handleInput} name="clinical_trials">
                                                    <option></option>
                                                        {this.state.responseType && this.state.responseType.map(x => {
                                                            return(
                                                                <>
                                                                <option selected={this.state.userDetails?.clinicalTrialsResponse == x.id} value={x.id}>{x.name}</option>
                                                                </>
                                                            )
                                                        })}
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label className="label-control" style={{ fontWeight: "700", fontSize: "14px" }}>
                                                        Are you a member of the Black, Indigenous people of colour community
                                                    </label>
                                                    <select className="form-control" onChange={this.handleInput} name="black_community">
                                                        <option></option>
                                                        {this.state.responseType && this.state.responseType.map(x => {
                                                            return(
                                                                <>
                                                                <option selected={this.state.userDetails?.memberBlackCommunityResponse == x.id} value={x.id}>{x.name}</option>
                                                                </>
                                                            )
                                                        })}
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label className="label-control" style={{ fontWeight: "700", fontSize: "14px" }}>
                                                        Are you a veteran of the Armed Forces
                                                    </label>
                                                    <select className="form-control" onChange={this.handleInput} name="armed_forces">
                                                        <option></option>
                                                        {this.state.responseType && this.state.responseType.map(x => {
                                                            return(
                                                                <>
                                                                <option selected={this.state.userDetails?.armedForceVeteranResponse == x.id} value={x.id}>{x.name}</option>
                                                                </>
                                                            )
                                                        })}
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label className="label-control" style={{ fontWeight: "700", fontSize: "14px" }}>
                                                        Current Location
                                                    </label>
                                                    {/* <select className="form-control">
                                                        <option></option>
                                                        <option>Allabama</option>
                                                    </select> */}
                                                    <select className="form-control" style={{ marginTop: "5px" }} onChange={this.handleInput} name="nationality_select">
                                                        <option></option>

                                                        {this.state.nationality && this.state.nationality.map(x => {
                                                            return(
                                                                <>
                                                                <option selected={this.state.userDetails?.nationalityId == x.id} value={x.id}>{x.name}</option>
                                                                </>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>

                                            <div style={{ width: "100%", paddingBottom: "100px", marginTop: "20px" }}>
                                                <button onClick={() => this.resolvePageIndex("min")} style={{ border: "none", background: "none", color: "#000", width: "150px", float: "left", fontSize: "16px" }}>
                                                    <i className="fa fa-angle-left" /> &nbsp; Back
                                                </button>

                                                {/* <Link to="/survey_complete"> */}
                                                <button onClick={(e) => this.executeUpdate(e)} style={{ border: "none", background: "none", color: "#CD7F32", width: "150px", float: "right", fontSize: "16px" }}>
                                                    Done &nbsp; <i className="fa fa-angle-right" />
                                                </button>
                                                {/* </Link> */}
                                            </div>
                                            <br />
                                            <br />
                                        </div>
                                    </Fade>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <BottomPanel />
                </Fade>
            </>
        );
    }
}
