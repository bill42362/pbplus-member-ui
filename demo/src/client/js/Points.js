// Points.js
'use strict';
import 'isomorphic-fetch';
import React from 'react';
import { getUrlSearches } from './Utils.js';

const noticeOfRewardTypes = {
    virtual: {
        title: '折扣兌換注意事項',
        contents: [
            {
                content: '紅利點數轉入計算時間:',
                uls: [
                    {content: '好物商城購物確認通過鑑賞期無退貨後轉入(每月15、30日入帳、遇假日則延後)。'},
                    {content: '報名揪in活動，於活動結束後 5 個工作天，確定您無退費後轉入。'},
                ],
            },
            {content: '商城折扣碼及報名折扣碼不能交換使用。'},
            {content: '每次從點數兌換現金的作業，請給 pb+ 小編 10 個工作天。'},
            {content: '使用紅利點數折抵之消費，若退貨點數不予退回喔!'},
            {content: '可折抵之金額依照商品及活動類型有不同上限。'},
            {content: 'Pb+ 的管理員會隨時注意點數的使用情形，為所有會員規劃並調整紅利的使用規則，屆時以本頁公佈辦法為主。'},
            {content: <span>
                如果對使用紅利有任何的問題，歡迎
                <a href='mailto:support@pcgbros.com'>聯絡我們</a>。
            </span>},
        ],
    },
    real: {
        title: '超值兌物注意事項',
        contents: [
            {content: '紅利點數轉入計算時間:'},
            {content: '商城折扣碼及報名折扣碼不能交換使用。'},
            {content: '每次從點數兌換現金的作業，請給 pb+ 小編 10 個工作天。'},
            {content: '使用紅利點數折抵之消費，若退貨點數不予退回喔!'},
            {content: '可折抵之金額依照商品及活動類型有不同上限。'},
            {content: 'Pb+ 的管理員會隨時注意點數的使用情形，為所有會員規劃並調整紅利的使用規則，屆時以本頁公佈辦法為主。'},
            {content: <span>
                如果對使用紅利有任何的問題，歡迎
                <a href='mailto:support@pcgbros.com'>聯絡我們</a>。
            </span>},
        ],
    },
};
const defaultState = {
    points: 0,
    usingRewardType: 'real',
    usingNotice: noticeOfRewardTypes.real,
    rewards: [],
    isNoticeChecked: false,
    receiverInfo: {
        name: '', country: '', mobile: '', zipcode: '', address: '',
    },
};
const getRewardTemplate = () => ({
    id: 0, name: 'reward_template', link: '#',
    rewardValue: 50, pointCost: 3000,
    total: 5, type: 'virtual',
    selectedCount: 0,
});

const Reducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'UPDATE_PBPLUS_USING_REWARD_TYPE':
            return Object.assign({}, state, {
                usingRewardType: action.payload.usingRewardType,
                usingNotice: noticeOfRewardTypes[action.payload.usingRewardType] || noticeOfRewardTypes.virtual,
            });
            break;
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
        case 'UPDATE_PBPLUS_IS_NOTICE_CHECKED':
            return Object.assign({}, state, {isNoticeChecked: action.payload.isNoticeChecked});
            break;
        case 'UPDATE_PBPLUS_RECEIVER_INFO':
            return Object.assign(
                {},
                state,
                {receiverInfo: Object.assign({}, state.receiverInfo, action.payload.newValueMap)}
            );
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

const updateIsNoticeChecked = ({ isNoticeChecked }) => {
    return {type: 'UPDATE_PBPLUS_IS_NOTICE_CHECKED', payload: { isNoticeChecked }};
};

const POINTS_BASE_URL = 'http://dev-server-elb-1887534414.ap-northeast-1.elb.amazonaws.com:8098/points';

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
        const { virtual, entity } = response.message;
        const rewards = [ ...virtual, ...entity ].map(reward => {
            return {
                id: reward.id,
                name: reward.name,
                rewardValue: reward.reward_value,
                pointCost: reward.points,
                total: reward.total || 0,
                type: 'virtual' === reward.type ? 'virtual' : 'real',
                link: reward.link,
            };
        });
        dispatch(updateRewardList({ rewards }));
    })
    .catch(error => { console.log(error); });
}; };

const updateReceiverInfo = ({ newValueMap }) => { return (dispatch, getState) => {
    return dispatch({type: 'UPDATE_PBPLUS_RECEIVER_INFO', payload: { newValueMap }});
}; };

const updateUsingRewardType = ({ usingRewardType }) => { return (dispatch, getState) => {
    dispatch(updateIsNoticeChecked({isNoticeChecked: false}));
    return dispatch({type: 'UPDATE_PBPLUS_USING_REWARD_TYPE', payload: { usingRewardType }});
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

const Actions = {
    updatePointCount, updateUsingRewardType, updateIsNoticeChecked,
    fetchRewardList, updateRewardSelectCount, updateReceiverInfo,
    submit, fetchPoints
};

export default { Reducer, Actions };
