// PbplusBuyingLogs.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import { addCommaToDigit } from './utils.js';
import '../css/pbplus-buying-logs.less';

import DefaultEventBanner from '../img/event.jpg';
import DefaultPromotionBanner from '../img/promotion.jpg';

class PbplusBuyingLogs extends React.Component {
    constructor(props) { super(props); }
    componentDidMount() { this.props.fetchBuyingLogs(); }
    render() {
        const { logs } = this.props;
        const logsByDates = logs.reduce((current, log) => {
            const { date } = log;
            const logDateString = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
            const sameDateLogs = current.filter(logsByDate => logDateString === logsByDate.logDateString)[0];
            const isDateStringExisted = !!sameDateLogs;
            if(isDateStringExisted) {
                const indexOfSameDateLogs = current.indexOf(sameDateLogs);
                return [
                    ...current.slice(0, indexOfSameDateLogs),
                    {logs: [...sameDateLogs.logs, log], logDateString },
                    ...current.slice(indexOfSameDateLogs + 1),
                ];
            } else {
                return [...current, {logs: [log], logDateString }];
            }
        }, [])
        .sort((a, b) => a.logDateString > b.logDateString ? -1 : 1);
        return <div className='pbplus-buying-logs'>
            {logsByDates.map((logsByDate, dateIndex) => {
                return <div className='pbplus-buying-logs-date-group' key={dateIndex}>
                    <div className='pbplus-buying-logs-date-group-title'>
                        <div className='pbplus-buying-logs-date-group-title-date'>
                            消費日期
                            <span className='pbplus-buying-logs-date-group-title-date-display'>
                                {logsByDate.logDateString}
                            </span>
                        </div>
                    </div>
                    <div className='pbplus-buying-logs-date-group-logs'>
                        {logsByDate.logs.map((log, index) => {
                            const defaultBanner = 'event' === log.type ? DefaultEventBanner : DefaultPromotionBanner;
                            return <div className='pbplus-buying-logs-date-group-log' key={index}>
                                <div className='pbplus-buying-logs-date-group-log-display'>
                                    <div className='pbplus-buying-logs-date-group-log-banner'>
                                        <img
                                            className='pbplus-buying-logs-date-group-log-banner'
                                            title={log.title} src={log.bannerSrc || defaultBanner}
                                        />
                                    </div>
                                    <div className='pbplus-buying-logs-date-group-log-title'>{log.title}</div>
                                </div>
                                <div className='pbplus-buying-logs-date-group-log-pricing'>
                                    <div className='pbplus-buying-logs-date-group-log-subtotal'>
                                        <div className='pbplus-buying-logs-date-group-log-subtotal-title'>小計</div>
                                        <div className='pbplus-buying-logs-date-group-log-subtotal-digit'>
                                            {addCommaToDigit({number: log.price})}
                                        </div>
                                    </div>
                                    <div className='pbplus-buying-logs-date-group-log-payment'>
                                        <div className='pbplus-buying-logs-date-group-log-payment-fee-title'>金流手續費</div>
                                        <div className='pbplus-buying-logs-date-group-log-payment-method'>{log.paymentMethod}</div>
                                        <div className='pbplus-buying-logs-date-group-log-payment-fee-digit'>
                                            {addCommaToDigit({number: log.paymentFee})}
                                        </div>
                                    </div>
                                    <div className='pbplus-buying-logs-date-group-log-shipping'>
                                        <div className='pbplus-buying-logs-date-group-log-shipping-fee-title'>運費</div>
                                        <div className='pbplus-buying-logs-date-group-log-shipping-method'>{log.shippingMethod}</div>
                                        <div className='pbplus-buying-logs-date-group-log-shipping-fee-digit'>
                                            {addCommaToDigit({number: log.shippingFee})}
                                        </div>
                                    </div>
                                </div>
                                <div className='pbplus-buying-logs-date-group-log-total-price'>
                                    <div className='pbplus-buying-logs-date-group-log-total-price-title'>總計</div>
                                    <div className='pbplus-buying-logs-date-group-log-total-price-digit'>
                                        {addCommaToDigit({number: log.total})}
                                    </div>
                                </div>
                            </div>;
                        })}
                    </div>
                </div>;
            })}
        </div>;
    }
}

PbplusBuyingLogs.propTypes = {
    logs: PropTypes.array.isRequired,
    fetchBuyingLogs: PropTypes.func.isRequired,
};

export default PbplusBuyingLogs;
