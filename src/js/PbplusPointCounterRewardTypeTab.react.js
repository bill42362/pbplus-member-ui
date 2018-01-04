// PbplusPointCounterRewardTypeTab.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import '../css/pbplus-point-counter-reward-type-tab.less';

class PbplusPointCounterRewardTypeTab extends React.Component {
    constructor(props) { super(props); }
    render() {
        const { usingRewardType, rewardTypes, updateUsingRewardType } = this.props;
        return <div className='pbplus-point-counter-reward-type-tab'>
            {rewardTypes.map((rewardType, index) => {
                const isActiveTab = usingRewardType === rewardType.key;
                const activeTabClassName = isActiveTab ? ' pbplus-active' : '';
                return <div
                    key={index}
                    className={`pbplus-point-counter-reward-type-item${activeTabClassName}`}
                    onClick={() => updateUsingRewardType({rewardType: rewardType.key})}
                >
                    {rewardType.display}
                </div>;
            })}
        </div>;
    }
}

PbplusPointCounterRewardTypeTab.propTypes = {
    rewardTypes: PropTypes.array.isRequired,
    usingRewardType: PropTypes.string.isRequired,
    updateUsingRewardType: PropTypes.func.isRequired,
};

export default PbplusPointCounterRewardTypeTab;
