// PbplusPointCounterRealReward.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import '../css/pbplus-point-counter-real-reward.less';

import PlusImage from '../img/plus.png';
import PlusHoverImage from '../img/plus_hover.png';
import MinusImage from '../img/minus.png';
import MinusHoverImage from '../img/minus_hover.png';
import MockRealRewardThumb from '../img/mock_real_reward_thumb.png';

class PbplusPointCounterRealReward extends React.Component {
    constructor(props) { super(props); }
    render() {
        const { canAddCount, reward, updateRewardSelectCount } = this.props;
        const addCountClassName = canAddCount ? '' : ' pbplus-disabled';
        const canRemoveCount = 0 < reward.selectedCount;
        const removeCountClassName = canRemoveCount ? '' : ' pbplus-disabled';
        return <div className='pbplus-point-counter-real-reward'>
            <div className='pbplus-point-counter-real-reward-thumb-wrapper'>
                <img
                    className='pbplus-point-counter-real-reward-thumb'
                    src={reward.thumb || MockRealRewardThumb}
                />
            </div>
            <div className='pbplus-point-counter-real-reward-content'>
                <div className='pbplus-point-counter-real-reward-name'>{reward.name}</div>
                <div className='pbplus-point-counter-real-reward-pricing'>
                    <div className='pbplus-point-counter-real-reward-value'>NT$ {reward.rewardValue}</div>
                    <div className='pbplus-point-counter-real-reward-points'>（{reward.pointCost}點）</div>
                </div>
                <div className='pbplus-point-counter-real-reward-transaction'>
                    <div className='pbplus-point-counter-real-reward-remain'>尚餘：{reward.total}</div>
                    <div className='pbplus-point-counter-real-reward-selector'>
                        <div
                            className={`pbplus-point-counter-real-reward-selector-button${removeCountClassName}`}
                            role='button'
                            onClick={
                                canRemoveCount
                                ? () => { updateRewardSelectCount({
                                    id: reward.id,
                                    count: reward.selectedCount - 1,
                                }); }
                                : undefined
                            }
                        >
                            <img className='selector-button' title='remove' src={MinusImage} />
                            <img className='selector-button-hover' title='remove' src={MinusHoverImage} />
                        </div>
                        <input
                            className='pbplus-point-counter-real-reward-selector-input'
                            value={reward.selectedCount}
                        />
                        <div
                            className={`pbplus-point-counter-real-reward-selector-button${addCountClassName}`}
                            role='button'
                            onClick={
                                canAddCount
                                ? () => { updateRewardSelectCount({
                                    id: reward.id,
                                    count: reward.selectedCount + 1,
                                }); }
                                : undefined
                            }
                        >
                            <img className='selector-button' title='add' src={PlusImage} />
                            <img className='selector-button-hover' title='add' src={PlusHoverImage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

PbplusPointCounterRealReward.propTypes = {
    reward: PropTypes.object.isRequired,
    canAddCount: PropTypes.bool.isRequired,
    updateRewardSelectCount: PropTypes.func.isRequired,
};

export default PbplusPointCounterRealReward;
