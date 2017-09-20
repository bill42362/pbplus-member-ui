// PbplusNoticeCenter.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import PbplusNotice from './PbplusNotice.react.js';
import { getDateStringWithFormat } from './utils.js';
import '../css/pbplus-notice-center.less';

class PbplusNoticeCenter extends React.Component {
    constructor(props) { super(props); }
    componentDidMount() { this.props.fetchNotices(); }
    render() {
        const { notices, expendedNoticeId, expendNotice, clearExpendNotice } = this.props;
        return <div className='pbplus-notice-center'>
            <div className='pbplus-notice-center-notices'>
                {notices.map((notice, index) => {
                    const shouldExpend = expendedNoticeId === `${notice.id}`;
                    return <PbplusNotice
                        key={index}
                        notice={notice} shouldExpend={shouldExpend}
                        expendNotice={expendNotice}
                        clearExpendNotice={clearExpendNotice}
                    />;
                })}
            </div>
        </div>;
    }
}

PbplusNoticeCenter.propTypes = {
    notices: PropTypes.array.isRequired,
    expendedNoticeId: PropTypes.string.isRequired,
    expendNotice: PropTypes.func.isRequired,
    clearExpendNotice: PropTypes.func.isRequired,
    fetchNotices: PropTypes.func.isRequired,
};

export default PbplusNoticeCenter;
