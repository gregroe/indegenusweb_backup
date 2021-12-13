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
import SurveyQuestions from "./pages/surveyQuestions";
import SecurityQuestions from "./pages/securityQuestions";
import Profile from "./pages/profile";
import SurveyComplete from "./pages/surveyComplete";
import HealthReport from "./pages/healthReport";
import ProfileSetup from "./pages/profileSetup";
import TestLang from "./pages/testLang";
import Login from "./pages/login";
import UpdateLanguage from "./pages/updateLanguage";
import UpdateSurveyEntries from "./pages/updateSurveyEntries";
import { enquireScreen } from "enquire-js";
import { stateKeys } from "./redux/actions";
//import {AuthRoute} from "./components/Authenticator/Authenticate"

export class App extends Component {
    state = {
        payLoad: JSON.parse(localStorage.getItem(stateKeys.USER))
    };
    
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
                            <Route path={"surveyQuestions"} element={<SurveyQuestions />} />
                            <Route path={"user_validation"} element={<Login />} />
                            <Route path={"security_questions"} element={<SecurityQuestions />} />
                            <Route path={"profile"} element={<Profile />} />
                            <Route path={"survey_complete"} element={<SurveyComplete />} />
                            <Route path={"healthReport"} element={<HealthReport />} />
                            <Route path={"profile_setup"} element={<ProfileSetup />} />
                            <Route path={"test_lang"} element={<TestLang />} />
                            <Route path={"update_language"} element={<UpdateLanguage />} />
                            <Route path={"updateSurveyEntries"} element={<UpdateSurveyEntries />} />
                        </Routes>
                    </Router>
                )}
            </>
        );
    }
}

export default App;
