import React, { Component, PropTypes } from 'react';

import { Card } from 'antd';
import Axios from 'axios';
import { Link } from 'react-router';

class NewsImageBlock extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        cardWidth: PropTypes.string.isRequired,
        imageWidth: PropTypes.string.isRequired
    }
    state = {  
        newsArr: null
    }
    componentDidMount() {
        let {type, count } = this.props;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`;
        Axios.get(url)
            .then(({data}) => {
                if(data){
                    let newsArr = data.map(({uniquekey, title, author_name, thumbnail_pic_s}) => ({uniquekey, title, author_name, thumbnail_pic_s}));
                    this.setState({newsArr});
                }
            });
    }
    render() {
        let {title, cardWidth, imageWidth} = this.props;
        let {newsArr} = this.state;
        let {type} = this.props;
        let imgStyle = {
            width: imageWidth,
            height: '90px',
            display: 'block'
        };
        let titleStyle = {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: imageWidth
        };
        let imageNewsList = !newsArr 
            ? (
                <h3>暂无新闻</h3>
            )
            : (
                newsArr.map((news, index) => (
                    <div key={index} className='imageblock'>
                        <Link to={`/newsdetail/${news.uniquekey}/${type}`}>
                            <div>
                                <img src={news.thumbnail_pic_s} style={imgStyle} alt='' />
                            </div>
                            <div className='custom-card'>
                                <h3 style={titleStyle}>{news.title}</h3>
                                <p>{news.author_name}</p>
                            </div>
                        </Link>
                    </div>
                ))
            );
        return (
            <Card title={title} style={{width: cardWidth}} className='topNewsList'>
                {imageNewsList}
            </Card>
        );
    }
}

export default NewsImageBlock;