// Points.js
'use strict';
import 'isomorphic-fetch';
import { getUrlSearches } from './Utils.js';

const defaultState = {
    points: 0,
    rewards: [],
};
const getRewardTemplate = () => ({
    id: 0, name: 'reward_template', link: '#',
    rewardValue: 50, pointCost: 3000,
    total: 5, type: 'virtual',
    selectedCount: 0,
});

const Reducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'UPDATE_PBPLUS_REWARD_LIST':
            return Object.assign({}, state, {rewards: action.payload.rewards});
            break;
        case 'UPDATE_PBPLUS_REWARD_SELECT_COUNT':
            return Object.assign({}, state, {
                rewards: state.rewards.map(reward => {
                    if(action.payload.id === reward.id) {
                        return Object.assign({}, reward, {selectedCount: action.payload.count});
                    } else {
                        return reward;
                    }
                })
            });
            break;
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

const updateRewardList = ({ rewards }) => {
    return {type: 'UPDATE_PBPLUS_REWARD_LIST', payload: {
        rewards: rewards.map(reward => Object.assign({}, getRewardTemplate(), reward)),
    }};
};

const updateRewardSelectCount = ({ id, count }) => {
    return {type: 'UPDATE_PBPLUS_REWARD_SELECT_COUNT', payload: { id, count }};
};

const POINTS_BASE_URL = 'http://dev-server-elb-1887534414.ap-northeast-1.elb.amazonaws.com:8095/points';

const fetchPoints = () => { return (dispatch, getState) => {
    fetch(`${POINTS_BASE_URL}`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({uuid: getUrlSearches().token_id})
    })
    .then(response => {
        if(response.status >= 400) { throw new Error('Bad response from server'); }
        return response.json();
    })
    .then(response => {
        if(200 === response.status) { dispatch(updatePointCount({points: response.message.points})); }
        else { throw new Error('Bad response from server'); }
    })
    .catch(error => { console.log(error); });
}; };

const fetchRewardList = () => { return (dispatch, getState) => {
    fetch(`${POINTS_BASE_URL}/reward_list`, {method: 'get'})
    .then(response => {
        if(response.status >= 400) { throw new Error('Bad response from server'); }
        return response.json();
    })
    .then(response => {
        const rewards = response.message.virtual.map(reward => {
            return {
                id: reward.id,
                name: reward.name,
                rewardValue: reward.reward_value,
                pointCost: reward.points,
                total: reward.total || 0,
                type: reward.type,
                link: reward.link,
            };
        });
        dispatch(updateRewardList({ rewards }));
    })
    .catch(error => { console.log(error); });
}; };

const submit = ({ orders }) => { return (dispatch, getState) => {
    const putDataTemplate = {uuid: getUrlSearches().token_id};
    orders.forEach(order => dispatch(updateRewardSelectCount({id: order.id, count: 0})));
    return Promise.all(orders.map(order => {
        const putData = Object.assign({}, putDataTemplate, {
            item_id: order.id, amount: order.selectedCount
        });
        return fetch(`${POINTS_BASE_URL}/exchange`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(putData)
        });
    }))
    .then(responses => {
        const someFetchingHasError = !!responses.filter(response => response.status >= 400)[0];
        if(someFetchingHasError) { throw new Error('Bad response from server'); }
        return Promise.all(responses.map(response => response.json()));
    })
    .then(responses => {
        console.log('Points.Actions.submit() responses:', responses);
        return dispatch(fetchPoints());
    })
    .catch(error => { console.log(error); });
}; };

const Actions = { updatePointCount, fetchRewardList, updateRewardSelectCount, submit, fetchPoints };

export default { Reducer, Actions };
