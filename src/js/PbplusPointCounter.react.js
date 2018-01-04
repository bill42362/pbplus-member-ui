// PbplusPointCounter.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import { addCommaToDigit } from './utils.js';
import PbplusPointCounterRewardTypeTab from './PbplusPointCounterRewardTypeTab.react.js';
import PbplusPointCounterVirtualReward from './PbplusPointCounterVirtualReward.react.js';
import PbplusPointCounterRealReward from './PbplusPointCounterRealReward.react.js';
import PbplusPointCounterReceiverInfo from './PbplusPointCounterReceiverInfo.react.js';
import '../css/pbplus-point-counter.less';

class PbplusPointCounter extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
    submit() {
        const { rewards } = this.props;
        const orders = rewards.filter(reward => 0 < reward.selectedCount);
        this.props.submit({ orders });
    }
    componentDidMount() { this.props.fetchRewardList(); this.props.fetchPoints(); }
    render() {
        const { rewardTypeTab, usingNotice, isNoticeChecked, updateIsNoticeChecked, receiverInfo } = this.props;
        const { points, rewards, usingRewardType, updateRewardSelectCount } = this.props;
        const submitClassName = isNoticeChecked ? '' : ' pbplus-disabled';
        return <div className='pbplus-point-counter'>
            <div className='pbplus-point-counter-current-points'>
                目前紅利點數
                <span className='pbplus-point-counter-current-points-digit'>
                    {addCommaToDigit({number: points})}
                </span>
                點 (
                <a
                    className='pbplus-point-counter-current-points-info'
                    href='http://x.pbplus.me/point' target='_blank'
                >?</a>
                )
            </div>
            {!!rewardTypeTab && <div className='pbplus-point-counter-reward-type-tab-wrapper'>
                {rewardTypeTab}
            </div>}
            <div className='pbplus-point-counter-select-panel'>
                {rewards.map((reward, index) => {
                    // Stop considering reward amount because of system limit on 91APP.
                    // const canAddCount = points >= reward.pointCost && reward.selectedCount < reward.total;
                    const canAddCount = points >= reward.pointCost;
                    if('virtual' === usingRewardType) {
                        return <PbplusPointCounterVirtualReward
                            key={index}
                            canAddCount={canAddCount} reward={reward}
                            updateRewardSelectCount={updateRewardSelectCount}
                        />;
                    } else {
                        return <PbplusPointCounterRealReward
                            key={index}
                            canAddCount={canAddCount} reward={reward}
                            updateRewardSelectCount={updateRewardSelectCount}
                        />;
                    }
                })}
            </div>
            <div className='pbplus-point-counter-notice'>
                <h4 className='pbplus-point-counter-notice-title'>{usingNotice.title}</h4>
                <div className='pbplus-point-counter-notice-body'>
                    <ol>{usingNotice.contents.map((noticeContent, index) => {
                        return <li key={index}>
                            {noticeContent.content}
                            {!!noticeContent.uls && <ul>{noticeContent.uls.map((ul, index) => {
                                return <li key={index}>{ul.content}</li>;
                            })}</ul>}
                        </li>;
                    })}</ol>
                </div>
                <div className='pbplus-point-counter-notice-checker'>
                    <label className='pbplus-point-counter-notice-checker-label'>
                        <input
                            type='checkbox' className='pbplus-point-counter-notice-checker-checkbox'
                            checked={isNoticeChecked}
                            onChange={() => updateIsNoticeChecked({isNoticeChecked: !isNoticeChecked})}
                        />
                        如果你已經仔細閱讀以上注意事項並確認進行點數兌換現金折扣碼的話，請打勾。
                    </label>
                </div>
            </div>
            {('real' === usingRewardType && receiverInfo) && <div className='pbplus-point-counter-receiver-info-wrapper'>
                {receiverInfo}
            </div>}
            <div className='pbplus-point-counter-submit-button-wrapper'>
                <div
                    className={`pbplus-point-counter-submit-button${submitClassName}`}
                    role='button' onClick={isNoticeChecked ? this.submit : undefined}
                >送出</div>
            </div>
        </div>;
    }
}

PbplusPointCounter.propTypes = {
    points: PropTypes.number.isRequired,
    usingRewardType: PropTypes.string.isRequired,
    usingNotice: PropTypes.object.isRequired,
    rewardTypeTab: PropTypes.element,
    rewards: PropTypes.array.isRequired,
    updateRewardSelectCount: PropTypes.func.isRequired,
    fetchRewardList: PropTypes.func.isRequired,
    fetchPoints: PropTypes.func.isRequired,
    updateIsNoticeChecked: PropTypes.func.isRequired,
    receiverInfo: PropTypes.element,
    submit: PropTypes.func.isRequired,
};

export default PbplusPointCounter;
