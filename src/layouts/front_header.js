import React from "react";
import contactIcon from "../assets/images/cont.svg";
import contYellow from "../assets/images/bi_file-person (3).png";
import yellowQ from "../assets/images/qqq.png";
import icon_menu from "../assets/images/icon_menu.png";
import icon_notification from "../assets/images/icon_notification.png";
import { Drawer, Button, Space, Radio, List, Typography, Divider } from 'antd';

import question from "../assets/images/bi_patch-question.png";
import bulbYellow from "../assets/images/Vector.png";
import bulb from "../assets/images/bulb.svg";
import pple from "../assets/images/pple.svg";
import { Link } from "react-router-dom";
import {LoginOutlined} from '@ant-design/icons';
import profileRound from "../assets/images/profileRound.png";
import chatLeft from "../assets/images/chatLeft.png";
import bi_bookmark from "../assets/images/bi_bookmark.png";
import bi_info from "../assets/images/ant-design_info-circle-outlined.png";
import settingsIcon from "../assets/images/carbon_settings.png";
import logOutIcon from "../assets/images/feather_log-out.png";
import { logOutUser } from "../utils/auth";
import { stateKeys } from "../redux/actions";


const listStyle = {
    color: '#ffffffcf',
    cursor:'pointer',
    fontWeight:'700'
}
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: "q1",
            payLoad: JSON.parse(localStorage.getItem(stateKeys.USER)),
        };
    }

    componentDidMount() {
        var navItems = document.querySelectorAll(".mobile-bottom-nav__item");
        navItems.forEach(function (e, i) {
            e.addEventListener("click", function (e) {
                navItems.forEach(function (e2, i2) {
                    e2.classList.remove("mobile-bottom-nav__item--active");
                });
                this.classList.add("mobile-bottom-nav__item--active");
            });
        });
    }

    toggleMenu = (data) => {
        if (this.state.isActive == data) {
            this.setState({ isActive: "-" });
        } else {
            this.setState({ isActive: data });
        }
    };
    showDrawer = (e) => {
        this.setState({visible:true});
        e.preventDefault();
          
      };
     
      onClose = () => {
        this.setState({visible:false});
      };
    render() {
        require("antd/dist/antd.css");
        require("../assets/css/navBottom.css");
        return (
            <>

<Drawer
        title={false}
        placement={'left'}
        width={300}
        onClose={this.onClose}
        closable={false}
        visible={this.state.visible}
        // extra={
        //   <Space>
        //     <Button onClick={this.onClose}>Cancel</Button>
        //     <Button type="primary" onClick={this.onClose}>
        //       OK
        //     </Button>
        //   </Space>
        // }
      >
          <div className="manrope-text">
         
          <div style={{ textAlign: "center", width: "100%", marginTop: "41px" }}>
                            <div class="user-avatar -large" style={{ backgroundImage: `url(${profileRound})`, textAlign: "center" }}></div>
                            <p style={{ fontWeight: "700", color:"#FFC743", fontSize:'14px' }}>{this.state.payLoad?.isUpdatedProfile ? this.state.payLoad?.fullName : this.state.payLoad?.userName}</p>
                            <p style={{ fontWeight: "500", marginTop: "-15px", color: "#CD7F32" }}>
                                Edit Profile &nbsp; <i className="fa fa-angle-right" />
                            </p>
                        </div>


                        <div style={{ textAlign: "left", width: "100%", marginTop: "41px" }}>
                            <p style={{ fontWeight: "500", color:"#FFC743" }}><img src={chatLeft} style={{width:'24px'}}/>&nbsp; Messages</p>
                            <p style={{ fontWeight: "500", color:"#FFC743" }}><img src={bi_bookmark} style={{width:'24px'}}/>&nbsp; Saved Items</p>
                            <p style={{ fontWeight: "500", color:"#FFC743" }}><img src={bi_info} style={{width:'24px'}}/>&nbsp; About Us</p>
                            <a href="update_language">
                            <p style={{ fontWeight: "500", color:"#FFC743" }}><img src={settingsIcon} style={{width:'24px'}}/>&nbsp; Language Settings</p>
                            </a>
                            
                        </div>

                        <div style={{ textAlign: "left", width: "100%", marginTop: "41px", position:'fixed', bottom:'31px' }}>
                            <p style={{ fontWeight: "500", color:"#FFC743" }} onClick={() => logOutUser('/user_validation')}><img src={logOutIcon} style={{width:'24px'}}/></p>                           
                        </div>
        
              </div>

              
       
      </Drawer>
            <nav className="mobile-top-nav" style={!this.props.topDetails ? { justifyContent: "center", padding: "20px" } : { justifyContent: "space-between", padding: "20px" }}>
                {!this.props.topDetails ? null : <img src={icon_menu} style={{ width: "30px" }} onClick={this.showDrawer}/>}
                {!this.props.topDetails ? <h3 style={{ color: "#FFF", textAlign:'center'}}>{this.props.isHeader}</h3> : <h3 style={{ color: "#FFF" }}>{this.props.isHeader}</h3>} 
                {!this.props.topDetails ? null : <img src={icon_notification} style={{ width: "30px" }} />}
            </nav>
            </>


        );
    }
}

export default Header;
