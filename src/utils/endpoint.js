import axios from 'axios'
import {notify, objectToHTTPQuery} from "./helpers";
import {getUserToken, logOutUser, rememberRoute} from "./auth";

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'token': localStorage.getItem('token'),
};

let fileHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    'token': localStorage.getItem('token'),
};

const Endpoint = {
    init: () => {
        // accountId = process.env.REACT_APP_ACCOUNT_ID;
        let token = getUserToken();
        if (token)
            axios.defaults.headers.common['Authorization'] = token;
        axios.defaults.baseURL = "http://10.211.55.3/api";
        //axios.defaults.baseURL = "https://indybackend.studyaccess.net/api";
         
        // Intercept 401 HTTP Error code in API
        axios.interceptors.response.use(response => response, (error) => {
            if (!error.response) {
                //No response
                // notify("Seems like you're offline, check internet connection")
            } else if (error.response && error.response.status === 401 && error.response.config.url !== '/user_validation') {
                rememberRoute();
                logOutUser();
            }

            return Promise.reject(error.response);
        });
    },
    

    // ---Auth--- //
    login: (data) => {
        return axios.post(`/User/Authenticate`, data, headers)
    },
    signup: (data) => {
        return axios.post(`/User/RegisterUser`, data, headers)
    },

    getSurveyCategories: (data) => {
        return axios.get(`/SurveyCategory/SurveyCategories?userId=${data}`, headers)
    },
    getSubCategoryByCategoryId: (data) => {
        return axios.get(`/SurveyCategory/FetchSubCategoryByCategory?categoryId=${data}`, headers)
    },
    getSurveyConditionalRendering: (data) => {
        return axios.get(`/SurveyCategory/SurveyExerciseConditionalLogic?subCategoryId=${data}`, headers)
    },

    getReportLinksByCategory: (userId, categoryId) => {
        return axios.get(`/SurveyCategory/UserReporyByCategory?surveyCategoryId=${categoryId}&userId=${userId}`, headers)
    },

    getRiskReportCategory: (userId) => {
        return axios.get(`SurveyCategory/UserReportCategory?userId=${userId}`, headers)
    },

    postSurveyResponse: (userId, subCategoryId, data) => {
        return axios.post(`SurveyCategory/PostSurveyResponse?userId=${userId}&surveySubCategoryId=${subCategoryId}`,data, headers)
    },  
};

export default Endpoint