import React, { Component, PropTypes } from 'react';
import {Card} from 'antd';
import Axios from 'axios';
import {Link} from 'react-router';

class MobileNewsBlock extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired
    }
    state = {  
        newsArr: []
    }
    componentDidMount() {
        let {type, count} = this.props;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`;
        Axios.get(url)
            .then(response => {
                let newsArr = response.data;
                this.setState({newsArr});
            });
    }
    render() {
        let {newsArr} = this.state;
        let newsList = newsArr.length 
            ? (
                newsArr.map((news, index) => (
                    <Card key={index} className='m_article list-item special_section clearfix'>
                        <Link to={`/newsdetail/${news.uniquekey}`}>
                            <div className='m_article_img'>
                                <img src={news.thumbnail_pic_s} alt={news.title} />
                            </div>
                            <div className='m_article_info'>
                                <div className='m_article_title'>
                                    <span>{news.title}</span>
                                </div>
                                <div className='m_article_desc clearfix'>
                                    <div className='m_article_desc_l'>
                                        <span className='m_article_channel'>{news.realtype}</span>
                                        <span className='m_article_time'>{news.date}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Card>
                ))
            )
            : <h3>暂无新闻</h3>;
        return (
            <div>
                {newsList}
            </div>
        );
    }
}

export default MobileNewsBlock;