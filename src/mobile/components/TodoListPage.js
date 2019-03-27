import {Component} from "react";
import {Tabs, WhiteSpace, Badge, TabBar, ListView, List, Card, TextareaItem, Radio, Button} from 'antd-mobile';
import React from "react";
import dataApi from "../../api/DataApi";
import {connect} from "react-redux";
import 'antd-mobile/dist/antd-mobile.css';

const Item = List.Item;
const Brief = Item.Brief
const RadioItem = Radio.RadioItem;

class TodoListPage extends Component {

    constructor(props) {
        super(props);
        this.disabled = true;
    }

    componentDidMount() {
        this.props.onPageLoad();
    }

    render() {
        this.state = {'selectedTab': '抢单'}
        let listPage = null;
        if (this.props.page === "list")
            listPage = this.generateListPage();
        else
            listPage = this.generateDetailsPage();
        return listPage
    }

    generateListPage() {
        let itemArrays = this.props.items.filter(elem => elem.type === "未完成").map(elem => {
            return (
                <Item arrow="horizontal" multipleLine
                      onClick={() => {
                          this.props.onItemClicked(elem.id);
                      }}>
                    <Card full>
                        <Card.Header
                            title={elem.created}
                            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                        />
                        <Card.Body>
                            <div>{elem.content}</div>
                        </Card.Body>
                    </Card>
                </Item>
            )
        })

        let listPage = (
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
                selected={this.props.activeTab === 'todoList'}
                onPress={() => {
                    console.log('u pressed todoList')
                }}
            >
                <List renderHeader={() => '待完成列表'} className="my-list">
                    {itemArrays}
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
                            <Card.Footer content="footer content" extra={<div>extra footer content</div>}/>
                        </Card>
                    </Item>

                </List>
            </TabBar.Item>)
        return listPage;
    }


    generateDetailsPage() {
        const data = [
            {label: '未完成'},
            {label: '已完成'},
        ];
        return (
            <div>
                <List renderHeader={() => '创建日期：'}>

                </List>
                <List renderHeader={() => '类型：'}>
                    {data.map(i => (
                        <RadioItem
                            key={i.label}
                            checked={this.props.item.type === i.label}
                            onChange={() => {this.props.toggleItemType(this.props.item.id)}}
                        >
                            {i.label}
                        </RadioItem>
                    ))}
                </List>

                <List renderHeader={() => '详情 '}>
                    <TextareaItem
                        rows={5}
                        count={100}
                        defaultValue={this.props.item.content}
                        onChange={val => {
                            this.inputContent = val
                        }}
                    />
                </List>

                <List renderHeader={() => '操作 '}>
                    <Button type="primary" onClick={() => this.props.onConfirmButtonClicked(this.props.item)}>提交</Button><WhiteSpace/>
                    <Button type="warning" onClick={() => this.props.forwardToListPage()}>取消</Button><WhiteSpace/>

                </List>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return state.todoListPage;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onPageLoad: () => dataApi.getItemsByFilter("全部", (items) => {
            dispatch({
                type: "ON_PAGE_LOAD",
                items: items,
            });
        }),
        onItemClicked: (itemId) => {
            dataApi.getItemsById(itemId, (item) => {
                console.log('sfddsf')
                dispatch({
                    type: "ON_ITEM_CLICKED",
                    item: item,
                })
            })
        },
        forwardToListPage: () => {
            dispatch({type: "FORWARD_TO_LIST_PAGE"});
        },
        toggleItemType: (itemId) => {
            dispatch({type: "TOGGLE_ITEM_TYPE", id: itemId});
        },
        onConfirmButtonClicked: (item) => {
            dataApi.toggleCheckedStatus(item.id, item.content, item.type === "已完成"? true: false, () => {
                dispatch({type: "UPDATE_ITEM", newItem: item})
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListPage)