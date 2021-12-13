import React from "react";
// import splashLogo from "../assets/images/indeLogo.png";
import { Link } from "react-router-dom";
import $ from "jquery";
import { Fade } from "reactstrap";
import { Carousel } from "antd";
import { enquireScreen } from "enquire-js";
import BottomPanel from "../layouts/bottom_panel";


const contentStyle = {
    height: "50%",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
};
class UpdateLanguage extends React.Component {
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
            $("#google_translate_element").css("visibility", "visible")
        }
        else{
            this.setState({
                regionSelect:true,
                languageSelect:false
            })
        }
    }
    componentDidMount() {
        // googleTranslateElementInit()
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
               
                <div id="google_translate_element"></div>


                 <Fade>
                    <div className="conts" style={{ background: "#FFF", height: "100vh", textAlign: "center" }}>
                        <div className="container">
                       <div className="row" style={{marginTop:'50px', textAlign:'center'}}>
                           <div className="col-sm-10">
                               <div className="form-group text-center">
                                   <label className="label-control" style={{fontWeight:'500', fontSize:'16px'}}>Update Your Language</label>
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
                                    <Link to="/user_validation">
                                    <button style={{ width: "100%", height: "45px", background: "#FFB43A", border: "none", borderRadius: "12px", fontSize: "18px", fontWeight: "500", color:"#FFF" }}>Update</button>
                                    </Link>
                                </div>
                    </div>
                    </div>
                </Fade>
                </div>

                <BottomPanel />

            </>
        );
    }
}

export default UpdateLanguage;
