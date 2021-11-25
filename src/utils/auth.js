import React from 'react';
import {stateKeys} from "../redux/actions";
import {setReduxState} from "./helpers";
import { Redirect, Route, withRouter, useHistory } from "react-router-dom";
//import store from "../redux/store"
//import { Redirect } from "react-router";
//import {browserHistory, hi} from "react-router";

export function __RouteProps(route) {
    useHistory.push(route);
}
const TOKEN_KEY = 'token';
export const USER_KEY = '_IDENTITY_';

export function userLoggedIn() {
    return !!getUserToken();
}

export function getActiveStore() {
    return sessionStorage.getItem(USER_KEY) ? sessionStorage : localStorage;
}
// export function getActiveStore() {
//     return sessionStorage.getItem(TOKEN_KEY) ? sessionStorage : localStorage;
// }

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


export const AuthRoute = withRouter(({component: Component, path, authorized, ...rest}) => {

    return <Redirect from={`/signin`} to={path}/>

});

export function rememberRoute() {
    const key = '__intended';
    const old = sessionStorage.getItem(key);
    // sessionStorage.setItem(key, window.location.pathname);

    return old;
}

export function logOutUser(redirect) {
    // getActiveStore().removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_KEY);
    // localStorage.removeItem(stateKeys.USER);
    // sessionStorage.removeItem(stateKeys.USER);

    window.location = redirect ? redirect : '/';
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

