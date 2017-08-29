// PbplusCalendar.react.js
'use strict';
import React from 'react';
import '../css/pbplus-calendar.less';

const monthStringMap = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十' , '十一', '十二'];

class PbplusCalendar extends React.Component {
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
    preventSelect(e) { e.preventDefault(); }
    render() {
        const { month, year, goThisMonth, goPreviousMonth, goNextMonth } = this.props;
        const date = new Date(year, month);
        const monthString = monthStringMap[date.getMonth()];

        const datesOfPreviousMonth = this.getDatesOfPreviousMonth(date);
        const datesOfThisMonth = this.getDatesOfThisMonth(date);
        const datesOfNextMonth = this.getDatesOfNextMonth(date);

        const previousMonthDateObjects = datesOfPreviousMonth.map(date => ({isThisMonth: false, date}));
        const thisMonthDateObjects = datesOfThisMonth.map(date => ({isThisMonth: true, date}));
        const nextMonthDateObjects = datesOfNextMonth.map(date => ({isThisMonth: false, date}));

        const calendarDates = [...previousMonthDateObjects, ...thisMonthDateObjects, ...nextMonthDateObjects];
        const tempArray = [...calendarDates];
        const calendarWeeks = [];
        while(0 < tempArray.length) { calendarWeeks.push(tempArray.splice(0, 7)); }

        return <div className='pbplus-calendar'>
            <div className='calendar-header'>
                <div className='calendar-month-selector'>
                    <div
                        className='calendar-last-month-button' role='button'
                        onClick={goPreviousMonth} onMouseDown={this.preventSelect}
                    >{'<'}</div>
                    <div
                        className='calendar-month-display' role='button'
                        onClick={goThisMonth} onMouseDown={this.preventSelect}
                    >{`${monthString}月 ${year}`}</div>
                    <div
                        className='calendar-next-month-button' role='button'
                        onClick={goNextMonth} onMouseDown={this.preventSelect}
                    >{'>'}</div>
                </div>
                <div className='calendar-legend'>
                    <div className='calendar-legend-item'>即將來臨的活動/優惠</div>
                    <div className='calendar-legend-item'>已報名之活動</div>
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
                                const notThisMonthClassName = calendarDay.isThisMonth ? '' : ' not-this-month';
                                return <div className={`calendar-day${notThisMonthClassName}`} key={index}>
                                    {`${('0' + calendarDay.date).slice(-2)}`}
                                </div>;
                            })}
                        </div>;
                    })}
                </div>
            </div>
        </div>;
    }
}

export default PbplusCalendar;
