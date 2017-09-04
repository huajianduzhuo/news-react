import React, { Component } from 'react';
import {Row, Col, BackTop} from 'antd';
import Axios from 'axios';
import NewsImageBlock from './news_image_block';
import NewsComments from './news_comments';

class NewsDetail extends Component {
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
        let type = this.props.params.type || 'top';
        let {pagecontent} = this.state.news;
        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={16} className='container'>
                        <div dangerouslySetInnerHTML={{__html: pagecontent}}></div>
                        <hr />
                        <NewsComments uniquekey={this.props.params.newsId}></NewsComments>
                    </Col>
                    <Col span={6}>
                        <NewsImageBlock type={type} count={40} title='相关新闻' cardWidth='100%' imageWidth='150px'></NewsImageBlock>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <BackTop />
            </div>
        );
    }
}

export default NewsDetail;