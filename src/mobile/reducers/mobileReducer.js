import generateUUID from '../tools/tools';


const initState = {
    activeTab: "todoList",
    todoListPage: {
        items: [],
        page: "list"
    },
    accountPage: {},
};

export default (state = initState, event) => {
    let newState = JSON.parse(JSON.stringify(state));
    let todoListPage = newState.todoListPage;
    let accountPage = newState.accountPage;
    if (newState.activeTab === "todoList") {
        switch (event.type) {
            case "ON_PAGE_LOAD":
                todoListPage.items = event.items;
                return newState
            case "ON_ITEM_CLICKED":
                todoListPage.item = event.item;
                todoListPage.page = 'details';
                return newState
            case "FORWARD_TO_LIST_PAGE":
                let oldItem = todoListPage.items.find(item => item.id === todoListPage.item.id)
                todoListPage.item = oldItem;
                todoListPage.page = 'list';
                return newState
            case "TOGGLE_ITEM_TYPE":
                todoListPage.item.type = todoListPage.item.type === "已完成" ? "未完成": "已完成"
                return newState
            case "UPDATE_ITEM":
                console.log(event)
                todoListPage.page = 'list';
                let targetItem = todoListPage.items.find(item => item.id === event.newItem.id)
                targetItem.content = event.newItem.content;
                targetItem.type = event.newItem.type;
                return newState
        }
    }
    return newState;
}