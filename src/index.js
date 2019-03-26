import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './pc/todo.css';
import 'antd/dist/antd.css';
import App from './pc/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import reducer from './pc/reducers/reducer';
import { createStore } from 'redux'
import MobileApp from "./mobile/MobileApp";
import mobileReducer from "./mobile/reducers/mobileReducer";

// const store = createStore(reducer);
//
// ReactDOM.render(
//     <Provider store={store}>
//     <App />
//     </Provider>
//
//
//     , document.getElementById('root'));
// registerServiceWorker();

localStorage.setItem('name', 'dylan');

/**
 * @return {boolean}
 */
function isPc() {
    const userAgentInfo = navigator.userAgent;
    const Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

let root = document.getElementById('root');

if(isPc()){

    let store = createStore(reducer);
    ReactDOM.render(
            <Provider store={store}>
                <App/>
            </Provider>, root);
    registerServiceWorker();
}else{
    let store = createStore(mobileReducer);
    ReactDOM.render(
            <Provider store={store}>
                <MobileApp/>
            </Provider>, root);
    registerServiceWorker();
}
