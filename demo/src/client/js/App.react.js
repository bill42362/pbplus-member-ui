// App.react.js
import React from 'react';
// import PBPlusMemberUi from 'pbplus-member-ui';
import { PbplusCalendar } from '../../../../src/js/index.js';
import '../css/app.less';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {year: 2017, month: 9};
        this.goPreviousMonth = this.goPreviousMonth.bind(this);
        this.goNextMonth = this.goNextMonth.bind(this);
    }
    goPreviousMonth() {
        let { year, month } = this.state;
        if(0 === +month) { year -= 1; month = 11; }
        else { month -= 1; }
        this.setState({ year, month });
    }
    goNextMonth() {
        let { year, month } = this.state;
        if(11 === +month) { year += 1; month = 0; }
        else { month += 1; }
        this.setState({ year, month });
    }
    render() {
        const { year, month } = this.state;
        return <div className='app'>
            <PbplusCalendar
                year={year} month={month}
                goPreviousMonth={this.goPreviousMonth}
                goNextMonth={this.goNextMonth}
            />
        </div>;
    }
}

export default App;
