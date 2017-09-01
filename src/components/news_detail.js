import React, { Component } from 'react';

class NewsDetail extends Component {
    state = {  }
    render() {
        return (
            <div>
                新闻详情 -- {this.props.params.newsId}
            </div>
        );
    }
}

export default NewsDetail;