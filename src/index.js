import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import MediaQuery from 'react-responsive';
import App from './components/app';
import NewsContainer from './components/news_container';
import NewsDetail from './components/news_detail';
import UserCenter from './components/user_center';

render((
    <div>
        <MediaQuery query='(min-device-width: 1224px)'>
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={NewsContainer}></IndexRoute>
                    <Route path='/newsdetail/:newsId(/:type)' component={NewsDetail}></Route>
                    <Route path='/usercenter' component={UserCenter}></Route>
                </Route>
            </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
            <h1>移动设备页面</h1>
        </MediaQuery>
    </div>
), document.getElementById('root'));
