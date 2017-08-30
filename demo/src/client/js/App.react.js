// App.react.js
import React from 'react';
// import PBPlusMemberUi from 'pbplus-member-ui';
import { PbplusMemberCenter } from '../../../../src/js/index.js';
import '../css/app.less';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {memberCenterDisplayState: 'display'};
        this.hideMemberCenter = this.hideMemberCenter.bind(this);
        this.showMemberCenter = this.showMemberCenter.bind(this);
    }
    hideMemberCenter() {
        this.setState({memberCenterDisplayState: 'hiding'});
        setTimeout(() => { this.setState({memberCenterDisplayState: 'hidden'}); }, 600);
    }
    showMemberCenter() { this.setState({memberCenterDisplayState: 'display'}); }
    render() {
        const { memberCenterDisplayState } = this.state;
        return <div className='app'>
            <div className='open-member-center-button' role='button' onClick={this.showMemberCenter}>
                使用者中心
            </div>
            <PbplusMemberCenter
                displayState={memberCenterDisplayState}
                hide={this.hideMemberCenter}
            />
        </div>;
    }
}

export default App;
