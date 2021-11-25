import React, { Component } from "react";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import LargeScreen from "./pages/screenCheck";
import Splash from "./pages/splash";
import Survey from "./pages/survey_options";
import ScreenOne from "./pages/onboarding/screen1";
import ChooseData from "./pages/onboarding/chooseData";
import { enquireScreen } from "enquire-js";

export class App extends Component {
    state = {};
    componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }
    render() {
        const { isMobile } = this.state;
        //const birds = useSelector(state => state.birds);

        return (
            <>
                {!isMobile ? (
                    <LargeScreen />
                ) : (
                    <Router>
                        <Routes>
                            <Route path={"/"} element={<Splash />} exact />
                            <Route path={"/welcome"} element={<ScreenOne />} exact />
                            <Route path={"/choose_data"} element={<ChooseData />} exact />
                            <Route path={"survey"} element={<Survey />} />
                        </Routes>
                    </Router>
                )}
            </>
        );
    }
}

export default App;
