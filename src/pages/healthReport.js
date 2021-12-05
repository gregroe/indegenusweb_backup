import React, { useState, useEffect, Component } from "react";
import { Collapse, Loading, Result } from "antd-mobile";
//import { div, sleep } from 'demos'
import BottomPanel from "../layouts/bottom_panel";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import $ from "jquery";
import Header from "../layouts/front_header";
import { Link } from "react-router-dom";
import { userLoggedIn, logOutUser } from "../utils/auth";
import Endpoint from "../utils/endpoint";
import { stateKeys } from "../redux/actions";
import { reduxState, setReduxState } from "../utils/helpers";
import result from "../assets/images/Results.png";
import result1 from "../assets/images/Results0.png";
import result2 from "../assets/images/Results1.png";
import fort from "../assets/images/fort.png";
import genet from "../assets/images/genet.png";
import { Empty } from 'antd';
import { categoryId } from "../utils/enums";
export default class HealthReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payLoad: JSON.parse(localStorage.getItem(stateKeys.USER)),
        };
    }

    InitializeUser = () => {
        if (!userLoggedIn()) {
            logOutUser("/user_validation");
        }
    };

    getReportFolder = () => {
        $("#preloader").fadeIn();
        Endpoint.getRiskReportCategory(this.state.payLoad?.userId)
            .then((res) => {
                console.log(res.data);
                this.setState({ categoryFolder: res.data });
                console.log(this.state.categoryFolder, "state");

                $("#preloader").fadeOut();
            })
            .catch((error) => {
                this.loadDataError(error, this);
                $("#preloader").fadeOut();
            });
    }
    loadDataFromServer = () => {

        this.getReportFolder();
    };
    setGlobalState = (data) => {
        // data.preventDefault();
        setReduxState(data, stateKeys.SUB_CATEGORY_ID);
    };

    getGLobalState = () => {
        reduxState("sub__id", "k");
    };
    showRelatedLink = (data) => {


        $("#preloader").fadeIn();
        Endpoint.getReportLinksByCategory(this.state.payLoad?.userId, data)
            .then((res) => {
                console.log(res.data);
                this.setState({ riskLinks: res.data });
                console.log(this.state.riskLinks, "state");
                $("#preloader").fadeOut();
                $("#related__links").toggle('slow');


            })
            .catch((error) => {
                this.loadDataError(error, this);
                $("#preloader").fadeOut();
            });

    }
    componentDidMount() {
        window.scroll(0, 0);
        this.loadDataFromServer();
        this.InitializeUser();
        //   setTimeout(() => {
        //     $("#preloader").fadeOut()

        //   }, 2000)
    }

    render() {
        require("antd/dist/antd.css");

        return (
            <>
                <Header isHeader={"Health Report"} topDetails={true} />
                <div id="preloader">
                    <div id="status">
                        <StageSpinner color="#FFB43A" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div>
                <div style={{ marginBottom: "0px", paddingLeft: "10px", paddingRight: "10px" }}>
                    <div title="-" padding="0" border="none" className="mt-6">
                        <div className="container-fluid">
                            <h3 style={{ fontSize: "23px", fontWeight: "700" }}>Personalized Health Risk Assessment</h3>
                            <p style={{ fontSize: "14px", marginBottom: "40px", color: "#8D8D8D", fontWeight: "700" }}>Based on your survey responses, you may be at increased risk for:</p>
                        </div>
                    </div>
                </div>

                <div class="scrolling-wrapper-flexbox">
                    {this.state.categoryFolder && this.state.categoryFolder.map(x => {
                        return(
                            <>
                                {x.catrgoryId == categoryId.FAMILY_HEALTH ?  <div class="card" id={categoryId.FAMILY_HEALTH} onClick={() => this.showRelatedLink(x.catrgoryId)}>
                        <img src={result2} />
                    </div> : null}


                    {x.catrgoryId == categoryId.PERSONAL_HEALTH ?  <div class="card" onClick={() => this.showRelatedLink(x.categoryId)} id={categoryId.PERSONAL_HEALTH}> 
                        <img src={result} />
                    </div> : null}

                    {x.catrgoryId == categoryId.COVID19 ?  <div class="card" id={categoryId.COVID19} onClick={() => this.showRelatedLink(x.categoryId)}>
                        <img src={result1} />
                    </div> : null}


                    {x.catrgoryId == categoryId.FORTHE ?  <div class="card" id={categoryId.FORTHE} onClick={() => this.showRelatedLink(x.categoryId)}>
                        <img src={fort} />
                    </div> : null}

                    {x.catrgoryId == categoryId.GENETICS ?  <div class="card" id={categoryId.GENETICS} onClick={() => this.showRelatedLink(x.categoryId)}>
                        <img src={genet} />
                    </div> : null}
                            </>
                        )
                    })}
                    {/* <div class="card" onClick={this.showRelatedLink} id={categoryId.PERSONAL_HEALTH}> 
                        <img src={result} />
                    </div>
                    <div class="card" id={categoryId.COVID19}>
                        <img src={result1} />
                    </div>
                    <div class="card" id={categoryId.FAMILY_HEALTH}>
                        <img src={result2} />
                    </div>
                    <div class="card" id={categoryId.FORTHE}>
                        <img src={fort} />
                    </div>
                    <div class="card" id={categoryId.GENETICS}>
                        <img src={genet} />
                    </div> */}
                </div>
                <div class="scrolling-wrapper-flexbox" id="related__links" style={{display:'none'}}>
                    <div className="container-fluid">
                        <h3 style={{fontSize:'700'}}>Related links</h3>
                        {this.state.riskLinks && this.state.riskLinks.map((x, i) =>{
                            return(
                                <p><a href={x.link} target="_blank">Link {i+1}</a></p>

                            )
                        })}
                  
                    <hr/>
                    </div>
                </div>
                <div class="scrolling-wrapper-flexbox">
                    <div className="container-fluid">
                    <video width="320" height="240" controls>
                        <source src="https://www.mayoclinic.org/diseases-conditions/heart-failure/symptoms-causes/syc-20373142" type="video/mp4"/>
                            </video>

                    {/* <Empty description={"Nothing to display at this time"}/> */}
                    {/* <h4>Nothing to display at this time</h4> */}

                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>

                
                <BottomPanel />
            </>
        );
    }
}
