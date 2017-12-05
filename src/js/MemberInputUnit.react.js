// MemberInputUnit.react.js
'use strict';
import React from 'react';
import '../css/member-input-unit.less';

import LockedIcon from '../img/icon_lock.png';

class MemberInputUnit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: `${Math.random()}${Math.random()}${Math.random()}`};
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) { this.props.onChange({value: e.target.value}); }
    render() {
        const { id } = this.state;
        const {
            title, info, status = 'default',
            value, onChange,
            inputProps = {},
            isLocked, lockedInfo
        } = this.props;
        const lockedClassName = isLocked ? ' member-input-unit-locked' : '';
        if(isLocked) { inputProps.readOnly = true; }
        return <div className={`member-input-unit member-input-unit-${status}${lockedClassName}`}>
            <label htmlFor={id}>{title}</label>
            <input
                id={id} title={title}
                value={value} onChange={this.onChange}
                {...inputProps}
            />
            {isLocked && <div className='locked-icon'><img src={LockedIcon} /></div>}
            <div className='info'>{info}</div>
            {isLocked && <div className='locked-info'>
                <div className='locked-info-text'>{lockedInfo}</div>
            </div>}
        </div>;
    }
}

export default MemberInputUnit;
