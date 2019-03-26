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
    let targetItem = null;
    let newState = JSON.parse(JSON.stringify(state));
    let todoListPage = newState.todoListPage;
    if (newState.activeTab === "todoList") {
        switch (event.type) {
            case "ON_PAGE_LOAD":
                todoListPage.items = event.items;
                return newState
            case "ON_ITEM_CLICKED":
                todoListPage.item = event.item;
                todoListPage.page = 'details';
                return newState
        }
    }
    return newState;
}