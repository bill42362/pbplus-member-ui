// PbplusCalendar.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import { getDateStringWithFormat } from './utils.js';
import '../css/pbplus-calendar.less';

import DefaultEventBanner from '../img/event.jpg';
import DefaultPromotionBanner from '../img/promotion.jpg';

const monthStringMap = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十' , '十一', '十二'];

class PbplusCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.goPreviousMonth = this.goPreviousMonth.bind(this);
        this.goNextMonth = this.goNextMonth.bind(this);
    }
    getDatesOfPreviousMonth(date) {
        const dayCountBeforeFirstDate = date.getDay();
        const lastDateOfPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        return new Array(dayCountBeforeFirstDate).fill(0).map((omit, index) => {
            return lastDateOfPreviousMonth - dayCountBeforeFirstDate + index + 1;
        });
    }
    getDatesOfThisMonth(date) {
        const dateCount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        return new Array(dateCount).fill(0).map((omit, index) => index + 1);
    }
    getDatesOfNextMonth(date) {
        const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const dayCountAfterLastDate = 6 - lastDate.getDay();
        return new Array(dayCountAfterLastDate).fill(0).map((omit, index) => index + 1);
    }
    goPreviousMonth() {
        const { month, year, goPreviousMonth } = this.props;
        goPreviousMonth({currentYear: year, currentMonth: month});
    }
    goNextMonth() {
        const { month, year, goNextMonth } = this.props;
        goNextMonth({currentYear: year, currentMonth: month});
    }
    preventSelect(e) { e.preventDefault(); }
    componentDidMount() { this.props.fetchCommingEvents(); }
    render() {
        const { selectedDate, month, year, events, promotions, selectDate, goThisMonth } = this.props;
        const today = new Date();
        const todayYear = today.getFullYear(), todayMonth = today.getMonth(), todayDate = today.getDate();
        const date = new Date(year, month);
        const monthString = monthStringMap[date.getMonth()];

        const datesOfPreviousMonth = this.getDatesOfPreviousMonth(date);
        const datesOfThisMonth = this.getDatesOfThisMonth(date);
        const datesOfNextMonth = this.getDatesOfNextMonth(date);

        const previousMonthDateObjects = datesOfPreviousMonth.map(date => ({month: month - 1, date }));
        const thisMonthDateObjects = datesOfThisMonth.map(date => ({ month, date }));
        const nextMonthDateObjects = datesOfNextMonth.map(date => ({month: month + 1, date }));

        const calendarDates = [...previousMonthDateObjects, ...thisMonthDateObjects, ...nextMonthDateObjects];
        const tempArray = [...calendarDates];
        const calendarWeeks = [];
        while(0 < tempArray.length) { calendarWeeks.push(tempArray.splice(0, 7)); }

        const selectedDateString = selectedDate.toDateString();
        const selectedDateEvents = events
            .filter(event => selectedDateString === event.date.toDateString())
            .map(event => Object.assign({}, event, {type: 'event'}));
        const selectedDatePromotions = promotions
            .filter(promotion => selectedDateString === promotion.date.toDateString())
            .map(promotion => Object.assign({}, promotion, {type: 'promotion'}));
        const selectedDateItems = [...selectedDateEvents, ...selectedDatePromotions];

        return <div className='pbplus-calendar'>
            <div className='calendar-header'>
                <div className='calendar-month-selector'>
                    <div
                        className='calendar-last-month-button' role='button'
                        onClick={this.goPreviousMonth} onMouseDown={this.preventSelect}
                    >{'<'}</div>
                    <div
                        className='calendar-month-display' role='button'
                        onClick={goThisMonth} onMouseDown={this.preventSelect}
                    >{`${monthString}月 ${year}`}</div>
                    <div
                        className='calendar-next-month-button' role='button'
                        onClick={this.goNextMonth} onMouseDown={this.preventSelect}
                    >{'>'}</div>
                </div>
                <div className='calendar-legend'>
                    <div className='calendar-legend-item'>
                        <div className='calendar-day-notice has-item' />
                        即將來臨的活動/優惠
                    </div>
                    <div className='calendar-legend-item'>
                        <div className='calendar-day-notice has-participated-event' />
                        已報名之活動
                    </div>
                </div>
            </div>
            <div className='calendar-body'>
                <div className='calendar-week-titles'>
                    <div className='calendar-week-title'>日</div>
                    <div className='calendar-week-title'>一</div>
                    <div className='calendar-week-title'>二</div>
                    <div className='calendar-week-title'>三</div>
                    <div className='calendar-week-title'>四</div>
                    <div className='calendar-week-title'>五</div>
                    <div className='calendar-week-title'>六</div>
                </div>
                <div className='calendar-weeks'>
                    {calendarWeeks.map((calendarWeek, weekIndex) => {
                        return <div className='calendar-week' key={weekIndex}>
                            {calendarWeek.map((calendarDay, index) => {
                                const notThisMonthClassName = month === calendarDay.month ? '' : ' not-this-month';
                                const isToday = month === calendarDay.month
                                    && year === todayYear
                                    && month === todayMonth
                                    && calendarDay.date === todayDate;
                                const dateString = isToday ? '今天' : ('0' + calendarDay.date).slice(-2);
                                const calendarDateObject = new Date(year, calendarDay.month, calendarDay.date);
                                const calendarDateString = calendarDateObject.toDateString();
                                const isSelectedDay = selectedDateString === calendarDateString;
                                const selectedDayClassName = isSelectedDay ? ' selected-day' : '';
                                const todayEvents = events.filter(event => {
                                    return calendarDateString === event.date.toDateString();
                                });
                                const hasEvent = !!todayEvents[0];
                                const hasParticipatedEvents = !!todayEvents.filter(event => {
                                    return event.isParticipated;
                                })[0];
                                const hasPromotion = !!promotions.filter(event => {
                                    return calendarDateString === event.date.toDateString();
                                })[0];
                                let noticeClassName = '';
                                if(hasParticipatedEvents) { noticeClassName = ' has-participated-event'; }
                                else if(hasEvent || hasPromotion) { noticeClassName = ' has-item'; }
                                return <div
                                    className={`calendar-day${notThisMonthClassName}${selectedDayClassName}`} key={index}
                                    onClick={() => { selectDate({date: calendarDateObject}); }}
                                >
                                    {dateString}
                                    {(hasEvent || hasPromotion) && <div
                                        className={`calendar-day-notice${noticeClassName}`}
                                    />}
                                </div>;
                            })}
                        </div>;
                    })}
                </div>
                <div className='calendar-items'>
                    {selectedDateItems.map((item, index) => {
                        const defaultBanner = 'event' === item.type ? DefaultEventBanner : DefaultPromotionBanner;
                        return <a className='calendar-item' href={item.link} key={index} target='_blank'>
                            <div className='calendar-item-banner-wrapper'>
                                <img
                                    className='calendar-item-banner'
                                    src={item.banner || defaultBanner}
                                    title={item.title}
                                />
                            </div>
                            <div className='calendar-item-info'>
                                <div className='calendar-item-info-title'>{item.title}</div>
                                <div className='calendar-item-info-date'>
                                    <span className='calendar-item-info-date-date'>
                                        {getDateStringWithFormat({
                                            timestamp: item.date.getTime(),
                                            format: 'YYYY / MM / DD',
                                        })}
                                    </span>
                                    <span className='calendar-item-info-date-time'>
                                        {getDateStringWithFormat({
                                            timestamp: item.date.getTime(),
                                            format: 'hh:mm',
                                        })}
                                    </span>
                                </div>
                            </div>
                        </a>;
                    })}
                </div>
            </div>
        </div>;
    }
}

PbplusCalendar.propTypes = {
    selectedDate: PropTypes.object.isRequired,
    month: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]).isRequired,
    year: PropTypes.number.isRequired,
    events: PropTypes.array.isRequired,
    promotions: PropTypes.array.isRequired,
    selectDate: PropTypes.func.isRequired,
    goThisMonth: PropTypes.func.isRequired,
    goNextMonth: PropTypes.func.isRequired,
    goPreviousMonth: PropTypes.func.isRequired,
    fetchCommingEvents: PropTypes.func.isRequired,
};

export default PbplusCalendar;
