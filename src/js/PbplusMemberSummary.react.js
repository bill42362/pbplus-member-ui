// PbplusMemberSummary.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import { getDateStringWithFormat, addCommaToDigit } from './utils.js';
import PbplusMeterRing from './PbplusMeterRing.react.js';
import '../css/pbplus-member-summary.less';

import MockUserPhoto from '../img/mock_user_photo.jpg';

class PbplusMemberSummary extends React.Component {
    constructor(props) { super(props); }
    componentDidMount() { this.props.fetchMemberSummary(); }
    render() {
        const {
            userPhoto, nickname, registeredDate, coins, eventCounts,
            achievements, points, pointsLastRenewDate, fetchMemberSummary
        } = this.props;
        const eventCountsSum = eventCounts.reduce((current, eventCount) => current + eventCount.count, 0);
        return <div className='pbplus-member-summary'>
            <div className='pbplus-member-summary-header'>
                <div className='pbplus-member-summary-photo'>
                    <img
                        className='pbplus-member-summary-photo'
                        src={userPhoto || MockUserPhoto}
                        title='顯示圖片'
                    />
                </div>
                <div className='pbplus-member-summary-nickname'>{nickname}</div>
                <div className='pbplus-member-summary-registered-date'>
                    {getDateStringWithFormat({
                        timestamp: registeredDate.getTime(),
                        format: '自 YYYY 年 MM 月加入會員',
                    })}
                </div>
            </div>
            <div className='pbplus-member-summary-meter'>
                <div className='pbplus-member-summary-meter-body-wrapper'>
                    <div className='pbplus-member-summary-meter-body'>
                        <div className='pbplus-member-summary-meter-body-background'></div>
                        <div className='pbplus-member-summary-meter-body-ring-wrapper'>
                            <PbplusMeterRing arcs={eventCounts.map(eventCount => {
                                return {
                                    ratio: eventCount.count/eventCountsSum,
                                    color: eventCount.color,
                                };
                            })} />
                        </div>
                        <div className='pbplus-member-summary-meter-body-texts'>
                            <div className='pbplus-member-summary-meter-body-digit'>{coins}</div>
                            <div className='pbplus-member-summary-meter-body-description'>BMI</div>
                        </div>
                    </div>
                </div>
                <div className='pbplus-member-summary-meter-legends'>
                    {eventCounts.map((eventCount, index) => {
                        return <div
                            className='pbplus-member-summary-meter-legend' key={index}
                            style={{borderLeftColor: eventCount.color}}
                        >
                            {eventCount.display.replace(/%f.*$/, '')}
                            <span className='pbplus-member-summary-meter-legend-digit'>
                                {Math.floor(eventCount.count)}
                            </span>
                            {eventCount.display.replace(/^.*%f/, '')}
                        </div>;
                    })}
                </div>
            </div>
            <div className='pbplus-member-summary-achievements'>
                <div className='pbplus-member-summary-achievements-label'>成就</div>
                <div className='pbplus-member-summary-achievements-displays'>
                    {achievements.map((achievement, index) => {
                        return <div className='pbplus-member-summary-achievements-display' key={index}>
                            <img
                                className='pbplus-member-summary-achievements-display'
                                src={achievement.imageSrc} title={achievement.display}
                            />
                        </div>;
                    })}
                </div>
            </div>
            <div className='pbplus-member-summary-points'>
                <div className='pbplus-member-summary-points-display'>
                    目前累積
                    <span className='pbplus-member-summary-points-display-digit'>
                        {addCommaToDigit({number: points})}
                    </span>
                    點紅利
                </div>
                <div className='pbplus-member-summary-points-last-update-date'>
                    {getDateStringWithFormat({
                        timestamp: pointsLastRenewDate.getTime(),
                        format: '點數最後更新日期 YYYY/MM/DD',
                    })}
                </div>
            </div>
        </div>;
    }
}

PbplusMemberSummary.propTypes = {
    userPhoto: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    registeredDate: PropTypes.object.isRequired,
    coins: PropTypes.number.isRequired,
    eventCounts: PropTypes.array.isRequired,
    achievements: PropTypes.array.isRequired,
    points: PropTypes.number.isRequired,
    pointsLastRenewDate: PropTypes.object.isRequired,
    fetchMemberSummary: PropTypes.func.isRequired,
};

export default PbplusMemberSummary;
