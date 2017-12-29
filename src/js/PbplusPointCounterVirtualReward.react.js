// PbplusPointCounterVituralReward.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import '../css/pbplus-point-counter-virtual-reward.less';

import PlusImage from '../img/plus.png';
import PlusHoverImage from '../img/plus_hover.png';
import MinusImage from '../img/minus.png';
import MinusHoverImage from '../img/minus_hover.png';

class PbplusPointCounterVituralReward extends React.Component {
    constructor(props) { super(props); }
    render() {
        const { canAddCount, reward, updateRewardSelectCount } = this.props;
        const addCountClassName = canAddCount ? '' : ' pbplus-disabled';
        const canRemoveCount = 0 < reward.selectedCount;
        const removeCountClassName = canRemoveCount ? '' : ' pbplus-disabled';
        return <div className='pbplus-point-counter-virtual-reward'>
            <div className='pbplus-point-counter-virtual-reward-name'>{reward.name}</div>
            {/*
                // Stop considering reward amount because of system limit on 91APP.
                <div className='pbplus-point-counter-virtual-reward-remain'>尚餘數量：{reward.total}</div>
              */}
            <div className='pbplus-point-counter-virtual-reward-transaction'>
                <div className='pbplus-point-counter-virtual-reward-pricing'>
                    <div className='pbplus-point-counter-virtual-reward-value'>NT$ {reward.rewardValue}</div>
                    <div className='pbplus-point-counter-virtual-reward-points'>（{reward.pointCost}點）</div>
                </div>
                <div className='pbplus-point-counter-virtual-reward-selector'>
                    <div
                        className={`pbplus-point-counter-virtual-reward-selector-button${removeCountClassName}`}
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
                        className='pbplus-point-counter-virtual-reward-selector-input'
                        value={reward.selectedCount}
                    />
                    <div
                        className={`pbplus-point-counter-virtual-reward-selector-button${addCountClassName}`}
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
        </div>;
    }
}

PbplusPointCounterVituralReward.propTypes = {
    reward: PropTypes.object.isRequired,
    canAddCount: PropTypes.bool.isRequired,
    updateRewardSelectCount: PropTypes.func.isRequired,
};

export default PbplusPointCounterVituralReward;
