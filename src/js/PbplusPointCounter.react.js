// PbplusPointCounter.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import { addCommaToDigit } from './utils.js';
import PbplusPointCounterVirtualReward from './PbplusPointCounterVirtualReward.react.js';
import '../css/pbplus-point-counter.less';

class PbplusPointCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isNoticeChecked: false};
        this.onCheckerChange = this.onCheckerChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    submit() {
        const { rewards } = this.props;
        const orders = rewards.filter(reward => 0 < reward.selectedCount);
        this.props.submit({ orders });
    }
    onCheckerChange(e) { this.setState({isNoticeChecked: e.target.checked}); }
    componentDidMount() { this.props.fetchRewardList(); this.props.fetchPoints(); }
    render() {
        const { isNoticeChecked } = this.state;
        const { points, rewards, updateRewardSelectCount } = this.props;
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
            <div className='pbplus-point-counter-select-panel'>
                {rewards.map((reward, index) => {
                    // Stop considering reward amount because of system limit on 91APP.
                    // const canAddCount = points >= reward.pointCost && reward.selectedCount < reward.total;
                    const canAddCount = points >= reward.pointCost;
                    return <PbplusPointCounterVirtualReward
                        key={index}
                        canAddCount={canAddCount} reward={reward}
                        updateRewardSelectCount={updateRewardSelectCount}
                    />;
                })}
            </div>
            <div className='pbplus-point-counter-notice'>
                <h4 className='pbplus-point-counter-notice-title'>注意事項</h4>
                <div className='pbplus-point-counter-notice-body'>
                    <ol>
                        <li>
                            紅利點數轉入計算時間: 
                            <ul>
                                <li>好物商城購物確認通過鑑賞期無退貨後轉入(每月15、30日入帳、遇假日則延後)。</li>
                                <li>報名揪in活動，於活動結束後 5 個工作天，確定您無退費後轉入。</li>
                            </ul>
                        </li>
                        <li>商城折扣碼及報名折扣碼不能交換使用。</li>
                        <li>每次從點數兌換現金的作業，請給 pb+ 小編 10 個工作天。</li>
                        <li>使用紅利點數折抵之消費，若退貨點數不予退回喔!</li>
                        <li>可折抵之金額依照商品及活動類型有不同上限。</li>
                        <li>
                            Pb+ 的管理員會隨時注意點數的使用情形，為所有會員規劃並調整紅利的使用規則，屆時以本頁公佈辦法為主。
                        </li>
                        <li>
                            如果對使用紅利有任何的問題，歡迎
                            <a href='mailto:support@pcgbros.com'>聯絡我們</a>。
                        </li>
                    </ol>
                </div>
                <div className='pbplus-point-counter-notice-checker'>
                    <label className='pbplus-point-counter-notice-checker-label'>
                        <input
                            type='checkbox' className='pbplus-point-counter-notice-checker-checkbox'
                            checked={isNoticeChecked} onChange={this.onCheckerChange}
                        />
                        如果你已經仔細閱讀以上注意事項並確認進行點數兌換現金折扣碼的話，請打勾。
                    </label>
                </div>
            </div>
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
    rewards: PropTypes.array.isRequired,
    updateRewardSelectCount: PropTypes.func.isRequired,
    fetchRewardList: PropTypes.func.isRequired,
    fetchPoints: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
};

export default PbplusPointCounter;
