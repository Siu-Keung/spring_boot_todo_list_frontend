import React, {Component} from 'react';
import {ReactDOM} from 'react'
import {Tabs, WhiteSpace, Badge, TabBar, ListView, List, Card} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {StickyContainer, Sticky} from 'react-sticky';
import dataApi from "../api/DataApi";
import {connect} from "react-redux";
import TodoListPage from "./components/TodoListPage";

const Item = List.Item;
const Brief = Item.Brief

class MobileApp extends Component {

    componentDidMount() {
    }

    render() {

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
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                                }}
                                />
                            }
                            selectedIcon={{uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'}}
                            title="Todo"
                            key="my"
                            selected={this.props.activeTab === 'todoList'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'todoList',
                                });
                            }}
                        >
                            <TodoListPage/>
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
                            selected={this.props.activeTab === 'account'}
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

const mapStateToProps = (state, ownProps) => {
    return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAddButtonClicked: (newItemContent) => {
            dataApi.addItem(newItemContent, (newItem) => {
                dispatch({type: 'ADD_ITEM', value: newItem})
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileApp)
