import React, {Component } from "react";
import BottomPanel from "../layouts/bottom_panel";
import $ from "jquery";
import Header from "../layouts/front_header";
import profBanner from "../assets/images/profBanner.png";
import profileRound from "../assets/images/profileRound.png";
import {Fade} from "reactstrap"
import { stateKeys } from "../redux/actions";
import { userLoggedIn, logOutUser } from "../utils/auth";
import { Link } from "react-router-dom";
import {StageSpinner } from "react-spinners-kit";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payLoad: JSON.parse(localStorage.getItem(stateKeys.USER)),
        };
    }
    InitializeUser = () => {
        if(!userLoggedIn()){
            logOutUser("/user_validation") 
        }
       
    }
    componentDidMount() {
       
            
setTimeout(() => {
    var html = document.getElementsByTagName("html")[0].getAttribute("lang");
            console.log(html)
            this.setState({currentLang: html})
}, 2000);
        console.log(this.state.payLoad)
        window.scroll(0, 0);
this.InitializeUser();
        setTimeout(() => {
            $("#preloader").fadeOut();
        }, 3000);
    }

    render() {
        return (
            <>
            <Fade>
                <Header isHeader={"Profile"} topDetails={true} />
                <div id="preloader">
                <div id="status">
                    <StageSpinner color="#FFB43A" backColor="#FFF" frontColor="#FFF" size={50} />
                </div>
            </div>

                <div style={{ marginBottom: "100px", paddingBottom: "50px" }}>
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
                            <div style={{ width: "100%", height: "148px", background: "#EEEEEE", border: "1px solid #C4C4C4", borderRadius: "9px", padding: "10px" }}>
                                <p style={{ fontSize: "12px", fontWeight:'700', textAlign:'center' }}>GDPR Compliance</p>
                                <p style={{ fontSize: "11px" }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget id semper at vitae lacus, ultrices urna lacinia erat. In viverra pharetra aliquet nunc suscipit imperdiet enim, quis magna. Purus arcu
                                    elementum.
                                </p>
                            </div> 



                            <div style={{ width: "100%", height: "148px", background: "#EEEEEE", border: "1px solid #C4C4C4", borderRadius: "9px", padding: "10px", marginTop:'10px' }}>
                                <p style={{ fontSize: "12px", fontWeight:'700', textAlign:'center' }}>Some other Compliance</p>
                                <p style={{ fontSize: "11px" }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget id semper at vitae lacus, ultrices urna lacinia erat. In viverra pharetra aliquet nunc suscipit imperdiet enim, quis magna. Purus arcu
                                    elementum.
                                </p>
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
