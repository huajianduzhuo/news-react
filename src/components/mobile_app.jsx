import React, { Component } from 'react';
import MobileNewsHeader from './mobile_news_header';
import NewsFooter from './news_footer';

import '../componentCSSs/mobile.css';

class MobileApp extends Component {
    state = {  }
    render() {
        return (
            <div>
                <MobileNewsHeader></MobileNewsHeader>
                {this.props.children}
                <NewsFooter></NewsFooter>
            </div>
        );
    }
}

export default MobileApp;