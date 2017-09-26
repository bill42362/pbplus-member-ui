// PbplusMemberCenter.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import PbplusTabPanels from './PbplusTabPanels.react.js';
import '../css/pbplus-member-center.less';

import CloseImage from '../img/close.png';
import LogoImage from '../img/logo.svg';
import MessageIcon from '../img/message.png';
import MessageHoverIcon from '../img/message_hover.png';
import CalendarIcon from '../img/calendar.png';
import CalendarHoverIcon from '../img/calendar_hover.png';
import PointsIcon from '../img/points.png';
import PointsHoverIcon from '../img/points_hover.png';
import CartIcon from '../img/record.png';
import CartHoverIcon from '../img/record_hover.png';
import PersonalIcon from '../img/personal.png';
import PersonalHoverIcon from '../img/personal_hover.png';

class PbplusMemberCenter extends React.Component {
    constructor(props) { super(props); }
    render() {
        const {
            displayState, hide, activeTab, setActiveTab,
            memberSummary, noticeCenter, calendar, pointCounter, buyingLogs, personalData
        } = this.props;
        let displayClassName = '';
        let fullScrollClassName = 'notice-center' === activeTab ? ' full-scroll' : '';
        if('hiding' === displayState) { displayClassName = ' pbplus-hiding'; }
        else if('hidden' == displayState) { displayClassName = ' pbplus-hidden'; }
        return <div className={`pbplus-member-center${displayClassName}`}>
            <div className='pbplus-member-center-fullscreen-background' role='button' onClick={hide}></div>
            <div className='pbplus-member-center-content'>
                <div className='pbplus-member-center-header'>
                    <div className='pbplus-member-center-close-button' role='button' onClick={hide} >
                        <img className='pbplus-member-center-close' title='close' src={CloseImage}/>
                    </div>
                    <div className='pbplus-member-center-branding'>
                        <img className='pbplus-member-center-logo' title='PBPlus' src={LogoImage}/>
                        <div className='pbplus-member-center-brand-display'>會員中心</div>
                    </div>
                </div>
                <div className={`pbplus-member-center-body${fullScrollClassName}`}>
                    {'notice-center' === activeTab && memberSummary}
                    <div className='pbplus-member-center-interactions'>
                        <PbplusTabPanels activeKey={activeTab} setActiveKey={setActiveTab}>
                            {!!noticeCenter && <div
                                className='interaction'
                                data-key='notice-center' data-display='通知中心'
                                data-icon={MessageIcon}
                                data-icon_active={MessageHoverIcon}
                            >{noticeCenter}</div>}
                            {!!calendar && <div
                                className='interaction'
                                data-key='calendar' data-display='日曆中心'
                                data-icon={CalendarIcon}
                                data-icon_active={CalendarHoverIcon}
                            >{calendar}</div>}
                            {!!pointCounter && <div
                                className='interaction'
                                data-key='point-counter' data-display='兌換點數'
                                data-icon={PointsIcon}
                                data-icon_active={PointsHoverIcon}
                            >{pointCounter}</div>}
                            {!!buyingLogs && <div
                                className='interaction'
                                data-key='buying-logs' data-display='消費記錄'
                                data-icon={CartIcon}
                                data-icon_active={CartHoverIcon}
                            >{buyingLogs}</div>}
                            {!!personalData && <div
                                className='interaction'
                                data-key='personal-data' data-display='個人資料'
                                data-icon={PersonalIcon}
                                data-icon_active={PersonalHoverIcon}
                            >{personalData}</div>}
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
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
    memberSummary: PropTypes.element,
    noticeCenter: PropTypes.element,
    calendar: PropTypes.element,
    pointCounter: PropTypes.element,
    buyingLogs: PropTypes.element,
    personalData: PropTypes.element,
};

export default PbplusMemberCenter;
