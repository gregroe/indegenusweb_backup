import React from "react";
import splashLogo from "../assets/images/indeLogo.png";
import bottomBorder from "../assets/images/bottomBorder.png";
import { Link } from "react-router-dom";
import {stateKeys} from "../redux/actions"
import {userLoggedIn, loginUser} from "../utils/auth"
import { reduxState, setReduxState } from "../utils/helpers";
import { width } from "dom-helpers";
class Splash extends React.Component {
    state = {
        hasError: false,
        error: null,
        info: null,
        payLoad: JSON.parse(localStorage.getItem(stateKeys.USER)),

    };
    setGlobalState = (data) => {
        // data.preventDefault();
        setReduxState(data, stateKeys.ROUTE_KEY);
    }
    InitializeUser = () => {
        if(userLoggedIn()){
            loginUser(this.state.payLoad?.token, this.state.payLoad, true);   
        }
        else{
            //alert("f")
        }
    }
    componentDidMount(){
        this.InitializeUser();
    }
    render() {
        return (
            <>
                <div style={{ background: "#0B0B0B", width: "100%", height: "100vh", textAlign: "center", float:'left' }} className="splasho">
               <div style={{width:'100%', marginTop:'100px'}}>
               <Link id="" to="user_validation" style={{color:'#CB9748'}} onClick={() => this.setGlobalState('login')}>
                        
                        Already a member? Login here
                    </Link>
               </div>
                    <img src={splashLogo} style={{ width: "181px", marginTop: "100px" }} />

                    <Link id="get__started1" to="welcome" onClick={() => this.setGlobalState('signup')}>
                        
                        Get Started
                    </Link>


                    
             

                    {/* <div style={{ marginTop: "200px" }}>
                    <Link id="" to={{ pathname: "/user_validation", state:{activeTabKey:'2'} }} style={{color: '#CB9748', fontWeight:'700', fontSize:'15px'}}>
                       
                       Login
                      
                   </Link>
                    </div> */}
                </div>
            </>
        );
    }
}

export default Splash;
