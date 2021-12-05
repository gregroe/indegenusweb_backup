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
import { DatePicker, Space } from 'antd';

const { TabPane } = Tabs;


function onChange(date, dateString) {
    console.log(date, dateString);
  }


export default class ProfileSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerTitle: "Sign Up",
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
            <Fade>
                <Header isHeader={"Profile Setup"} topDetails={true} />
                {/* <div id="preloader">
                <div id="status">
                    <StageSpinner color="#FFB43A" backColor="#FFF" frontColor="#FFF" size={50} />
                </div>
            </div> */}
                <div style={{ marginBottom: "100px", paddingBottom: "50px", paddingLeft: "10px", paddingRight: "10px" }}>
                    <div title="" padding="0" border="none" className="mt-4">
                        <div className="container-fluid" style={{ marginTop: "85px" }}>
                            <div className="row" style={{ marginTop: "80px" }}>
                                <div className="col-sm-12" style={{border:"2px solid #C4C4C4", borderRadius:'15px', padding:'15px'}}>
                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                             First Name
                                        </label>
                                        <input className="form-control" type="text" style={{ background: "#EDEDED", border: "none" }} name="first_name" onChange={this.handleInput}/>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                             Last Name
                                        </label>
                                        <input className="form-control" type="text" style={{ background: "#EDEDED", border: "none" }} name="last_name" onChange={this.handleInput}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                            Date of Birth
                                        </label>
                                        <DatePicker onChange={onChange}  className="col-sm-12"/>
                                    </div>

                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                             Mobile Number
                                        </label>
                                        <input className="form-control" type="text" style={{ background: "#EDEDED", border: "none" }} name="mobile_number" onChange={this.handleInput}/>
<p style={{marginTop:'10px', fontSize:'11px', fontWeight:'700'}}>
                                        <input className="" type="checkbox" style={{ background: "#EDEDED", border: "none" }} name="isMobileContacted" onChange={this.handleInput}/> &nbsp; I want to be contacted via text message
                                        </p>
                                    </div>
                                </div>

                               

                                <div className="col-sm-12" style={{border:"2px solid #C4C4C4", borderRadius:'15px', padding:'15px', marginTop:'10px'}}>
                                <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                             Gender
                                        </label>
                                    </div>
                                    <div className="form-group" style={{marginTop:'-24px'}}>
                                    <input className="" type="radio" style={{ background: "#EDEDED", border: "none" }} name="gender" onChange={this.handleInput}/>
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                        &nbsp; &nbsp;  Female
                                        </label>
                                       
                                    </div>
                                    <div className="form-group" style={{marginTop:'-24px'}}>
                                    <input className="" type="radio" style={{ background: "#EDEDED", border: "none" }} name="gender" onChange={this.handleInput}/>
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                        &nbsp; &nbsp;  Male
                                        </label>
                                       
                                    </div>

                                    <div className="form-group" style={{marginTop:'-24px'}}>
                                    <input className="" type="radio" style={{ background: "#EDEDED", border: "none" }} name="gender" onChange={this.handleInput}/>
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                        &nbsp; &nbsp;  Non-Binary
                                        </label>
                                        <br/>


                                        
                                       
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                             Sexual Orientation
                                        </label>
                                    </div>
                                    <div className="form-group" style={{marginTop:'-24px'}}>
                                    <input className="" type="radio" style={{ background: "#EDEDED", border: "none" }} name="gender" onChange={this.handleInput}/>
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                        &nbsp; &nbsp;  Female
                                        </label>
                                       
                                    </div>
                                    <div className="form-group" style={{marginTop:'-24px'}}>
                                    <input className="" type="radio" style={{ background: "#EDEDED", border: "none" }} name="gender" onChange={this.handleInput}/>
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                        &nbsp; &nbsp;  Male
                                        </label>
                                       
                                    </div>

                                    <div className="form-group" style={{marginTop:'-24px'}}>
                                    <input className="" type="radio" style={{ background: "#EDEDED", border: "none" }} name="gender" onChange={this.handleInput}/>
                                        <label className="label-control" style={{ fontWeight: "500", fontSize: "14px" }}>
                                        &nbsp; &nbsp;  Non-Binary
                                        </label>
                                        <br/>


                                        
                                       
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
                <BottomPanel />
                </Fade>
            </>
        );
    }
}
