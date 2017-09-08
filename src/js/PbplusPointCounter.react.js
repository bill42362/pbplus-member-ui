// PbplusPointCounter.react.js
'use strict';
import React from 'react';
import '../css/pbplus-point-counter.less';

class PbplusPointCounter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { } = this.props;
        return <div className='pbplus-point-counter'>
            兌換點數
        </div>;
    }
}

export default PbplusPointCounter;
