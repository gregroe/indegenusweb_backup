import React from "react";
// import splashLogo from "../assets/images/indeLogo.png";
import { Link } from "react-router-dom";
import $ from "jquery";
import { Fade } from "reactstrap";
import { Carousel } from "antd";
import Header from "../layouts/front_header";
import surveyComp from "../assets/images/surveycomp.png";
import {StageSpinner } from "react-spinners-kit";

import { enquireScreen } from "enquire-js";


const contentStyle = {
    height: "50%",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
};
class SurveyComplete extends React.Component {
    state = {
        hasError: false,
        error: null,
        info: null,
        regionSelect:true
    };
    toggleOptionSelect = () => {
        if(this.state.regionSelect){
            this.setState({
                regionSelect:false,
                languageSelect:true
            })
        }
        else{
            this.setState({
                regionSelect:true,
                languageSelect:false
            })
        }
    }
    componentDidMount() {
setTimeout(() => {
    $("#preloader").fadeOut();
    
}, 2000);
        window.scroll(0, 0);
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }
    render() {
        require("antd/dist/antd.css");
        const{isMobile} = this.state;
        return (
            <>
            <div id="preloader">
                    <div id="status">
                        <StageSpinner color="#FFB43A" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div>
            <Header isHeader={"Survey"} topDetails={true}/>
                {this.state.regionSelect ? <Fade>
                    <div className="conts" style={{ background: "#FFF", width: "100%", height: "100vh", marginTop:'100px'}}>
                        <div className="container">
                        <h3 style={{color:'#8D8D8D', fontSize:'18px', fontWeight:'700'}}>Yay!</h3>
                        <h3 style={{fontSize:'19px', fontWeight:'700'}}>Survey Completed!</h3>
                        <br/>

                        <img src={surveyComp} style={{width:'100%'}}/>
                        <br/>
                        <br/>
                        <h3 style={{fontWeight:'700'}}>Your personalized Health Risk Report</h3>
                        <h3 style={{fontWeight:'700', color:'#8D8D8D'}}>Is Ready</h3>

                           <div className="text-center" style={{marginTop:'40px'}}>
                                    <Link to="/healthReport">
                                    <button style={{ width: "100%", height: "45px", fontWeight:'700', background: "#FFB43A", border: "none", borderRadius: "12px", fontSize: "16px", color:"#FFF" }} onClick={this.toggleOptionSelect}>Health Report &nbsp; <i className="fa fa-angle-right"/></button>
                                    </Link>
                                </div>
                    </div>
                    </div>
                </Fade> : null}



                {this.state.languageSelect ? <Fade>
                    <div className="conts" style={{ background: "#FFF", height: "100vh", textAlign: "center" }}>
                        <div className="container">
                       <div className="row" style={{marginTop:'100px', textAlign:'center'}}>
                           <div className="col-sm-10">
                               <div className="form-group text-center">
                                   <label className="label-control" style={{fontWeight:'500', fontSize:'16px'}}>Choose Your Language</label>
                                   <select className="form-control" style={{width:"70%", marginLeft:'auto', marginRight:'auto'}}>
                                       <option>English(US)</option>
                                       <option>Yoruba</option>
                                       <option>Espanyol</option>
                                       <option>Portugues</option>
                                       <option>Deutch</option>
                                   </select>
                                   </div>
                               </div>

                           </div>

                           <div className="text-center" style={{marginTop:'300px'}}>
                                    <Link to="/user_validation">
                                    <button style={{ width: "100%", height: "45px", background: "#FFB43A", border: "none", borderRadius: "12px", fontSize: "18px", fontWeight: "500", color:"#FFF" }}>Continue</button>
                                    </Link>
                                </div>
                    </div>
                    </div>
                </Fade> : null}
            </>
        );
    }
}

export default SurveyComplete;
