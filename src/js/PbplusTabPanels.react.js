// PbplusTabPanels.react.js
'use strict'
import React from 'react';
import '../css/pbplus-tab-panels.less';

class PbplusTabPanels extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        let target = undefined, currentTarget = e.target;
        while(!target && currentTarget) {
            if(currentTarget.getAttribute('data-key')) { target = currentTarget; }
            currentTarget = currentTarget.parentNode;
        }
        if(target && this.props.setActiveKey) {
            this.props.setActiveKey({key: target.getAttribute('data-key')});
        }
    }
    render() {
        const { className, activeKey } = this.props;
        let { children } = this.props;
        if(children && !children.length) { children = [ children ]; }
        const activeChild = children.filter(child => {
            return activeKey === child.props['data-key'];
        })[0] || children[0];
        return <div className={`pbplus-tab-panels ${className || ''}`}>
            <div className='tab-panels-tabs'>
                {children.map((child, index) => {
                    const isActivedTabClassName = activeKey === child.props['data-key'] ? ' active' : '';
                    return <span
                        className={`tab-panels-tab${isActivedTabClassName}`} key={index}
                        data-key={child.props['data-key']} onClick={this.onClick}
                    >
                        <img className='tab-panels-tab-icon' src={child.props['data-icon']} />
                        <span className='tab-panels-tab-display' >{child.props['data-display']}</span>
                    </span>;
                })}
            </div>
            <div className='tab-panels-panels'>{activeChild}</div>
        </div>;
    }
}

export default PbplusTabPanels;
