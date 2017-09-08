// PersonalData.js
'use strict';
import 'isomorphic-fetch';
import PictureEditor from './PictureEditor.js';
import { getUrlSearches, trimObject } from './Utils.js';

const defaultState = {
    name: '', gender: '',
    birthYear: '', birthMonth: '', birthDay: '',
    country: '', mobile: '',
    mobileVerifyCode: '',
    email: '',
    zipcode: '', address: '',
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

const MEMBER_CENTER_BASE_URL = 'http://dev-server-elb-1887534414.ap-northeast-1.elb.amazonaws.com:8095';
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
            name, gender,
            birth_year: birthYear, birth_month: birthMonth, birth_day: birthDay,
            country, mobile, email,
            zipcode, address
        } = response.message;
        const newValueMap = trimObject({
            name, gender,
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
    photo, name, gender,
    birthYear, birthMonth, birthDay,
    country, mobile, mobileVerifyCode,
    email, zipcode, address
}) => { return (dispatch, getState) => {
    const putData = Object.assign({uuid: getUrlSearches().token_id}, {
        birthday: `${birthYear}-${birthMonth}-${birthDay}`,
        picture: photo,
        name, gender,
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
        console.log('response:', response);
    })
    .catch(error => { console.log(error); });
}; };

const Actions = { updateValue, fetchPersonalData, submit };

export default { Reducer, Actions };
