import React from "react";
import lineQuestion from "../assets/images/lineQuestion.png";
import line7 from "../assets/images/line7.png";
import $ from "jquery";
import { Fade } from "reactstrap";
import { enquireScreen } from "enquire-js";
import { Link } from "react-router-dom";
import Header from "../layouts/front_header";
import BottomPanel from "../layouts/bottom_panel";
import { userLoggedIn, logOutUser } from "../utils/auth";
import { stateKeys } from "../redux/actions";
import { reduxState } from "../utils/helpers";
import Endpoint from "../utils/endpoint";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import toast, { Toaster } from "react-hot-toast";

const contentStyle = {
    height: "50%",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
};
class UpdateSurveyEntries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            info: null,
            regionSelect: true,
            subCatId: reduxState(stateKeys.SUB_CATEGORY_ID, ""),
            payLoad: JSON.parse(localStorage.getItem(stateKeys.USER)),
            returnIds: [],
            checkedCatIds: []
        };
        this.controlCheck = this.controlCheck.bind(this);
    }
    surveyEntries = () => {
        Endpoint.getUserSurveyEntries(this.state.payLoad?.userId, this.state.subCatId)
            .then((res) => {
                //console.log(res.data);
                this.setState({ entries: res.data });
                var tempArray = [];

                setTimeout(() => {
                    res.data.forEach(function(item) {
                        tempArray.push(item.id);
                        //console.log(tempArray);

                    });
                    this.setState({returnIds: tempArray})
                }, 1500);
               
            })
            .catch((error) => {
                this.loadDataError(error, this);
                $("#preloader").fadeOut();
            });



            Endpoint.getUserEntryCategory(this.state.payLoad?.userId, this.state.subCatId)
            .then((res) => {
                console.log(res.data);
                this.setState({ entries: res.data });
                var tempArray = [];

                setTimeout(() => {
                    res.data.forEach(function(item) {
                        tempArray.push(item.id);
                        console.log(tempArray);

                    });
                    this.setState({checkedCatIds: tempArray})
                }, 1500);
               
            })
            .catch((error) => {
                this.loadDataError(error, this);
                $("#preloader").fadeOut();
            });
    }
    loadDataFromServer = () => {
        $("#preloader").fadeIn();
this.surveyEntries();
        Endpoint.getSurveyConditionalRendering(this.state.subCatId)
            .then((res) => {
                //console.log(res.data);
                this.setState({ logicLoad: res.data });
                //console.log(this.state.logicLoad, "stnnnnate");
                setTimeout(() => {
                    this.state.checkedCatIds.forEach(function(item) {
                        var isChk = $("#subCat" + item).is(":checked")
                        var tt = document.getElementById("subCat"+item);
                        //console.log(tt)
                        if(!isChk){
                            tt.setAttribute("checked", true)
                        }
                    });
                $("#preloader").fadeOut();

                }, 2000);

            })
            .catch((error) => {
                this.loadDataError(error, this);
                $("#preloader").fadeOut();
            });



            
    };
    showSubQuestions = (data) => {
        var f = $("#" + data).height();

        if (f > 45) {
            $("#" + data).height("45px");
            $("#sub__list" + "__" + data).hide();
        } else {
            $("#" + data).height("auto");
            $("#sub__list" + "__" + data).fadeIn("slow");
            this.state.returnIds.forEach(function(item) {
                var isChk = $("#optitem1" + item).is(":checked")
                var tt = document.getElementById("optitem1"+item);
                console.log(tt)
                if(!isChk){
                    tt.setAttribute("checked", true)
                }
            });
        }
    };

    SendSurveyResponse = () => {
        $("#preloader").fadeIn();
       
        Endpoint.postSurveyResponse(this.state.payLoad?.userId, this.state.subCatId, this.state.returnIds)
        .then((res) => {
            //console.log(res)
           window.location = "/survey_complete"
         $("#preloader").fadeOut("slow");
            
        })
        .catch((error) => {
            console.log(error, "error")
            this.loadDataError(error.statusText)
            $("#preloader").fadeOut("slow");
        })
    }
    controlCheck = (data, data__id) => {

        if (!$("#" + data).is(":visible") && $("#" + data__id).is(":checked")) {
            $("#" + data).fadeIn();
            if(!this.state.returnIds.includes(data)){
                this.state.returnIds.push(data);
            }
            //console.log(this.state.returnIds);
        } else if (!$("#" + data__id).is(":checked")) {
            var filterList = this.state.returnIds.filter((x) => x !== data);
            this.setState({ returnIds: filterList });
            $("#" + data).fadeOut();

            setTimeout(() => {
                //console.log(this.state.returnIds, "removed");
            }, 2000);
        } else {
            $("#" + data).fadeOut();
        }
    };

    resolveSelect = (id) => {
        let proposeArr = [];
        var check = proposeArr.includes(id);
        if (check) {
            var lists = proposeArr.filter((x) => {
                return x != id;
            });
            proposeArr = lists;
        } else {
            proposeArr.push(id);
            //console.log(`i just added ${id}`)
        }
    };
    InitializeUser = () => {
        if (!userLoggedIn()) {
            logOutUser("/user_validation");
        }
    };

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
    componentDidMount() {
        this.InitializeUser();
        this.loadDataFromServer();
        window.scroll(0, 0);
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
        // $(".checkbox-dropdown").click(function () {
        //     $(this).toggleClass("is-active");
        // });

        $(".checkbox-dropdown ul").click(function (e) {
            e.stopPropagation();
        });
    }
    render() {

        require("antd/dist/antd.css");
        const { isMobile } = this.state;
        return (
            <>
            <Toaster position="top-center"/>
                <div id="preloader">
                    <div id="status">
                        <StageSpinner color="#FFB43A" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div>
                {this.state.regionSelect ? (
                    <Fade>
                        <Header isHeader={"Survey Questions"} topDetails={true} />
                        <div className="conts" style={{ background: "#FFF", width: "100%", height: "100vh", textAlign: "center" }}>
                            <div className="container-fluid" style={{ paddingBottom: "100px" }}>
                                {this.state.logicLoad &&
                                    this.state.logicLoad.map((q, i) => {
                                        return (
                                            <div>
                                                <div className="row" style={{ marginTop: "100px" }}>
                                                    <div className="col-sm-12">
                                                        <p style={{ fontSize: "14px", fontWeight: "500" }}>
                                                            <b>{q.question}</b>
                                                        </p>
                                                    </div>

                                                    <img src={lineQuestion} style={{ width: "349px" }} />
                                                    <p style={{ textAlign: "center", width: "100%" }}>
                                                        <small style={{ textAlign: "center", color: "#298f63" }}>Click Next if none of the undelisted apply</small>
                                                    </p>
                                                </div>
                                                <br />
                                                <div className="">
                                                    {/* Item 1  Start*/}
                                                    {q.questionOptions &&
                                                        q.questionOptions.map((question__options) => {
                                                            return (
                                                                <>
                                                                    <div className="q-opt" id={"sub" + question__options.id} style={{ textAlign: "left", padding: "10px", overflowY: "scroll" }}>
                                                                        {/* Main category Start*/}
                                                                        <div className="" style={{ justifyContent: "space-between" }}>
                                                                            <div className="col-sm-3">
                                                                                <input className="" type="checkbox" id={"subCat" + question__options.id} onClick={() => this.showSubQuestions("sub" + question__options.id)} /> &nbsp; &nbsp;{" "}
                                                                                <small style={{ fontSize: "13px" }}>{question__options.name}</small>
                                                                                <div style={{ float: "right" }} onClick={() => this.showSubQuestions("sub" + question__options.id)}>
                                                                                    <i className="fa fa-angle-down" style={{ fontSize: "16px" }} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/* Main category End*/}

                                                                        {/* Sub category Start*/}

                                                                        <div id={"sub__list__" + "sub" + question__options.id} style={{ textAlign: "left", padding: "0px", marginTop: "30px", display: "none" }}>
                                                                            <img src={line7} style={{ width: "349px" }} />
                                                                            {question__options &&
                                                                                question__options.questionSubOptions.map((sub__options) => {
                                                                                    return (
                                                                                        <>
                                                                                            <div className="col-sm-12">
                                                                                                <input
                                                                                                    className=""
                                                                                                    type="checkbox"
                                                                                                    id={"optitem1" + sub__options.id}
                                                                                                    //checked={this.state.returnIds.includes(sub__options.id)}
                                                                                                    onClick={() => this.controlCheck(sub__options.id, "optitem1" + sub__options.id)}
                                                                                                />{" "}
                                                                                                &nbsp; &nbsp; <small style={{ fontSize: "12px" }}>{sub__options.name}</small>
                                                                                                {/* Family option Start*/}
                                                                                                <div className="checkbox-dropdown is-active" id={sub__options.id} style={{ display: "none" }}>
                                                                                                    <div className="checkbox-dropdown-list">
                                                                                                        <ul style={{ listStyleType: "none", padding: "3px", fontSize: "12px" }}>
                                                                                                            <li>
                                                                                                                <label>
                                                                                                                    <input type="checkbox" defaultValue="Vejle" name="city" /> &nbsp; Parent(Mother/Father)
                                                                                                                </label>
                                                                                                            </li>
                                                                                                            <li>
                                                                                                                <label>
                                                                                                                    <input type="checkbox" defaultValue="Vejle" name="city" /> &nbsp; Siblings(Sister/Brother)
                                                                                                                </label>
                                                                                                            </li>
                                                                                                            <li>
                                                                                                                <label>
                                                                                                                    <input type="checkbox" defaultValue="Vejle" name="city" /> &nbsp; Paternal Grandparent (Father's side)
                                                                                                                </label>
                                                                                                            </li>
                                                                                                            <li>
                                                                                                                <label>
                                                                                                                    <input type="checkbox" defaultValue="Vejle" name="city" /> &nbsp; Maternal Grandparent (Mother's side)
                                                                                                                </label>
                                                                                                            </li>
                                                                                                            <li>
                                                                                                                <label>
                                                                                                                    <input type="checkbox" defaultValue="Vejle" name="city" /> &nbsp; Paternal Cousin (Father's side)
                                                                                                                </label>
                                                                                                            </li>
                                                                                                            <li>
                                                                                                                <label>
                                                                                                                    <input type="checkbox" defaultValue="Vejle" name="city" /> &nbsp; Maternal Cousin (Mother's side)
                                                                                                                </label>
                                                                                                            </li>
                                                                                                            <li>
                                                                                                                <label>
                                                                                                                    <input type="checkbox" defaultValue="Vejle" name="city" /> &nbsp; Paternal Aunt/Uncle (Father's side)side)
                                                                                                                </label>
                                                                                                            </li>
                                                                                                            <li>
                                                                                                                <label>
                                                                                                                    <input type="checkbox" defaultValue="Vejle" name="city" /> &nbsp; Maternal Aunt/Uncle (Mother's side)
                                                                                                                </label>
                                                                                                            </li>
                                                                                                        </ul>
                                                                                                        <div style={{ float: "right", paddingRight: "10px", paddingBottom: "10px" }}>
                                                                                                            <button onClick={() => this.controlCheck(sub__options.id, "optitem1" + sub__options.id)}>Confirm</button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                {/* Family option END*/}
                                                                                            </div>
                                                                                            <br />
                                                                                        </>
                                                                                    );
                                                                                })}

                                                                            <br />
                                                                        </div>

                                                                        {/* Sub category End*/}
                                                                    </div>
                                                                    <br />
                                                                </>
                                                            );
                                                        })}

                                                    {/* Item 1  End*/}

                                                    <br />
                                                </div>
                                                <div style={{ width: "100%", paddingBottom: "100px" }}>
                                                    {/* <Link to="/survey_complete"> */}
                                                        <button className="btn comp-btn-outline" style={{ border: "2px solid #CD7F32", color: "#CD7F32", width: "150px", float: "right" }} onClick={this.SendSurveyResponse}>
                                                            Next &nbsp; <i className="fa fa-angle-right" />
                                                        </button>
                                                    {/* </Link> */}
                                                    <Link to="/profile">
                                                        <button style={{ border: "none", background: "none", color: "#000", width: "150px", float: "left" }}>
                                                            <i className="fa fa-angle-left" /> &nbsp; Back
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}

                                <BottomPanel />
                            </div>
                        </div>
                    </Fade>
                ) : null}
            </>
        );
    }
}

export default UpdateSurveyEntries;
