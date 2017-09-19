// App.react.js
import { connect } from 'react-redux';
import React from 'react';
import Calendar from './Calendar.js';
import MemberCenter from './MemberCenter.js';
import PersonalData from './PersonalData.js';
import PictureEditor from './PictureEditor.js';
import Points from './Points.js';
// import { PbplusMemberCenter, PbplusCalendar, PbplusPersonalData } from 'pbplus-member-ui';
import {
    PbplusMemberCenter,PbplusNoticeCenter,
    PbplusCalendar, PbplusPointCounter, PbplusBuyingLogs,
    PbplusPersonalData, PbplusImageInputBox
} from '../../../../src/js/index.js';
import '../css/app.less';

const ConnectedPbplusMemberCenter = connect(
    (state, ownProps) => { return {
        displayState: state.pbplusMemberCenter.displayState,
    }; },
    (dispatch, ownProps) => { return {
        hide: () => {
            dispatch(MemberCenter.Actions.updateDisplayState({displayState: 'hiding'}));
            setTimeout(() => { dispatch(MemberCenter.Actions.updateDisplayState({displayState: 'hidden'})); }, 600);
        },
    }; }
)(PbplusMemberCenter);

const ConnectedPbplusNoticeCenter = connect(
    (state, ownProps) => {
        return {
            notices: [
                {
                    date: new Date(), isNew: true, isImportant: false,
                    title: '新通知', content: 'notice_content',
                },
                {
                    date: new Date(), isNew: true, isImportant: true,
                    title: '新通知+重要通知', content: 'notice_content',
                },
                {
                    date: new Date(), isNew: false, isImportant: true,
                    title: '已讀重要通知', content: 'notice_content',
                },
                {
                    date: new Date(), isNew: false, isImportant: false,
                    title: '一般通知', content: 'notice_content',
                },
            ],
        };
    },
    (dispatch, ownProps) => { return {
        fetchNotices: () => { console.log('fetchNotices()'); },
    }; }
)(PbplusNoticeCenter);

const ConnectedPbplusPointCounter = connect(
    (state, ownProps) => {
        const { points, rewards } = state.pbplusPoints;
        return {
            points: points - rewards.reduce((current, reward) => {
                return current + (reward.selectedCount*reward.pointCost);
            }, 0),
            rewards,
        };
    },
    (dispatch, ownProps) => { return {
        fetchRewardList: () => dispatch(Points.Actions.fetchRewardList()),
        updateRewardSelectCount: ({ id, count }) => {
            return dispatch(Points.Actions.updateRewardSelectCount({ id, count }));
        },
        fetchPoints: () => dispatch(Points.Actions.fetchPoints()),
        submit: ({ orders }) => dispatch(Points.Actions.submit({ orders })),
    }; }
)(PbplusPointCounter);

const ConnectedPbplusBuyingLogs = connect(
    (state, ownProps) => {
        return {
            logs: [
                {
                    date: new Date(2017, 4, 23, 12), type: 'event',
                    title: '2017 HOOD TO COAST 台灣賽 中午場', bannerSrc: '',
                    paymentMethod: '信用卡', paymentFee: 30,
                    shippingFee: 40, shippingMethod: '宅配',
                    price: 20000, total: 20070,
                },
                {
                    date: new Date(2017, 4, 23, 16), type: 'promotion',
                    title: '2017 HOOD TO COAST 台灣賽 下午場', bannerSrc: '',
                    paymentMethod: '信用卡', paymentFee: 20,
                    shippingFee: 0, shippingMethod: '現場取件',
                    price: 20500, total: 20570,
                },
                {
                    date: new Date(2017, 6, 23, 16), type: 'event',
                    title: '2017 HOOD TO COAST 台灣賽 六月場', bannerSrc: '',
                    paymentMethod: 'ATM', paymentFee: 20,
                    shippingFee: 20, shippingMethod: '宅配',
                    price: 30500, total: 30590,
                },
            ],
        };
    },
    (dispatch, ownProps) => { return {
        fetchBuyingLogs: () => { console.log('fetchBuyingLogs()'); },
    }; }
)(PbplusBuyingLogs);

