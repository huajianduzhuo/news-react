import React, { Component } from 'react';
import {Tabs, Carousel} from 'antd';

import MobileNewsBlock from './mobile_news_block';
import Carousel1 from '../images/carousel_1.jpg';
import Carousel2 from '../images/carousel_2.jpg';
import Carousel3 from '../images/carousel_3.jpg';
import Carousel4 from '../images/carousel_4.jpg';

const TabPane = Tabs.TabPane;

class MobileNewsContainer extends Component {
    state = {  }
    render() {
        return (
            <Tabs>
                <TabPane key='top' tab='头条'>
                    <div style={{width: '100%'}}>
                        <Carousel autoplay>
                            <div><img src={Carousel1} alt='' /></div>
                            <div><img src={Carousel2} alt='' /></div>
                            <div><img src={Carousel3} alt='' /></div>
                            <div><img src={Carousel4} alt='' /></div>
                        </Carousel>
                    </div>
                    <MobileNewsBlock type='top' count={20}></MobileNewsBlock>
                </TabPane>
                <TabPane key='shehui' tab='社会'>
                    <MobileNewsBlock type='shehui' count={20}></MobileNewsBlock>
                </TabPane>
                <TabPane key='guonei' tab='国内'>
                    <MobileNewsBlock type='guonei' count={20}></MobileNewsBlock>
                </TabPane>
                <TabPane key='guoji' tab='国际'>
                    <MobileNewsBlock type='guoji' count={20}></MobileNewsBlock>
                </TabPane>
                <TabPane key='yule' tab='娱乐'>
                    <MobileNewsBlock type='yule' count={20}></MobileNewsBlock>
                </TabPane>
            </Tabs>
        );
    }
}

export default MobileNewsContainer;