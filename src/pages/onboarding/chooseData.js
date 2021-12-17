import React from "react";
// import splashLogo from "../assets/images/indeLogo.png";
import { Link } from "react-router-dom";
import $ from "jquery";
import { Fade } from "reactstrap";
import { enquireScreen } from "enquire-js";
import googleTranslateElementInit from "../translate";
import Endpoint from "../../utils/endpoint";
import { stateKeys } from "../../redux/actions";
import { setReduxState } from "../../utils/helpers";

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
    handleInput = (event) => {
        this.setState({ isVerified: null });
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        
        setReduxState(value, stateKeys.REGION);

        this.setState({
            [name]: value,
        });
    };
    toggleOptionSelect = () => {
        if(this.state.regionSelect){
            this.setState({
                regionSelect:false,
                languageSelect:true
            })
            $("#google_translate_element").css("visibility", "visible")
        }
        else{
            this.setState({
                regionSelect:true,
                languageSelect:false
            })
        }
    }
    fetchRegions = () => {
        Endpoint.getRegions()
            .then((res) => {
                this.setState({ regionList: res.data });
            })
            .catch((error) => {
                this.loadDataError(error, this);
            });
    };
    setGlobalState = (data) => {
        // data.preventDefault();
        setReduxState(data, stateKeys.ROUTE_KEY);
    }
    componentDidMount() {
        this.fetchRegions();
        setTimeout(() => {
            var html = document.getElementsByTagName("html")[0].getAttribute("lang");
            console.log(html);
        }, 2000);
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }
    render() {
        <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
        require("antd/dist/antd.css");
        const{isMobile} = this.state;
        return (
            <>
            <div style={{overflowY:"hidden"}}>
                {this.state.regionSelect ? <Fade>
                    <div className="conts" style={{ background: "#FFF", width: "100%", height: "87vh", textAlign: "center", overflow:'hidden' }}>
                         <div className="container-fluid">
                       <div className="row" style={{marginTop:'100px'}}>
                           <div className="col-sm-12">
                               <div className="form-group">
                                   <label className="label-control" style={{fontWeight:'500', fontSize:'16px'}}>Choose Your Region</label>
                                   <select className="form-control" onChange={this.handleInput} name="region_select">
                                                        <option></option>
                                                        {this.state.regionList &&
                                                            this.state.regionList.map((x) => {
                                                                return (
                                                                    <>
                                                                        <option value={x.id}>
                                                                            {x.name}
                                                                        </option>
                                                                    </>
                                                                );
                                                            })}
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

                <div id="google_translate_element" style={{visibility:'hidden'}}></div>


                {this.state.languageSelect ? <Fade>
                    <div className="conts" style={{ background: "#FFF", height: "100vh", textAlign: "center" }}>
                        <div className="container">
                       <div className="row" style={{marginTop:'50px', textAlign:'center'}}>
                           <div className="col-sm-10">
                               <div className="form-group text-center">
                                   <label className="label-control" style={{fontWeight:'500', fontSize:'14px'}}>Choose Language</label>
                                   <p><small>Click continue to proceed with English as your default language</small></p>
                                   {/* <div id="google_translate_element"></div> */}
                                   {/* <select className="form-control" style={{width:"70%", marginLeft:'auto', marginRight:'auto'}}>
                                       <option>English(US)</option>
                                       <option>Yoruba</option>
                                       <option>Espanyol</option>
                                       <option>Portugues</option>
                                       <option>Deutch</option>
                                   </select> */}
                                   </div>
                               </div>

                           </div>

                           <div className="text-center" style={{marginTop:'200px'}}>
                                    <Link to="/user_validation" onClick={() => this.setGlobalState('signup')}>
                                    <button style={{ width: "100%", height: "45px", background: "#FFB43A", border: "none", borderRadius: "12px", fontSize: "18px", fontWeight: "500", color:"#FFF" }}>Continue</button>
                                    </Link>
                                </div>
                    </div>
                    </div>
                </Fade> : null}
                </div>
            </>
        );
    }
}

export default ChooseData;
