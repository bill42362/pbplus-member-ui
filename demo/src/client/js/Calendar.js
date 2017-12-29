// Calendar.js
'use strict';
import 'isomorphic-fetch';
import { getUrlSearches } from './Utils.js';

const today = new Date();
const defaultState = {
    selectedDate: today,
    month: today.getMonth(),
    year: today.getFullYear(),
    events: [],
    promotions: [],
};

const Reducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'UPDATE_CALENDAR_SELECTED_DATE':
            return Object.assign({}, state, action.payload);
            break;
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

const updateSelectedDate = ({ date }) => {
    return {type: 'UPDATE_CALENDAR_SELECTED_DATE', payload: {selectedDate: date}};
};

const updateMonth = ({ year, month }) => {
    return {type: 'UPDATE_CALENDAR_MONTH', payload: { year, month }};
};

const MEMBER_CENTER_BASE_URL = 'http://dev-server-elb-1887534414.ap-northeast-1.elb.amazonaws.com:8098/events';
const fetchCommingEvents = () => { return (dispatch, getState) => {
    let allEvents = [], allPromotions = [];
    fetch(`${MEMBER_CENTER_BASE_URL}/comming_events`, {method: 'get'})
    .then(response => {
        if(response.status >= 400) { throw new Error('Bad response from server'); }
        return response.json();
    })
    .then(response => {
        const { events = [], promotions } = response.message;
        allPromotions = promotions || [];
        allEvents = events.map(event => Object.assign({}, event, {isParticipated: false}));
    })
    .then(() => {
        return fetch(`${MEMBER_CENTER_BASE_URL}/participation`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({uuid: getUrlSearches().token_id})
        })
    })
    .then(response => {
        if(response.status >= 400) { throw new Error('Bad response from server'); }
        return response.json();
    })
    .then(response => {
        const participatedEvents = response.message.map(event => {
            return Object.assign({}, event, {
                banner: event.banner ? `https://event.pbplus.me/${event.banner}` : undefined,
                link: `https://event.pbplus.me/event/${event.event_id}/info`,
                isParticipated: true,
            });
        });
        participatedEvents.forEach(participatedEvent => {
            const eventsWithoutPromote = allEvents.filter(event => {
                return event.isParticipated || event.id !== participatedEvent.event_id;
            });
            allEvents = [...eventsWithoutPromote, participatedEvent];
        });
        dispatch({type: 'UPDATE_CALENDAR_ITEMS', payload: {
            events: allEvents,
            promotions: allPromotions,
        }});
    })
    .catch(error => { console.log(error); });
}; };

const Actions = { updateSelectedDate, updateMonth, fetchCommingEvents };

export default { Reducer, Actions };
