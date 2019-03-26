import React, {Component} from 'react';
import {ReactDOM} from 'react'
import {Tabs, WhiteSpace, Badge, TabBar, ListView, List, Card} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {StickyContainer, Sticky} from 'react-sticky';
import dataApi from "../api/DataApi";
import {connect} from "react-redux";
import AddUnit from "./components/AddUnit";

const Item = List.Item;
const Brief = Item.Brief

class MobileApp extends Component {

    componentDidMount() {
        this.props.onPageLoad();
    }

    render() {
        this.state = {'selectedTab': '抢单'}

        return (
            <div>
                <div style={{position: 'fixed', height: '100%', width: '100%', top: 0}}>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                        tabBarPosition="bottom"
                        hidden={false}
                        prerenderingSiblingsNumber={0}
                    >
                        <TabBar.Item
                            icon={{uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'}}
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
                                }}
                                />
                            }
                            title="待办事项"
                            key="history"
                            selected={this.state.selectedTab === 'todoList'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: '历史',
                                });
                            }}
                        >
                            <List renderHeader={() => '待完成列表'} className="my-list">
                                <Item arrow="horizontal" multipleLine onClick={() => {
                                }}>
                                    <Card full>
                                        <Card.Header
                                            title="This is title"
                                            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                                            extra={<span>this is extra</span>}
                                        />
                                        <Card.Body>
                                            <div>This is content of `Card`</div>
                                        </Card.Body>
                                        <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
                                    </Card>
                                </Item>
                                
                            </List>
                            <List renderHeader={() => '已完成列表'} className="my-list">
                                <Item arrow="horizontal" multipleLine onClick={() => {
                                }}>
                                    <Card full>
                                        <Card.Header
                                            title="This is title"
                                            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                                            extra={<span>this is extra</span>}
                                        />
                                        <Card.Body>
                                            <div>This is content of `Card`</div>
                                        </Card.Body>
                                        <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
                                    </Card>
                                </Item>

                            </List>
                        </TabBar.Item>

                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                                }}
                                />
                            }
                            selectedIcon={{uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'}}
                            title="个人账户"
                            key="my"
                            selected={this.state.selectedTab === 'account'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'account',
                                });
                            }}
                        >
                        </TabBar.Item>
                    </TabBar>
                </div>
            </div>);

    }
}

const mapStateToProps = (state, ownProps) =>{
    return state;
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        onAddButtonClicked: (newItemContent) => {
            dataApi.addItem(newItemContent, (newItem) => {
                dispatch({type: 'ADD_ITEM', value: newItem})});
        },
        onPageLoad: () => dataApi.getItemsByFilter("全部", (items) => {
            dispatch({
                type: "ON_PAGE_LOAD",
                items: items,
            });
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileApp)
