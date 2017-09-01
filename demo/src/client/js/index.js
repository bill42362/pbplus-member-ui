// index.js
'use strict';
import { createStore, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import MemberCenter from './MemberCenter.js';
import Calendar from './Calendar.js';
import PersonalData from './PersonalData.js';
import App from './App.react.js';
import '../css/index.less';

const reducer = combineReducers({
    pbplusMemberCenter: MemberCenter.Reducer,
    pbplusCalendar: Calendar.Reducer,
    pbplusPersonalData: PersonalData.Reducer,
})
const store = createStore(reducer);

const ConnectedApp = connect(
    (state, ownProps) => { return {}; },
    (dispatch, ownProps) => { return {
        showMemberCenter: () => {
            dispatch(MemberCenter.Actions.updateDisplayState({displayState: 'display'}));
        },
    }; }
)(App);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('app-root')
);
