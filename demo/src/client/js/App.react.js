// App.react.js
import { connect } from 'react-redux';
import React from 'react';
import Calendar from './Calendar.js';
import MemberCenter from './MemberCenter.js';
import PersonalData from './PersonalData.js';
// import { PbplusMemberCenter, PbplusCalendar, PbplusPersonalData } from 'pbplus-member-ui';
import { PbplusMemberCenter, PbplusCalendar, PbplusPersonalData } from '../../../../src/js/index.js';
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

const ConnectedPbplusPersonalData = connect(
    (state, ownProps) => { return Object.assign({}, state.pbplusPersonalData); },
    (dispatch, ownProps) => { return {
        updateValue: ({ newValueMap }) => {
            dispatch(PersonalData.Actions.updateValue({ newValueMap }));
        },
    }; }
)(PbplusPersonalData);

const ConnectedPbplusCalendar = connect(
    (state, ownProps) => { return Object.assign({}, state.pbplusCalendar); },
    (dispatch, ownProps) => {
        return {
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
                calendar={<ConnectedPbplusCalendar />}
                personalData={<ConnectedPbplusPersonalData />}
            />
        </div>;
    }
}

export default App;
