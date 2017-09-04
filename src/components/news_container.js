import React, { Component } from 'react';
import {Row, Col, Carousel, Tabs} from 'antd';
import NewsBlock from './news_block';
import NewsImageBlock from './news_image_block';
import NewsProduct from './news_product';

import Carousel1 from '../images/carousel_1.jpg';
import Carousel2 from '../images/carousel_2.jpg';
import Carousel3 from '../images/carousel_3.jpg';
import Carousel4 from '../images/carousel_4.jpg';

const TabPane = Tabs.TabPane;

class NewsContainer extends Component {
    state = {  }
    render() {
        return (
            <div>
                <Row className='container'>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <div className='leftContainer' style={{width: '35%'}}>
                            <Carousel autoplay>
                                <div><img src={Carousel1} alt='' /></div>
                                <div><img src={Carousel2} alt='' /></div>
                                <div><img src={Carousel3} alt='' /></div>
                                <div><img src={Carousel4} alt='' /></div>
                            </Carousel>
                            <NewsImageBlock type='guoji' count={6} title='国际新闻' cardWidth='400px' imageWidth='112px'></NewsImageBlock>
                        </div>
                        <Tabs defaultActiveKey="1" className='tabs_news' style={{width: '35%'}}>
                            <TabPane tab="头条新闻" key="1">
                                <NewsBlock type='top' count={22}></NewsBlock>
                            </TabPane>
                            <TabPane tab="国际新闻" key="2">
                                <NewsBlock type='guoji' count={22}></NewsBlock>
                            </TabPane>
                        </Tabs>
                        <Tabs style={{width: '30%'}}>
                            <TabPane key='1' tab='React News产品'>
                                <NewsProduct></NewsProduct>
                            </TabPane>
                        </Tabs>
                        <div>
                        <NewsImageBlock type='guonei' count={8} title='国内新闻' cardWidth='100%' imageWidth='132px'></NewsImageBlock>
                        <NewsImageBlock type='yule' count={16} title='娱乐新闻' cardWidth='100%' imageWidth='132px'></NewsImageBlock>
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        );
    }
}

export default NewsContainer;