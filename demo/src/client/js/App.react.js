// App.react.js
import { connect } from 'react-redux';
import React from 'react';
import MemberCenter from './MemberCenter.js';
// import PBPlusMemberUi from 'pbplus-member-ui';
import { PbplusMemberCenter, PbplusCalendar } from '../../../../src/js/index.js';
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
            <ConnectedPbplusMemberCenter />
        </div>;
    }
}

export default App;
