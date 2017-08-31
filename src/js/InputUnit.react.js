// Input.react.js
'use strict';
import React from 'react';
import '../css/input-unit.less';

class InputUnit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: `${Math.random()}${Math.random()}${Math.random()}`};
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) { this.props.onChange({value: e.target.value}); }
    render() {
        const { id } = this.state;
        const { title, value, isPassed, status = 'default', info, inputProps = {}, onChange } = this.props;
        return <div className={`input-unit input-unit-${status}`}>
            <label htmlFor={id}>{title}</label>
            <input id={id} title={title} value={value} onChange={this.onChange} {...inputProps} />
            <div className='info'>{info}</div>
        </div>;
    }
}

export default InputUnit;
