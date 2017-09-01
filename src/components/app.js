import React, { Component } from 'react';
import NewsHeader from './news_header';
import NewsFooter from './news_footer';
import '../componentCSSs/app.css';
/* 
    根路由组件--App
*/

class App extends Component {
    state = {  }
    render() {
        return (
            <div>
                <NewsHeader />
                {this.props.children}
                <NewsFooter />
            </div>
        );
    }
}

export default App;