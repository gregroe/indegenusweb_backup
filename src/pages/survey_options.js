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

export default class SurveyOptions extends Component {
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

    loadDataFromServer = () => {
        $("#preloader").fadeIn();

        Endpoint.getSurveyCategories(this.state.payLoad?.userId)
            .then((res) => {
                console.log(res.data);
                this.setState({ categories: res.data });
                console.log(this.state.categories, "state");

                $("#preloader").fadeOut();
            })
            .catch((error) => {
                this.loadDataError(error, this);
                $("#preloader").fadeOut();
            });
    };
setGlobalState = (data) => {
    // data.preventDefault();
    setReduxState(data, stateKeys.SUB_CATEGORY_ID);
}

getGLobalState = () => {
    reduxState('sub__id', 'k')
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
        return (
            <>
                <Header isHeader={"Survey"} topDetails={true} />
                <div id="preloader">
                    <div id="status">
                        <StageSpinner color="#FFB43A" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div>
                <div style={{ marginBottom: "100px", paddingLeft: "10px", paddingRight: "10px" }}>
                    <div title="基础用法" padding="0" border="none" className="mt-6">
                        <div className="container-fluid">
                            <h3 style={{ fontSize: "23px" }}>Get a personalized health risk report</h3>
                            <p style={{ fontSize: "13px", marginBottom: "40px" }}>By answering these survey questions</p>
                        </div>

                        <Collapse>
                            {/* <Collapse.Panel
                                key="1"
                                title={
                                    <div>
                                        <h3 className="text-white">Personal Health</h3>
                                        
                                    </div>
                                }
                                className="personal-health"
                            >
                                <b className="text-black" style={{ color: "#584f4f" }}>
                                    Basics
                                </b>
                                <p className="l-16">
                                    <small>This survey collects background information like where you were born, how you identify and how you heard about us.</small>
                                </p>
                                <br />
                                <p>
                                    <small>2 minutes</small>
                                </p>
                                <br />
                                <button className="btn comp-btn-outline">
                                    <i className="fa fa-check-circle" /> &nbsp; Completed
                                </button>
                            </Collapse.Panel> */}
                            {this.state.categories &&
                                this.state.categories.map((cat, i) => {
                                    return (
                                        <Collapse.Panel key={cat.surveyCategoryId} title={<h3 className="text-white">{cat.surveyCategoryName}</h3>} className={cat.className}>
                                            {cat.subCategoryList &&
                                                cat.subCategoryList.map((x) => {
                                                    return (
                                                        <>
                                                            <div>
                                                                <b className="text-black" style={{ color: "#584f4f", fontSize: "16px" }}>
                                                                    {x.subCategoryName}
                                                                </b>
                                                                <p className="l-16">
                                                                    <small>{x.summary}</small>
                                                                </p>
                                                                <br />
                                                                <p>
                                                                    <small>{cat.timeAllowed}</small>
                                                                </p>
                                                                <br />
                                                                {x.hasQuestions && x.isConducted ? (
                                                                    <Link  to="/updateSurveyEntries" state={{ from: 'occupation' }}>
                                                                        <button className="btn comp-btn-outline" onClick={() => this.setGlobalState(x.subCategoryId)}>
                                                                        <i className="fa fa-edit" /> &nbsp; Update entries
                                                                        </button>
                                                                    </Link>
                                                                ) : x.hasQuestions && !x.isConducted ? (
                                                                    <Link 
                                                                    to="/surveyQuestions"
                                                                    state={{ from: 'occupation' }}
                                                                    
                                                                    >
                                                                        <button onClick={() => this.setGlobalState(x.subCategoryId)} className="btn comp-btn">Start</button>
                                                                    </Link>
                                                                ) : (
                                                                    <button disabled className="btn comp-btn">
                                                                        Start
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <br />
                                                            <br />
                                                        </>
                                                    );
                                                })}

                                            {/* <div>
                                    <b className="text-black" style={{ color: "#584f4f", fontSize: "16px" }}>
                                        Consent EHR
                                    </b>
                                    <p className="l-16">
                                        <small>This is the informed consent that you complete if you are interested in sharing your clinical/EHR data and participating in research that can help your community.</small>
                                    </p>
                                    <br />
                                    <p>
                                        <small>2 minutes</small>
                                    </p>
                                    <br />
                                    <button className="btn comp-btn">Agree</button>
                                    <br />
                                    <br />
                                </div> */}
                                        </Collapse.Panel>
                                    );
                                })}

                            {/* <Collapse.Panel key="3" title={<h3 className="text-white">#fortheculture</h3>} className="forthe">
                                <Loading/>
                            </Collapse.Panel> */}
                        </Collapse>
                    </div>

                    {/* <div title="手风琴模式" padding="0" border="none">
                        <Collapse accordion>
                            <Collapse.Panel key="1" title={<h3 className="text-white">Covid19</h3>} className="covid">
                                Cancer....
                            </Collapse.Panel>
                            <Collapse.Panel key="2" title={<h3 className="text-white">Genetics</h3>} className="genetics">
                                Cancer....
                            </Collapse.Panel>
                        </Collapse>
                    </div> */}
                </div>
                <BottomPanel />
            </>
        );
    }
}
