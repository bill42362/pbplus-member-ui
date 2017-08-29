// App.react.js
import React from 'react';
// import PBPlusMemberUi from 'pbplus-member-ui';
import { PbplusCalendar } from '../../../../src/js/index.js';
import '../css/app.less';

class App extends React.Component {
    constructor(props) {
        super(props);
        const today = new Date();
        this.state = {year: today.getFullYear(), month: today.getMonth()};
        this.goPreviousMonth = this.goPreviousMonth.bind(this);
        this.goThisMonth = this.goThisMonth.bind(this);
        this.goNextMonth = this.goNextMonth.bind(this);
    }
    goPreviousMonth() {
        let { year, month } = this.state;
        if(0 === +month) { year -= 1; month = 11; }
        else { month -= 1; }
        this.setState({ year, month });
    }
    goThisMonth() {
        const today = new Date();
        this.setState({year: today.getFullYear(), month: today.getMonth()});
    }
    goNextMonth() {
        let { year, month } = this.state;
        if(11 === +month) { year += 1; month = 0; }
        else { month += 1; }
        this.setState({ year, month });
    }
    render() {
        const { goPreviousMonth, goThisMonth, goNextMonth } = this;
        const { year, month } = this.state;
        return <div className='app'>
            <PbplusCalendar {...{ year, month, goPreviousMonth, goThisMonth, goNextMonth }} />
        </div>;
    }
}

export default App;
