// PbplusNoticeCenter.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import { getDateStringWithFormat } from './utils.js';
import '../css/pbplus-notice-center.less';

import MessageIcon from '../img/message.png';
import CalendarIcon from '../img/calendar.png';
import PersonalIcon from '../img/personal.png';

class PbplusNoticeCenter extends React.Component {
    constructor(props) { super(props); }
    componentDidMount() { this.props.fetchNotices(); }
    render() {
        const { notices } = this.props;
        return <div className='pbplus-notice-center'>
            <div className='pbplus-notice-center-notices'>
                {notices.map((notice, index) => {
                    return <div className='pbplus-notice-center-notice' key={index}>
                        <div className='pbplus-notice-center-notice-icon'>
                            {notice.isNew && !notice.isImportant &&
                                <img className='pbplus-notice-center-notice-icon' src={MessageIcon} />
                            }
                            {notice.isNew && notice.isImportant &&
                                <img className='pbplus-notice-center-notice-icon' src={CalendarIcon} />
                            }
                            {!notice.isNew && notice.isImportant &&
                                <img className='pbplus-notice-center-notice-icon' src={PersonalIcon} />
                            }
                            {!notice.isNew && !notice.isImportant &&
                                <div className='pbplus-notice-center-notice-icon-placeholder' />
                            }
                        </div>
                        <div className='pbplus-notice-center-notice-body'>
                            <div className='pbplus-notice-center-notice-title'>
                                {notice.title}
                                {notice.title}
                                {notice.title}
                                {notice.title}
                                {notice.title}
                                {notice.title}
                                {notice.title}
                                {notice.title}
                                {notice.title}
                            </div>
                            <div className='pbplus-notice-center-notice-content'>{notice.content}</div>
                        </div>
                        <div className='pbplus-notice-center-notice-date'>
                            {getDateStringWithFormat({
                                timestamp: notice.date.getTime(),
                                format: 'YYYY/MM/DD'
                            })}
                        </div>
                    </div>;
                })}
            </div>
        </div>;
    }
}

PbplusNoticeCenter.propTypes = {
    notices: PropTypes.array.isRequired,
    fetchNotices: PropTypes.func.isRequired,
};

export default PbplusNoticeCenter;
