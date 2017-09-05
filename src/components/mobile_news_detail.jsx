import React, { Component } from 'react';
import {BackTop} from 'antd';
import Axios from 'axios';
import NewsComments from './news_comments';

class MobileNewsDetail extends Component {
    state = {  
        news: {}
    }
    componentDidMount() {
        let {newsId} = this.props.params;
        this.changeState(newsId);
    }

    componentWillReceiveProps(nextProps) {
        let {newsId} = nextProps.params;
        this.changeState(newsId);
    }

    // 接受到新的新闻id，更新新闻详情
    changeState = (newsId) => {
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${newsId}`;
        Axios.get(url)
            .then((response) => {
                let news = response.data;
                this.setState({news});
                document.title = news.title;
            });
    }
    render() {
        let {pagecontent} = this.state.news;
        return (
            <div style={{padding: '10px'}}>
                <div className='mobileDetailsContainer' dangerouslySetInnerHTML={{__html: pagecontent}}></div>
                <hr />
                <NewsComments uniquekey={this.props.params.newsId}></NewsComments>
                <BackTop /> 
            </div>
        );
    }
}

export default MobileNewsDetail;