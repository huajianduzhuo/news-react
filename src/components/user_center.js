import React, { Component } from 'react';
import {Tabs, Row, Col, Card, Upload, Icon, Modal} from 'antd';
import {Link} from 'react-router';
import Axios from 'axios';
const TabPane = Tabs.TabPane;

class UserCenter extends Component {
    state = {  
        userCollectionList: [],
        userCommentList: [],
        previewVisible: false,
        previewImage: '',
        fileList: [{
          uid: -1,
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }]
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


    handleCancel = () => this.setState({ previewVisible: false })
    
    handlePreview = (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
    }
    
    handleChange = ({ fileList }) => this.setState({ fileList })
    

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

        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
              </div>
        );

        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <Tabs>
                            <TabPane key='1' tab='我的收藏列表'>
                                {collectionShow}
                            </TabPane>
                            <TabPane key='2' tab='我的评论列表'>
                                {commentShow}
                            </TabPane>
                            <TabPane key='3' tab='头像设置'>
                                <div className="clearfix">
                                    <Upload
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                    >
                                        {fileList.length >= 3 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        );
    }
}

export default UserCenter;