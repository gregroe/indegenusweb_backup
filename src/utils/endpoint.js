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
        //axios.defaults.baseURL = "http://10.211.55.3/api";        
        //axios.defaults.baseURL = "https://indybackend.studyaccess.net/api";
        axios.defaults.baseURL = "https://indegenus-backend.azurewebsites.net/api";
        
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

    getUserProfile: (userId) => {
        return axios.get(`User/StampUser?userId=${userId}`, headers)
    },
    getSexualOrientation: () => {
        return axios.get(`SurveyCategory/GetSexualOrientation`, headers)
    },
    getGender: () => {
        return axios.get(`SurveyCategory/GetGender`, headers)
    },
    getSecurityQuestions: () => {
        return axios.get(`SurveyCategory/GetASecurityQuestions`, headers)
    },
    getAncestry: () => {
        return axios.get(`SurveyCategory/GetAncestry`, headers)
    },
    getResponseType: () => {
        return axios.get(`SurveyCategory/GetResponseType`, headers)
    },
    getNationality: () => {
        return axios.get(`SurveyCategory/GetNationality`, headers)
    },
    updateUserProfile: (data, userId) => {
        return axios.post(`User/StampUseProfile?userId=${userId}`, data, headers);
    },
    getUserSurveyEntries: (userId, subCategoryId) => {
        return axios.get(`SurveyCategory/GetUserSurveyEntries?surveySubCategoryId=${subCategoryId}&userId=${userId}`, headers)
    },

    postSecurityQuestions: (userId, data) => {
        return axios.post(`User/PostSecurityQuestions?userId=${userId}`,data, headers)
    }, 
    getRegions: () => {
        return axios.get(`SurveyCategory/GetRegions`, headers)
    },
    getUserEntryCategory: (userId, subCategoryId) => {
        return axios.get(`SurveyCategory/UserEntryCategories?surveySubCategoryId=${subCategoryId}&userId=${userId}`, headers)
    },
    getUserCompliances: (userId) => {
        return axios.get(`User/DetailsOfCompliance?userId=${userId}`, headers)
    },
    postUserAgreement: (userId, complianceType) => {
        return axios.post(`User/UserAgreementCompliance?userId=${userId}&agreementType=${complianceType}`, headers)
    }, 
    
};

export default Endpoint