const ConnectedPbplusImageInputBox = connect(
    (state, ownProps) => { return {
        editorState: state.pbplusPictureEditor,
    }; },
    (dispatch, ownProps) => { return {
        updateImageSource: (url) => { dispatch(PictureEditor.Actions.updateImageSource(url)); },
        movePicture: (move) => { dispatch(PictureEditor.Actions.movePicture(move)); },
        stretchPicture: (stretch) => { dispatch(PictureEditor.Actions.stretchPicture(stretch)); },
    }; }
)(PbplusImageInputBox);

const ConnectedPbplusPersonalData = connect(
    (state, ownProps) => {
        return Object.assign({}, state.pbplusPersonalData, {
            photo: state.pbplusPictureEditor.resultSource,
            imageInputBox: <ConnectedPbplusImageInputBox />,
        });
    },
    (dispatch, ownProps) => { return {
        updateValue: ({ newValueMap }) => {
            dispatch(PersonalData.Actions.updateValue({ newValueMap }));
        },
        updateImageSource: (url) => { dispatch(PictureEditor.Actions.updateImageSource(url)); },
        fetchPersonalData: () => { dispatch(PersonalData.Actions.fetchPersonalData()); },
        submit: ({
            photo, name, gender,
            birthYear, birthMonth, birthDay,
            country, mobile, mobileVerifyCode,
            email, zipcode, address
        }) => {
            dispatch(PersonalData.Actions.submit({
                photo, name, gender,
                birthYear, birthMonth, birthDay,
                country, mobile, mobileVerifyCode,
                email, zipcode, address
            }));
        },
    }; }
)(PbplusPersonalData);

const ConnectedPbplusCalendar = connect(
    (state, ownProps) => {
        const { month, year, events, promotions } = state.pbplusCalendar;
        const eventsWithDate = state.pbplusCalendar.events
        .map(event => Object.assign({}, event, {date: new Date(event.event_start_date)}));
        const promotionsWithDate = state.pbplusCalendar.promotions
        .map(promotion => Object.assign({}, promotion, {date: new Date(promotion.event_start_date)}));
        return Object.assign({}, state.pbplusCalendar, {events: eventsWithDate, promotions: promotionsWithDate});
    },
    (dispatch, ownProps) => {
        return {
            fetchCommingEvents: () => { dispatch(Calendar.Actions.fetchCommingEvents()); },
            selectDate: ({ date }) => { dispatch(Calendar.Actions.updateSelectedDate({ date})); },
            goThisMonth: () => {
                const today = new Date();
                dispatch(Calendar.Actions.updateMonth({month: today.getMonth(), year: today.getFullYear()}));
            },
            goPreviousMonth: ({ currentYear, currentMonth }) => {
                const previousMonthDate = new Date(currentYear, currentMonth - 1);
                dispatch(Calendar.Actions.updateMonth({
                    month: previousMonthDate.getMonth(),
                    year: previousMonthDate.getFullYear()
                }));
            },
            goNextMonth: ({ currentYear, currentMonth }) => {
                const nextMonthDate = new Date(currentYear, currentMonth + 1);
                dispatch(Calendar.Actions.updateMonth({
                    month: nextMonthDate.getMonth(),
                    year: nextMonthDate.getFullYear()
                }));
            },
        };
    }
)(PbplusCalendar);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.showMemberCenter = this.showMemberCenter.bind(this);
    }
    showMemberCenter() {
        const { showMemberCenter } = this.props;
        if(showMemberCenter) { showMemberCenter(); }
    }
    render() {
        return <div className='app'>
            <div className='open-member-center-button' role='button' onClick={this.showMemberCenter}>
                使用者中心
            </div>
            <ConnectedPbplusMemberCenter
                noticeCenter={<ConnectedPbplusNoticeCenter />}
                calendar={<ConnectedPbplusCalendar />}
                pointCounter={<ConnectedPbplusPointCounter />}
                buyingLogs={<ConnectedPbplusBuyingLogs />}
                personalData={<ConnectedPbplusPersonalData />}
            />
        </div>;
    }
}

export default App;
