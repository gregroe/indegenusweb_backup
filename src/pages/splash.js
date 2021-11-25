import React from "react";
import splashLogo from "../assets/images/indeLogo.png";
import bottomBorder from "../assets/images/bottomBorder.png";
import { Link } from "react-router-dom";
class Splash extends React.Component {
    state = {
        hasError: false,
        error: null,
        info: null,
    };

    render() {
        return (
            <>
                <div style={{ background: "#0B0B0B", width: "100%", height: "100vh", textAlign: "center" }} className="splasho">
                    <img src={splashLogo} style={{ width: "181px", marginTop: "200px" }} />

                    <Link id="get__started1" to="welcome">
                        Get Started
                    </Link>

                    <div style={{ marginTop: "200px" }}>
                        <img id="get__started" src={bottomBorder} style={{ width: "134px", height: "5px" }} />
                    </div>
                </div>
            </>
        );
    }
}

export default Splash;
