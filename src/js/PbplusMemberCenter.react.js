// PbplusMemberCenter.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import PbplusTabPanels from './PbplusTabPanels.react.js';
import '../css/pbplus-member-center.less';

class PbplusMemberCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activeKey: 'point-counter'};
        this.setActiveKey = this.setActiveKey.bind(this);
    }
    setActiveKey({ key }) { this.setState({activeKey: key}); }
    render() {
        const { activeKey } = this.state;
        const { displayState, hide, calendar, pointCounter, personalData } = this.props;
        let displayClassName = '';
        if('hiding' === displayState) { displayClassName = ' pbplus-hiding'; }
        else if('hidden' == displayState) { displayClassName = ' pbplus-hidden'; }
        return <div className={`pbplus-member-center${displayClassName}`}>
            <div className='pbplus-member-center-fullscreen-background' role='button' onClick={hide}></div>
            <div className='pbplus-member-center-content'>
                <div className='pbplus-member-center-header'>
                    <div
                        className='pbplus-member-center-close-button' role='button' onClick={hide}
                    >X</div>
                    <div className='pbplus-member-center-branding'>
                        <img className='pbplus-member-center-logo' title='PBPlus'/>
                        <div className='pbplus-member-center-brand-display'>會員中心</div>
                    </div>
                </div>
                <div className='pbplus-member-center-body'>
                    <div className='pbplus-member-center-summary'></div>
                    <div className='pbplus-member-center-interactions'>
                        <PbplusTabPanels activeKey={activeKey} setActiveKey={this.setActiveKey}>
                            <div
                                className='interaction'
                                data-key='calendar' data-display='日曆中心' data-icon='https://tv.pbplus.me/img/facebook.svg'
                            >
                                {calendar}
                            </div>
                            <div
                                className='interaction'
                                data-key='point-counter' data-display='兌換點數' data-icon='https://tv.pbplus.me/img/facebook.svg'
                            >
                                {pointCounter}
                            </div>
                            <div
                                className='interaction'
                                data-key='personal-data' data-display='個人資料' data-icon='https://tv.pbplus.me/img/facebook.svg'
                            >
                                {personalData}
                            </div>
                        </PbplusTabPanels>
                    </div>
                </div>
            </div>
        </div>;
    }
}

PbplusMemberCenter.propTypes = {
    displayState: PropTypes.oneOf(['display', 'hiding', 'hidden']).isRequired,
    hide: PropTypes.func.isRequired,
    calendar: PropTypes.element.isRequired,
    pointCounter: PropTypes.element.isRequired,
    personalData: PropTypes.element.isRequired,
};

export default PbplusMemberCenter;
