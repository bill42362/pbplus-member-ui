// index.js
'use strict';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { connect, Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import MemberCenter from './MemberCenter.js';
import NoticeCenter from './NoticeCenter.js';
import Calendar from './Calendar.js';
import Points from './Points.js';
import PersonalData from './PersonalData.js';
import PictureEditor from './PictureEditor.js';
import App from './App.react.js';
import '../css/index.less';

const reducer = combineReducers({
    pbplusMemberCenter: MemberCenter.Reducer,
    pbplusNoticeCenter: NoticeCenter.Reducer,
    pbplusCalendar: Calendar.Reducer,
    pbplusPoints: Points.Reducer,
    pbplusPersonalData: PersonalData.Reducer,
    pbplusPictureEditor: PictureEditor.Reducer,
})
const store = createStore(reducer, applyMiddleware(ReduxThunk));

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
