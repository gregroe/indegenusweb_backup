import React from 'react';
import {stateKeys} from "../redux/actions";
import {setReduxState} from "./helpers";
//import { Navigate, Route, withRouter, useHistory } from "react-router-dom";
//import store from "../redux/store"
//import { Navigate } from "react-router";
//import {browserHistory, hi} from "react-router";

export function __RouteProps(route) {
    //useHistory.push(route);
}
const TOKEN_KEY = 'token';
export const USER_KEY = stateKeys.USER;

export function userLoggedIn() {
    return !!getUserToken();
}

export function getActiveStore() {
    return sessionStorage.getItem(USER_KEY) ? sessionStorage : localStorage;
}
// export function getActiveStore() {
//     return sessionStorage.getItem(TOKEN_KEY) ? sessionStorage : localStorage;
// }


export function loginUser(token, user, redirect) {
   
    const storage = localStorage;
    const _storage = sessionStorage;
    storage.setItem(TOKEN_KEY, token);
    _storage.setItem(TOKEN_KEY, token);
    if (user) {

    storage.setItem(stateKeys.USER, JSON.stringify(user));

    if (redirect) {
        const intended = rememberRoute();
        if (intended) {
            window.location = intended;
        } 
        else if(user.securityQuestion){
            window.location = "/profile";
            return true;
        }
        else if(!user.securityQuestion){
            window.location = "/security_questions";
            return true;
        }
        // else if(!user.securityQuestion){
        //     window.location = "/profile";
        //     return true;
        // }
        else{
            return false
        }
       
        }
    }

}

export function RerouteActiveUser() {
   const user = JSON.parse(localStorage.getItem(stateKeys.USER))
   
    if (user) {

    //storage.setItem("_IDENTITY_", JSON.stringify(user));

   if(user.role == "User"){
            window.location = "/profile";
            return true;
        }
        else if(user == "superteller@kulpay"){
            window.location = "/superteller/index";
            return true;
        }
        else{
            return false
        }
       
        }
    

}
export function getUserToken() {
    return getActiveStore().getItem(TOKEN_KEY)
}

export function loadUserInfo() {
  
    const data = getActiveStore().getItem(stateKeys.USER)
    const user = data ? JSON.parse(data) : null;
    setReduxState(user, stateKeys.USER)
    return user;
}

export function getUser(key, defaultValue = null) {
    
    const userData = getActiveStore().getItem(stateKeys.USER);
    let data = userData ? JSON.parse(userData) : null;

    if (!data || (key && typeof data[key] === 'undefined')) {
        return defaultValue
    }

    return key ? data[key] : data;
}

export function updateUserInfo(data) {
    const userData = getUser();
    let update = Object.assign({}, userData, data);

    getActiveStore().setItem(stateKeys.USER, JSON.stringify(update));
    setReduxState(update, stateKeys.USER)
}


// export const AuthRoute = withRouter(({component: Component, path, authorized, ...rest}) => {

//     return <Navigate from={`/signin`} to={path}/>

// });

export function rememberRoute() {
    const key = '__intended';
    const old = sessionStorage.getItem(key);
    // sessionStorage.setItem(key, window.location.pathname);

    return old;
}

export function logOutUser(Navigate) {
    // getActiveStore().removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_KEY);
    // localStorage.removeItem(stateKeys.USER);
    // sessionStorage.removeItem(stateKeys.USER);

    window.location = Navigate ? Navigate : '/';
}
export function clearStore() {
    // getActiveStore().removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_KEY);
    // localStorage.removeItem(stateKeys.USER);
    // sessionStorage.removeItem(stateKeys.USER);

   
}

