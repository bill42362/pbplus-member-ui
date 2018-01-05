// App.react.js
import { connect } from 'react-redux';
import React from 'react';
import NoticeCenter from './NoticeCenter.js';
import Calendar from './Calendar.js';
import MemberCenter from './MemberCenter.js';
import PersonalData from './PersonalData.js';
import PictureEditor from './PictureEditor.js';
import Points from './Points.js';
// import { PbplusMemberCenter, PbplusCalendar, PbplusPersonalData } from 'pbplus-member-ui';
import {
    PbplusMemberCenter, PbplusMemberSummary,
    PbplusNoticeCenter, PbplusCalendar, PbplusBuyingLogs,
    PbplusPointCounter, PbplusPointCounterRewardTypeTab, PbplusPointCounterReceiverInfo,
    PbplusPersonalData, PbplusImageInputBox
} from '../../../../src/js/index.js';
import '../css/app.less';

const ConnectedPbplusMemberCenter = connect(
    (state, ownProps) => { return {
        displayState: state.pbplusMemberCenter.displayState,
        activeTab: state.pbplusMemberCenter.activeTab,
    }; },
    (dispatch, ownProps) => { return {
        hide: () => {
            dispatch(MemberCenter.Actions.updateDisplayState({displayState: 'hiding'}));
            setTimeout(() => { dispatch(MemberCenter.Actions.updateDisplayState({displayState: 'hidden'})); }, 600);
        },
        setActiveTab: ({ key }) => { dispatch(MemberCenter.Actions.updateActiveTab({activeTab: key})); },
    }; }
)(PbplusMemberCenter);

const ConnectedPbplusMemberSummary = connect(
    (state, ownProps) => {
        return {
            userPhoto: '',
            nickname: 'Steve 李韶午',
            registeredDate: new Date(),
            coins: 50,
            eventCounts: [
                {key: 'baseball', count: 100*Math.random(), display: '棒球 %f 場', color: 'rgb(246, 185, 80)'},
                {key: 'baseketball', count: 100*Math.random(), display: '籃球 %f 場', color: 'rgb(128, 159, 232)'},
                {key: 'jogging', count: 100*Math.random(), display: '路跑 %f KM', color: 'rgb(144, 252, 128)'},
                {key: 'gym', count: 100*Math.random(), display: '健身 %f 堂', color: 'rgb(50, 200, 235)'},
            ],
            achievements: [
                {key: 'achievement-1', display: 'achi-1', imageSrc: 'https://p2.bahamut.com.tw/HOME/creationCover/40/0003703340.JPG'},
                {key: 'achievement-2', display: 'achi-2', imageSrc: 'https://p2.bahamut.com.tw/HOME/creationCover/40/0003703340.JPG'},
                {key: 'achievement-3', display: 'achi-3', imageSrc: 'https://p2.bahamut.com.tw/HOME/creationCover/40/0003703340.JPG'},
            ],
            points: state.pbplusPoints.points,
            pointsLastRenewDate: new Date(),
        };
    },
    (dispatch, ownProps) => { return {
        fetchMemberSummary: () => { console.log('fetchMemberSummary()'); },
    }; }
)(PbplusMemberSummary);

const ConnectedPbplusNoticeCenter = connect(
    (state, ownProps) => {
        return {
            notices: state.pbplusNoticeCenter.notices,
            expendedNoticeId: state.pbplusNoticeCenter.expendedNoticeId,
        };
    },
    (dispatch, ownProps) => { return {
        expendNotice: ({ noticeId }) => { dispatch(NoticeCenter.Actions.updateExpendedNotice({id: noticeId})); },
        clearExpendNotice: () => { dispatch(NoticeCenter.Actions.updateExpendedNotice({id: '-1'})); },
        fetchNotices: () => { console.log('fetchNotices()'); },
    }; }
)(PbplusNoticeCenter);

const rewardTypes = [
    {key: 'virtual', display: '折扣兌換'},
    {key: 'real', display: '超值兌物'},
];
const ConnectedPbplusPointCounterRewardTypeTab = connect(
    (state, ownProps) => {
        const { usingRewardType } = state.pbplusPoints;
        return { usingRewardType, rewardTypes };
    },
    (dispatch, ownProps) => { return {
        updateUsingRewardType: ({ rewardType: rewardTypeKey }) => {
            const rewardType = rewardTypes.filter(rewardType => rewardTypeKey === rewardType.key)[0] || rewardTypes[0];
            return dispatch(Points.Actions.updateUsingRewardType({usingRewardType: rewardType.key}));
        },
    }; }
)(PbplusPointCounterRewardTypeTab);

const ConnectedPbplusPointCounterReceiverInfo = connect(
    (state, ownProps) => {
        const { name, country, mobile, zipcode, address } = state.pbplusPoints.receiverInfo;
        return { name, country, mobile, zipcode, address };
    },
    (dispatch, ownProps) => { return {
        updateReceiverInfo: ({ newValueMap }) => {
            return dispatch(Points.Actions.updateReceiverInfo({ newValueMap }));
        },
    }; }
)(PbplusPointCounterReceiverInfo);

const ConnectedPbplusPointCounter = connect(
    (state, ownProps) => {
        const { points, rewards, usingRewardType, usingNotice, isNoticeChecked } = state.pbplusPoints;
        const usingRewards = rewards.filter(reward => usingRewardType === reward.type);
        let canSubmit = isNoticeChecked && !!usingRewards.filter(reward => reward.selectedCount).length;
        if('real' === usingRewardType) {
            const { name, country, mobile, zipcode, address } = state.pbplusPoints.receiverInfo;
            canSubmit = canSubmit && !!(name && country && mobile && zipcode && address);
        }
        return {
            points: points - usingRewards.reduce((current, reward) => {
                return current + (reward.selectedCount*reward.pointCost);
            }, 0),
            rewards: usingRewards,
            rewardTypeTab: <ConnectedPbplusPointCounterRewardTypeTab />,
            receiverInfo: <ConnectedPbplusPointCounterReceiverInfo />,
            usingRewardType, usingNotice, isNoticeChecked, canSubmit
        };
    },
    (dispatch, ownProps) => { return {
        fetchRewardList: () => dispatch(Points.Actions.fetchRewardList()),
        updateRewardSelectCount: ({ id, count }) => {
            return dispatch(Points.Actions.updateRewardSelectCount({ id, count }));
        },
        fetchPoints: () => dispatch(Points.Actions.fetchPoints()),
        updateIsNoticeChecked: ({ isNoticeChecked }) => {
            return dispatch(Points.Actions.updateIsNoticeChecked({ isNoticeChecked }));
        },
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
        sendValidateMobileMessage: ({ country, mobile }) => {
            console.log('sendValidateMobileMessage() country:', country, ', mobile:', mobile);
        },
        submitMobileVerifyCode: ({ mobileVerifyCode }) => {
            console.log('submitMobileVerifyCode() mobileVerifyCode:', mobileVerifyCode);
        },
        validateEmail: ({ email }) => { console.log('validateEmail() email:', email); },
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
                memberSummary={<ConnectedPbplusMemberSummary />}
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
