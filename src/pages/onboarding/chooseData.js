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


const contentStyle = {
    height: "50%",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
};
class ChooseData extends React.Component {
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
                {this.state.regionSelect ? <Fade>
                    <div className="conts" style={{ background: "#FFF", width: "100%", height: "100vh", textAlign: "center" }}>
                        <div className="container-fluid">
                       <div className="row" style={{marginTop:'100px'}}>
                           <div className="col-sm-12">
                               <div className="form-group">
                                   <label className="label-control" style={{fontWeight:'500', fontSize:'16px'}}>Choose Your Region</label>
                                   <select className="form-control">
                                       <option></option>
                                       <option>Africa</option>
                                       <option>Asia</option>
                                       <option>Carribean</option>
                                       <option>Europe</option>
                                       <option>India</option>
                                       <option>North America</option>
                                       <option>South America</option>
                                       <option>United Kingdom</option>
                                   </select>
                                   </div>
                               </div>

                           </div>

                           <div className="text-center" style={{marginTop:'300px'}}>
                                    {/* <Link to="/choose_data"> */}
                                    <button style={{ width: "100%", height: "45px", background: "#FFB43A", border: "none", borderRadius: "12px", fontSize: "18px", fontWeight: "500", color:"#FFF" }} onClick={this.toggleOptionSelect}>Continue</button>
                                    {/* </Link> */}
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
                                    <Link to="/choose_data">
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

export default ChooseData;
