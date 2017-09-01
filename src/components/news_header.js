import React, { Component } from 'react';
import {Row, Col, Menu, Modal, Icon, Button, Tabs, Form, Input, message} from 'antd';
import {Link} from 'react-router';
import Axios from 'axios';
import Logo from '../images/logo.png';

// 菜单项
const Item = Menu.Item;
// Tab标签页
const TabPane = Tabs.TabPane;
// 表单项
const FormItem = Form.Item;

class NewsHeader extends Component {
    state = {  
        selectedKey: 'top',
        username: null,
        modalShow: false,
    }
    // 初始化完成时，从 localStotage 中获取 username，若有，更新状态
    componentDidMount() {
        let username = localStorage.getItem('username');
        if(username){
            this.setState({username});
        }
    }
    // 点击菜单，选中点击的菜单项
    clickMenu = ({key}) => {
        // 点击登录，显示模态框
        if(key === 'logout'){
            this.setState({modalShow: true});
        }
        this.setState({selectedKey: key});
    }
    // 隐藏模态框
    handleCancel = () => {
        this.setState({modalShow: false});
    }
    // 切换 登录/注册 面板，清空表单
    changeTab = () => {
        this.props.form.resetFields();
    }
    // 点击 登录/注册 事件函数
    handleSubmit = (isLogin, event) => {
        event.preventDefault();
        let action = isLogin ? 'login' : 'register';
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}`;
        let {username, password, r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue();
        if(isLogin){
            url += `&username=${username}&password=${password}`;
        }else{
            url += `&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`;
        }
        Axios.get(url)
            .then((response) => {
                let {data} = response;

                if(isLogin){
                    if(data){
                        // 登录成功
                        this.setState({modalShow: false});
                        this.props.form.resetFields();
                        message.success('登录成功');
                        let userId = data.UserId;
                        let username = data.NickUserName;
                        localStorage.setItem('userId', userId);
                        localStorage.setItem('username', username);
                        this.setState({username});
                    }else{
                        // 登录失败
                        message.error('登录失败');
                    }
                }else{
                    if(data){
                        // 注册成功
                        this.setState({modalShow: false});
                        this.props.form.resetFields();
                        message.success('注册成功');
                    }else{
                        // 注册失败
                        message.error('注册失败');
                    }
                }
            })
            .catch((error) => {
                this.setState({modalShow: false});
                message.error('连接失败');
            });
    }

    // 退出
    logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        this.setState({username: null});
    }

    render() {
        let {username, modalShow} = this.state;
        const { getFieldDecorator } = this.props.form;
        // 根据 username 的状态，判断是否登录，并为显示内容赋值
        const showItem = username ? (
            <Item key="login" className='right'>
                <Button type="primary">{username}</Button>&nbsp;&nbsp;
                <Link to="/usercenter">
                    <Button type="dashed">个人中心</Button>
                </Link>&nbsp;&nbsp;
                <Button onClick={this.logout}>退出</Button>
            </Item>
        ) : (
            <Item key="logout" className='right'>
                <Icon type="appstore"/>登录/注册
            </Item>
        );
        return (
            <header>
                <Row>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <a href='/#/' className='logo'>
                            <img src={Logo} alt='Logo' />
                            <span>ReactNew</span>
                        </a>
                    </Col>
                    <Col span={19}>
                        <Menu mode="horizontal" selectedKeys={[this.state.selectedKey]} onClick={this.clickMenu}>
                            <Item key="top">
                                <Icon type="appstore"/>头条
                            </Item>
                            <Item key="shehui">
                                <Icon type="appstore"/>社会
                            </Item>
                            <Item key="guonei">
                                <Icon type="appstore"/>国内
                            </Item>
                            <Item key="guoji">
                                <Icon type="appstore"/>国际
                            </Item>
                            <Item key="yule">
                                <Icon type="appstore"/>娱乐
                            </Item>
                            <Item key="tiyu">
                                <Icon type="appstore"/>体育
                            </Item>
                            <Item key="keji">
                                <Icon type="appstore"/>科技
                            </Item>
                            <Item key="shishang">
                                <Icon type="appstore"/>时尚
                            </Item> 
                            {showItem}
                        </Menu>
                        <Modal 
                            title='用户中心' 
                            visible={modalShow} 
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                        ]}>
                            <Tabs type="card" onChange={this.changeTab}>
                                <TabPane tab="登录" key="1">
                                    <Form onSubmit={this.handleSubmit.bind(this, true)}>
                                        <FormItem label='用户名'>
                                            {
                                                getFieldDecorator('username')(
                                                    <Input type='text' placeholder='请输入账号' />
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label='密码'>
                                            {
                                                getFieldDecorator('password')(
                                                    <Input type='password' placeholder='请输入密码' />
                                                )
                                            }
                                        </FormItem>
                                        <Button type='primary' htmlType='submit'>登录</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form onSubmit={this.handleSubmit.bind(this, false)}>
                                        <FormItem label='账号'>
                                            {
                                                getFieldDecorator('r_userName')(
                                                    <Input type='text' placeholder='请输入账号' />
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label='密码'>
                                            {
                                                getFieldDecorator('r_password')(
                                                    <Input type='password' placeholder='请输入密码' />
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label='确认密码'>
                                            {
                                                getFieldDecorator('r_confirmPassword')(
                                                    <Input type='password' placeholder='请再次输入您的密码' />
                                                )
                                            }
                                        </FormItem>
                                        <Button type='primary' htmlType='submit'>注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </header>
        );
    }
}

export default Form.create()(NewsHeader);