// MemberInputUnit.react.js
'use strict';
import React from 'react';
import '../css/member-input-unit.less';

class MemberInputUnit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: `${Math.random()}${Math.random()}${Math.random()}`};
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) { this.props.onChange({value: e.target.value}); }
    render() {
        const { id } = this.state;
        const { title, value, isPassed, status = 'default', info, inputProps = {}, onChange } = this.props;
        return <div className={`member-input-unit member-input-unit-${status}`}>
            <label htmlFor={id}>{title}</label>
            <input id={id} title={title} value={value} onChange={this.onChange} {...inputProps} />
            <div className='info'>{info}</div>
        </div>;
    }
}

export default MemberInputUnit;
