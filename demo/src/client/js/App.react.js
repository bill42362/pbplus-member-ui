// App.react.js
import React from 'react';
// import PBPlusMemberUi from 'pbplus-member-ui';
import { PbplusMemberCenter } from '../../../../src/js/index.js';
import '../css/app.less';

class App extends React.Component {
    constructor(props) { super(props); }
    render() {
        return <div className='app'>
            <PbplusMemberCenter />
        </div>;
    }
}

export default App;
