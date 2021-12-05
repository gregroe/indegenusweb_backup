import React from 'react';
import contactIcon from "../assets/images/cont.svg"
import contYellow from "../assets/images/bi_file-person (3).png"
import yellowQ from "../assets/images/qqq.png"
import ppleYellow from "../assets/images/ppY.png"

import question from "../assets/images/bi_patch-question.png"
import bulbYellow from "../assets/images/Vector.png"
import bulb from "../assets/images/bulb.svg"
import pple from "../assets/images/pple.svg"
import {Link} from "react-router-dom";



class BottomPanel extends React.Component {
  state={
isActive:'q1'
  }
    componentDidMount(){
      var navItems = document.querySelectorAll(".mobile-bottom-nav__item");
navItems.forEach(function(e, i) {
	e.addEventListener("click", function(e) {
		navItems.forEach(function(e2, i2) {
			e2.classList.remove("mobile-bottom-nav__item--active");
		})
		this.classList.add("mobile-bottom-nav__item--active");
	});
});




let extURL = document.URL;
var url = new URL(extURL);
var arraySplit = extURL.split("/");
var fuseIndex = arraySplit[arraySplit.length - 1]
console.log(fuseIndex, "fused");
        //var currentNode = document.getElementById(`${fuseIndex}`);
        // if(currentNode != null && currentNode != 'undefined'){
            this.setState({
              isActive:fuseIndex
            })
        //}
        

    }


    toggleMenu = (data) => {
      if(this.state.isActive == data){
        this.setState({isActive:"-"})

      }
      else{
        this.setState({isActive:data})
      }

    }
    MenuToggle = (id) => {


              // var currentNode = document.getElementById(`${id}`);
              // currentNode.className = "super-teller-side-active"
              this.setState({
                isActive:id
              })
      }
    
    render() {
      require("../assets/css/navBottom.css");
        return(
<nav className="mobile-bottom-nav">
        <div className="mobile-bottom-nav__item mobile-bottom-nav__item--active" style={{cursor:'pointer'}}  >
        <Link to="/profile" id="profile" onClick={() => this.MenuToggle('profile')}>	
          <div className="mobile-bottom-nav__item-content">
            {/* <i className="material-icons">home</i> */}
            {/* <img src={contactIcon} style={{width:'22px', height:'30px'}} className="foot__icons"/> */}

            {this.state.isActive == "profile" ? <img src={contYellow} style={{width:'30px', height:'30px'}} className="foot__icons"/> :  <img src={contactIcon} style={{width:'27px', height:'30px'}} className="foot__icons"/>}
            {/* one */}
          </div>		
          </Link>
        </div>
       
        <div className="mobile-bottom-nav__item" >	
        <Link to="/survey" id="survey" onClick={() => this.MenuToggle('survey')}>	
          <div className="mobile-bottom-nav__item-content">
            {/* <i className="material-icons">mail</i> */}
            {this.state.isActive == "survey" ? <img src={yellowQ} style={{width:'27px', height:'30px'}} className="foot__icons"/> : <img src={question} style={{width:'27px', height:'30px'}} className="foot__icons"/>}
  
            {/* two */}
          </div>
        </Link>

        </div>
        <div className="mobile-bottom-nav__item">
        <Link to="/healthReport" id="healthReport" onClick={() => this.MenuToggle('healthReport')}>
          <div className="mobile-bottom-nav__item-content">
            {/* <i className="material-icons">person</i> */}

            {this.state.isActive == "healthReport" ? <img src={bulbYellow} style={{width:'23px', height:'30px'}} className="foot__icons"/> : <img src={bulb} style={{width:'27px', height:'30px'}} className="foot__icons"/>}

            {/* three */}
          </div>		
          
        </Link>
        </div>
        
        <div className="mobile-bottom-nav__item" onClick={() => this.toggleMenu('q4')}>
          <div className="mobile-bottom-nav__item-content">

          {this.state.isActive == "q4" ? <img src={ppleYellow} style={{width:'27px', height:'25px'}} className="foot__icons"/> : <img src={pple} style={{width:'27px', height:'30px'}} className="foot__icons"/>}

            {/* <i className="material-icons">phone</i> */}
            {/* four */}
          </div>		
        </div>
      </nav>
        )
        

    }
}

export default BottomPanel;