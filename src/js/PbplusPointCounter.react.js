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
            <div className='pbplus-point-counter-current-points'>
                目前紅利點數
                <span className='pbplus-point-counter-current-points-digit'>2,300</span>
                點 (
                <a className='pbplus-point-counter-current-points-info'>?</a>
                )
            </div>
            <div className='pbplus-point-counter-select-panel'>
                <h4 className='pbplus-point-counter-select-panel-header'>選擇器</h4>
                選擇器
            </div>
            <div className='pbplus-point-counter-notice'>
                <h4 className='pbplus-point-counter-notice-title'>注意事項</h4>
                <div className='pbplus-point-counter-notice-body'>
                    <ol>
                        <li>
                            紅利點數轉入計算時間: 
                            <ul>
                                <li>好物商城購物後 30 天，確定通過您的鑑賞期無退貨後轉入。</li>
                                <li>報名揪in活動結束後五個工作天，確定您無退費後轉入。</li>
                            </ul>
                        </li>
                        <li>每次從點數兌換現金的作業，請給 pb+ 小編五個工作天。</li>
                        <li>使用紅利點數折抵之消費，若退貨點數不予退回喔!</li>
                        <li>可折抵之金額依照商品及活動類型有不同上限。</li>
                        <li>
                            Pb+ 的管理員會隨時注意點數的使用情形，為所有會員規劃並調整紅利的使用規則，屆時以本頁公佈辦法為主。
                        </li>
                        <li>商城折扣碼及報名折扣碼不能交換使用。</li>
                        <li>
                            如果對使用紅利有任何的問題，歡迎
                            <a href='#' target='_blank'>聯絡我們</a>。
                        </li>
                    </ol>
                </div>
                <div className='pbplus-point-counter-notice-checker'>
                    <label className='pbplus-point-counter-notice-checker-label'>
                        <input type='checkbox' className='pbplus-point-counter-notice-checker-checkbox' />
                        如果你已經仔細閱讀以賶注意事項並確認進行點數兌換現金折扣碼的話，請打勾。
                    </label>
                </div>
            </div>
            <div className='pbplus-point-counter-submit-button-wrapper'>
                <div className='pbplus-point-counter-submit-button' role='button'>送出</div>
            </div>
        </div>;
    }
}

export default PbplusPointCounter;
