import React, { Component } from 'react';

class NewsContainer extends Component {
    state = {  }
    render() {
        return (
            <div>
                <h1>新闻列表</h1>
                <ul>
                    <li>
                        <a href="/#/newsdetail/1">新闻1</a>
                    </li>
                    <li>
                        <a href="/#/newsdetail/2">新闻2</a>
                    </li>
                    <li>
                        <a href="/#/usercenter">用户中心</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NewsContainer;