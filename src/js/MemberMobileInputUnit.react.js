// MemberMobileInputUnit.react.js
'use strict';
import React from 'react';
import ReactMobileInput from 'ReactTelephoneInput/lib/withStyles';
import '../css/member-mobile-input-unit.less';

import CountryFlags from '../img/country_flags.png';
import LockedIcon from '../img/icon_lock.png';

class MemberMobileInputUnit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: `${Math.random()}${Math.random()}${Math.random()}`};
        this.onChange = this.onChange.bind(this);
    }
    onChange(fullMobile, countryData) {
        const country = countryData.dialCode;
        const mobile = fullMobile.replace(`+${country}`, '').replace(/[^0-9]/g, '');
        this.props.onChange({ mobile, country });
    }
    render() {
        const { id } = this.state;
        const {
            title, info, status = 'default',
            mobile, country, onChange,
            inputProps = {},
            isLocked, lockedInfo
        } = this.props;
        const lockedClassName = isLocked ? ' member-mobile-input-unit-locked' : '';
        if(isLocked) { inputProps.readOnly = true; }
        return <div className={`member-mobile-input-unit member-mobile-input-unit-${status}${lockedClassName}`}>
            <label htmlFor={id}>{title}</label>
            <ReactMobileInput
                value={`${country}-${mobile}`}
                flagsImagePath={CountryFlags}
                defaultCountry='tw' preferredCountries={['tw', 'hk']}
                onChange={this.onChange} disabled={isLocked}
            />
            {isLocked && <div className='locked-icon'><img src={LockedIcon} /></div>}
            <div className='info'>{info}</div>
            {isLocked && <div className='locked-info'>
                <div className='locked-info-text'>{lockedInfo}</div>
            </div>}
        </div>;
    }
}

export default MemberMobileInputUnit;
