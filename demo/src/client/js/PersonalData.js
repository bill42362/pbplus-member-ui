// PersonalData.js
'use strict';
import 'isomorphic-fetch';
import PictureEditor from './PictureEditor.js';
import { getUrlSearches, trimObject } from './Utils.js';

const defaultState = {
    nickname: '', name: '', gender: '',
    birthYear: '', birthMonth: '', birthDay: '',
    country: '', mobile: '', isMobileValidated: false,
    mobileVerifyCode: '', isMobileVerifyCodeSent: false,
    email: '', isEmailValidated: false,
    zipcode: '', address: '',
    submitResult: {isSuccess: undefined, message: ''},
};

const Reducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'UPDATE_PERSONAL_DATA_VALUE':
            return Object.assign({}, state, action.payload);
            break;
        default:
            return state;
    }
}

const updateValue = ({ newValueMap }) => {
    return {type: 'UPDATE_PERSONAL_DATA_VALUE', payload: newValueMap};
};

const MEMBER_CENTER_BASE_URL = 'http://dev-server-elb-1887534414.ap-northeast-1.elb.amazonaws.com:8098';
const fetchPersonalData = () => { return (dispatch, getState) => {
    fetch(`${MEMBER_CENTER_BASE_URL}/member_data`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({uuid: getUrlSearches().token_id})
    })
    .then(response => {
        if(response.status >= 400) { throw new Error('Bad response from server'); }
        return response.json();
    })
    .then(response => {
        const {
            src,
            nickname, name, gender,
            birth_year: birthYear, birth_month: birthMonth, birth_day: birthDay,
            country, mobile, email,
            zipcode, address
        } = response.message;
        const newValueMap = trimObject({
            nickname, name, gender,
            birthYear, birthMonth, birthDay,
            country, mobile, email,
            zipcode, address
        });
        dispatch(updateValue({ newValueMap }));
        if(src) { dispatch(PictureEditor.Actions.updateImageSource(src)); }
    })
    .catch(error => { console.log(error); });
}; };

const submit = ({
    photo, nickname, name, gender,
    birthYear, birthMonth, birthDay,
    country, mobile, mobileVerifyCode,
    email, zipcode, address
}) => { return (dispatch, getState) => {
    const putData = Object.assign({uuid: getUrlSearches().token_id}, {
        birthday: `${birthYear}-${birthMonth}-${birthDay}`,
        picture: photo,
        nickname, name, gender,
        country, mobile, mobileVerifyCode,
        email, zipcode, address
    });
    fetch(`${MEMBER_CENTER_BASE_URL}/member_data/edit`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(putData)
    })
    .then(response => {
        if(response.status >= 400) { throw new Error('Bad response from server'); }
        return response.json();
    })
    .then(response => {
        if(200 === response.status) {
            dispatch(updateValue({newValueMap: {submitResult: {isSuccess: true, message: '更新成功。'}}}));
            setTimeout(() => {
                dispatch(updateValue({newValueMap: {submitResult: {isSuccess: undefined, message: ''}}}));
            }, 6000);
        } else {
            dispatch(updateValue({newValueMap: {submitResult: {isSuccess: false, message: '更新失敗。'}}}));
            setTimeout(() => {
                dispatch(updateValue({newValueMap: {submitResult: {isSuccess: undefined, message: ''}}}));
            }, 6000);
        }
    })
    .catch(error => {
        dispatch(updateValue({newValueMap: {submitResult: {isSuccess: false, message: '更新失敗。'}}}));
        setTimeout(() => {
            dispatch(updateValue({newValueMap: {submitResult: {isSuccess: undefined, message: ''}}}));
        }, 6000);
    });
}; };

const Actions = { updateValue, fetchPersonalData, submit };

export default { Reducer, Actions };
