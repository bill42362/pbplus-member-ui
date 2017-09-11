// Points.js
'use strict';
import 'isomorphic-fetch';

const defaultState = {
    points: 2300,
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

const POINTS_BASE_URL = 'http://dev-server-elb-1887534414.ap-northeast-1.elb.amazonaws.com:8095/points';
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
                total: reward.total,
                type: reward.type,
                link: reward.link,
            };
        });
        dispatch(updateRewardList({ rewards }));
    })
    .catch(error => { console.log(error); });
}; };

const Actions = { updatePointCount, fetchRewardList };

export default { Reducer, Actions };
