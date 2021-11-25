import React from "react";
// import splashLogo from "../assets/images/indeLogo.png";
import { Link } from "react-router-dom";
import $ from "jquery";
import { Fade } from "reactstrap";
import { Carousel } from "antd";
import girlOne from "../../assets/images/test7.png";
import girlOneBig from "../../assets/images/test6.png";
import hands from "../../assets/images/hands7.png";
import patient from "../../assets/images/patient7.png";
import { enquireScreen } from "enquire-js";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";



const contentStyle = {
    height: "50%",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
};
class ScreenOne extends React.Component {
    state = {
        hasError: false,
        error: null,
        info: null,
    };
    componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });

        setTimeout(() => {
            $("#preloader").delay(450).fadeOut("slow");
        }, 4000);
    }
    render() {
        require("antd/dist/antd.css");
        const{isMobile} = this.state;

        // window.addEventListener("load", (event) => {
        //     var image = document.querySelector("img");
        //     var isLoaded = image.complete && image.naturalHeight !== 0;
        //     if (isLoaded) {
        //         setTimeout(() => {
        //             $("#preloader").delay(450).fadeOut("slow");
        //         }, 1000);
        //     }
        // });
        return (
            <>
             <div id="preloader">
                    <div id="status">
                        {/* <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} /> */}
                        <StageSpinner color="#FFB43A" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div>
                <Fade>
                    <div className="conts" style={{ background: "#0B0B0B", width: "100%", height: "100vh", textAlign: "center" }}>
                        <div style={{ width: "100%" }}>
                            <Carousel autoplay effect="fade" dots={false}>
                                <div>
                                    <div style={contentStyle}>
                                        <img src={girlOne} style={{ width: "100%" }} className="imm" />
                                    </div>
                                </div>
                                <div>
                                    <div style={contentStyle}>
                                        <img src={hands} style={{ width: "100%" }} className="imm" />
                                    </div>
                                </div>
                                <div>
                                    <div style={contentStyle}>
                                        <img src={patient} style={{ width: "100%" }} className="imm" />
                                    </div>
                                </div>
                            </Carousel>
                            <div style={{ background: "#0B0B0B", height: "300px", textAlign: "left", padding: "14px" }}>
                                <h3 style={{ color: "#939393", fontSize: "18px", fontWeight: "500" }}>Get</h3>
                                <h4 style={{ color: "#CDCDCD", fontWeight: "500", fontSize: "20px", marginTop: "-12px" }}>A Free</h4>
                                <h4 style={{ color: "#FFF", fontWeight: "500", fontSize: "20px", marginTop: "-12px" }}>Health Risk Assesment</h4>

                                <div className="text-center" style={{marginTop:'40px'}}>
                                    <Link to="/choose_data">
                                    <button style={{ width: "100%", height: "45px", background: "#FFB43A", border: "none", borderRadius: "12px", fontSize: "18px", fontWeight: "500", color:"#000" }}>Start</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </>
        );
    }
}

export default ScreenOne;
