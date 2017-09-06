// Calendar.js
'use strict';
import 'isomorphic-fetch';

const today = new Date();
const defaultState = {
    month: today.getMonth(),
    year: today.getFullYear(),
    events: [],
    promotions: [],
};

const Reducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'UPDATE_CALENDAR_MONTH':
            return Object.assign({}, state, action.payload);
            break;
        case 'UPDATE_CALENDAR_ITEMS':
            return Object.assign({}, state, action.payload);
            break;
        default:
            return state;
    }
}

const updateMonth = ({ year, month }) => {
    return {type: 'UPDATE_CALENDAR_MONTH', payload: { year, month }};
};

const MEMBER_CENTER_BASE_URL = 'http://dev-server-elb-1887534414.ap-northeast-1.elb.amazonaws.com:8083/member_center';
const fetchCommingEvents = () => { return (dispatch, getState) => {
    fetch(`${MEMBER_CENTER_BASE_URL}/comming_events`, {method: 'get'})
    .then(response => {
        if(response.status >= 400) { throw new Error("Bad response from server"); }
        return response.json();
    })
    .then(response => {
        const { events, promotions } = response.message;
        dispatch({type: 'UPDATE_CALENDAR_ITEMS', payload: {
            events: events || [],
            promotions: promotions || [],
        }});
    })
    .catch(error => { console.log(error); });
}; };

const Actions = { updateMonth, fetchCommingEvents };

export default { Reducer, Actions };
