// PbplusCalendar.react.js
'use strict';
import React from 'react';
import '../css/pbplus-calendar.less';

const calendarWeeks = [
    ['00', '00', '00', '00', '00', '01', '02'],
    ['03', '04', '05', '06', '07', '08', '09'],
    ['10', '11', '12', '13', '14', '15', '16'],
    ['17', '18', '19', '20', '21', '22', '23'],
    ['24', '25', '26', '27', '28', '29', '30'],
];
class PbplusCalendar extends React.Component {
    render() {
        return <div className='pbplus-calendar'>
            <div className='calendar-header'>
                <div className='calendar-month-selector'>
                    <div className='calendar-last-month-button' role='button'>{'<'}</div>
                    <div className='calendar-month-display'>九月 2017</div>
                    <div className='calendar-next-month-button' role='button'>{'>'}</div>
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
                                return <div className='calendar-day' key={index}>{calendarDay}</div>;
                            })}
                        </div>;
                    })}
                </div>
            </div>
        </div>;
    }
}

export default PbplusCalendar;
