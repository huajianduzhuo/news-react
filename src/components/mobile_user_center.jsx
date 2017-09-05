import React, { Component } from 'react';
import {Tabs, Card} from 'antd';
import {Link} from 'react-router';
import Axios from 'axios';

const TabPane = Tabs.TabPane;

class MobileUserCenter extends Component {
    state = {  
        userCollectionList: [],
        userCommentList: []
    }
    componentDidMount() {
        let userId = localStorage.getItem('userId');
        let collecUrl = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`;
        let commentUrl = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`;
        Axios.get(collecUrl)
            .then(({data}) => {
                let userCollectionList = data.map(({uniquekey, Title}) => {
                    return {uniquekey, Title};
                });
                this.setState({userCollectionList});
            });
        Axios.get(commentUrl)
            .then(({data}) => {
                let userCommentList = data.map(({uniquekey, Comments, datetime}) => {
                    return {uniquekey, Comments, datetime};
                });
                this.setState({userCommentList});
            });
    }
    render() {
        let {userCollectionList, userCommentList} = this.state;
        let collectionShow = userCollectionList.length === 0 
            ? (
                <p>您还没有收藏任何的新闻，快去收藏一些新闻吧。</p>
            ) 
            : (
                userCollectionList.map(({uniquekey, Title}, index) => (
                    <Card key={index} title={uniquekey} extra={<Link to={`/newsdetail/${uniquekey}`}>查看</Link>}>
                        <p>{Title}</p>
                    </Card>
                ))
            );
        let commentShow = userCommentList.length === 0 
            ? (
                <p>您还没有发表过任何评论。</p>
            ) 
            : (
                userCommentList.map(({uniquekey, Comments, datetime}, index) => (
                    <Card key={index} title={`于 ${datetime} 评论了文章 ${uniquekey}`} extra={<Link to={`/newsdetail/${uniquekey}`}>查看</Link>}>
                        <p>{Comments}</p>
                    </Card>
                ))
            );
        return (
            <div>
                <Tabs>
                    <TabPane key='1' tab='我的收藏列表' style={{padding: '10px'}}>
                        {collectionShow}
                    </TabPane>
                    <TabPane key='2' tab='我的评论列表' style={{padding: '10px'}}>
                        {commentShow}
                    </TabPane>
                    <TabPane key='3' tab='头像设置'>
                        
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default MobileUserCenter;