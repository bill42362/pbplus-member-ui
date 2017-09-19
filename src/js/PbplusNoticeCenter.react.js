// PbplusNoticeCenter.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import '../css/pbplus-notice-center.less';

class PbplusNoticeCenter extends React.Component {
    constructor(props) { super(props); }
    componentDidMount() { this.props.fetchNotices(); }
    render() {
        const { notices } = this.props;
        return <div className='pbplus-notice-center'>
        </div>;
    }
}

PbplusNoticeCenter.propTypes = {
    notices: PropTypes.array.isRequired,
    fetchNotices: PropTypes.func.isRequired,
};

export default PbplusNoticeCenter;
