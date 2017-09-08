// Points.js
'use strict';

const defaultState = {points: 2300};

const Reducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'UPDATE_PBPLUS_POINT_COUNT':
            return Object.assign({}, state, {points: action.payload.points});
            break;
        default:
            return state;
    }
}

const updatePointCount = ({ points }) => {
    return {type: 'UPDATE_PBPLUS_POINT_COUNT', payload: { points }};
};

const Actions = { updatePointCount };

export default { Reducer, Actions };
