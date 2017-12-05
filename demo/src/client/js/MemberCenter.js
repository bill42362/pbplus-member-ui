// MemberCenter.js
'use strict';

const defaultState = {displayState: 'display', activeTab: 'personal-data'};

const Reducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'UPDATE_MEMBER_CENTER_ACTIVE_TAB':
        case 'UPDATE_MEMBER_CENTER_DISPLAY_STATE':
            return Object.assign({}, state, action.payload);
            break;
        default:
            return state;
    }
}

const updateDisplayState = ({ displayState }) => {
    return {type: 'UPDATE_MEMBER_CENTER_DISPLAY_STATE', payload: { displayState }};
};

const updateActiveTab = ({ activeTab }) => {
    return {type: 'UPDATE_MEMBER_CENTER_ACTIVE_TAB', payload: { activeTab }};
};

const Actions = { updateDisplayState, updateActiveTab };

export default { Reducer, Actions };
