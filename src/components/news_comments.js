import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import {Card, Form, Button, Input, notification } from 'antd';
const FormItem = Form.Item;

class NewsComments extends Component {
    static propTypes = {
        uniquekey: PropTypes.string.isRequired
    }
    state = {  
        comments: null
    }
    componentDidMount() {
        let {uniquekey} = this.props;
        this.changeNews(uniquekey);
    }
    componentWillReceiveProps(nextProps) {
        let {uniquekey} = nextProps;
        this.changeNews(uniquekey);
    }

    // 新闻标识改变时，更新页面评论
    changeNews = (uniquekey) => {
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`;
        axios.get(url)
            .then(response => {
                let comments = response.data;
                this.setState({comments});
            });
    }

    // 提交评论
    handleSubmit = (event) => {
        event.preventDefault();
        let {comment} = this.props.form.getFieldsValue();
        let userId = localStorage.getItem('userId');
        let {uniquekey} = this.props;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${comment}`;
        axios.get(url)
            .then(({data}) => {
                if(data){
                    notification['success']({
                        message: '提交成功'
                    });
                    this.props.form.resetFields();
                    this.changeNews(uniquekey);
                }else{
                    notification['error']({
                        message: '提交失败'
                    });
                }
            })
            .catch(error => {
                notification['error']({
                    message: '提交失败'
                });
            });
    }

    // 添加收藏
    addUserCollection = () => {
        let userId = localStorage.getItem('userId');
        let {uniquekey} = this.props;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`;
        axios.get(url)
            .then(({data}) => {
                if(data){
                    notification['success']({
                        message: 'ReactNews提醒',
                        description: '收藏此文章成功'
                    });
                }else{
                    notification['error']({
                        message: 'ReactNews提醒',
                        description: '收藏此文章失败'
                    });
                }
            })
            .catch(error => {
                notification['error']({
                    message: 'ReactNews提醒',
                    description: '收藏此文章失败'
                });
            });
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        let {comments} = this.state;
        let commentList = !comments 
            ? <p>还没有评论，快来抢沙发！！！</p> 
            : (
                comments.map((comment, index) => (
                    <Card key={index} title={comment.UserName} extra={`发布于${comment.datetime}`}>
                        <p>{comment.Comments}</p>
                    </Card>
                ))
            );
        return (
            <div style={{padding: '10px'}}>
                {commentList}
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label='您的评论'>
                        {
                            getFieldDecorator('comment')(
                                <Input type='text' placeholder='您的评论' />
                            )
                        }
                    </FormItem>
                    <Button type='primary' htmlType='submit'>提交评论</Button>
                    &nbsp;&nbsp;
                    <Button type='primary' htmlType='button' onClick={this.addUserCollection}>收藏该文章</Button>
                </Form>
            </div>
        );
    }
}

export default Form.create()(NewsComments);