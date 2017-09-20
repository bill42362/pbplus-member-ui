// PbplusNotice.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import { getDateStringWithFormat } from './utils.js';
import '../css/pbplus-notice.less';

import MessageIcon from '../img/message.png';
import CalendarIcon from '../img/calendar.png';
import PersonalIcon from '../img/personal.png';

class PbplusNotice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {height: undefined};
        this.expendNotice = this.expendNotice.bind(this);
        this.clearExpendNotice = this.clearExpendNotice.bind(this);
    }
    expendNotice(e) {
        let noticeId = undefined, target = e.target;
        while(!noticeId && target) {
            noticeId = target.getAttribute('data-notice_id');
            target = target.parentNode;
        }
        this.props.expendNotice({ noticeId });
    }
    clearExpendNotice(e) { e.stopPropagation(); this.props.clearExpendNotice(); }
    updateNoticeHeight() {
        const { height: currentHeight } = this.state;
        const { shouldExpend } = this.props;
        const baseHeight = this.refs.base.getBoundingClientRect().height;
        const bodyPadding = 16;
        const titleHeight = this.refs.title.getBoundingClientRect().height;
        const contentHeight = this.refs.content.getBoundingClientRect().height;
        let newHeight = currentHeight;
        if(shouldExpend) {
            newHeight = titleHeight + contentHeight + bodyPadding;
        } else {
            newHeight = titleHeight + bodyPadding;
        }
        if(currentHeight !== newHeight) { this.setState({height: newHeight}); }
    }
    componentDidUpdate() { this.updateNoticeHeight(); }
    componentDidMount() { this.updateNoticeHeight(); }
    render() {
        const { height } = this.state;
        const { notice, shouldExpend } = this.props;
        const expendClassName = shouldExpend ? ' pbplus-expend' : '';
        return <div
            className={`pbplus-notice${expendClassName}`}
            style={{ height }} ref='base'
            data-notice_id={notice.id} onClick={this.expendNotice}
        >
            <div className='pbplus-notice-icon'>
                {notice.isNew && !notice.isImportant && <img
                    className='pbplus-notice-icon' src={MessageIcon}
                />}
                {notice.isNew && notice.isImportant && <img
                    className='pbplus-notice-icon' src={CalendarIcon}
                />}
                {!notice.isNew && notice.isImportant && <img
                    className='pbplus-notice-icon' src={PersonalIcon}
                />}
                {!notice.isNew && !notice.isImportant && <div
                    className='pbplus-notice-icon-placeholder'
                />}
            </div>
            <div className='pbplus-notice-body'>
                <div className='pbplus-notice-title' ref='title'
                    onClick={shouldExpend ? this.clearExpendNotice : undefined}
                >{notice.title}</div>
                <div className='pbplus-notice-content' ref='content'>
                    {notice.content}
                    {!!notice.link && <a className='pbplus-notice-link' href={notice.link} target='_blank'>前往</a>}
                </div>
            </div>
            <div className='pbplus-notice-date'>
                {getDateStringWithFormat({
                    timestamp: notice.date.getTime(),
                    format: 'YYYY/MM/DD'
                })}
            </div>
        </div>;
    }
}

PbplusNotice.propTypes = {
    notice: PropTypes.object.isRequired,
    expendNotice: PropTypes.func.isRequired,
    clearExpendNotice: PropTypes.func.isRequired,
};

export default PbplusNotice;
