import React, { Component, PropTypes } from 'react';
import Axios from 'axios';
import {Card} from 'antd';
import {Link} from 'react-router';

class NewsBlock extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired
    }
    state = {  
        newsArr: null
    }
    componentDidMount() {
        let {type, count} = this.props;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`;
        Axios.get(url)
            .then(({data}) => {
                if(data){
                    let newsArr = data.map(({uniquekey, title}) => ({uniquekey, title}));
                    this.setState({newsArr});
                }
            });
    }
    render() {
        let {newsArr} = this.state;
        let newsList = !newsArr 
            ? (
                <h3>暂无新闻</h3>
            )
            : (
                newsArr.map((news, index) => (
                    <li key={index}>
                        <Link to={`/newsdetail/${news.uniquekey}`}>{news.title}</Link>
                    </li>
                ))
            );
        return (
            <Card className='topNewsList'>
                <ul>
                    {newsList}
                </ul>
            </Card>
        );
    }
}

export default NewsBlock;