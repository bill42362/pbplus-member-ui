// PbplusPointCounterReceiverInfo.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import MemberInputUnit from './MemberInputUnit.react.js';
import MemberMobileInputUnit from './MemberMobileInputUnit.react.js';
import '../css/pbplus-point-counter-receiver-info.less';

class PbplusPointCounterReceiverInfo extends React.Component {
    constructor(props) { super(props); }
    render() {
        const { name, country, mobile, zipcode, address, updateReceiverInfo } = this.props;
        return <div className='pbplus-point-counter-receiver-info'>
            <div className='pbplus-point-counter-receiver-info-row'>
                <div className='pbplus-point-counter-receiver-info-name-wrapper'>
                    <MemberInputUnit
                        title='姓名' value={name}
                        onChange={({ value }) => updateReceiverInfo({newValueMap: {name: value}})}
                    />
                </div>
            </div>
            <div className='pbplus-point-counter-receiver-info-row'>
                <div className='pbplus-point-counter-receiver-info-mobile-wrapper'>
                    <MemberMobileInputUnit
                        title='手機' mobile={mobile} country={country}
                        onChange={({ mobile, country }) => updateReceiverInfo({newValueMap: { mobile, country }})}
                    />
                </div>
            </div>
            <div className='pbplus-point-counter-receiver-info-row'>
                <div className='pbplus-point-counter-receiver-info-zipcode-wrapper'>
                    <MemberInputUnit
                        title='郵遞區號' value={zipcode} inputProps={{type: 'number'}}
                        onChange={({ value }) => updateReceiverInfo({newValueMap: {zipcode: value}})}
                    />
                </div>
                <div className='pbplus-point-counter-receiver-info-address-wrapper'>
                    <MemberInputUnit
                        title='地址' value={address}
                        onChange={({ value }) => updateReceiverInfo({newValueMap: {address: value}})}
                    />
                </div>
            </div>
        </div>;
    }
}

PbplusPointCounterReceiverInfo.propTypes = {
    name: PropTypes.string,
    country: PropTypes.string,
    mobile: PropTypes.string,
    zipcode: PropTypes.string,
    address: PropTypes.string,
    updateReceiverInfo: PropTypes.func.isRequired,
};

export default PbplusPointCounterReceiverInfo;
