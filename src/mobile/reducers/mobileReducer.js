import generateUUID from '../tools/tools';


const initState = {
    items: [],
};

export default (state = initState, event) => {
    let targetItem = null;
    let newState = JSON.parse(JSON.stringify(state));
    switch (event.type) {
        case "ON_PAGE_LOAD":
            console.log(event);
            return newState
        case "ADD_ITEM":
            newState.items.push(event.value);
            return newState;
        case "ITEM_DELETED":
            newState['items'] = newState.items.filter(item => item.id !== event.value);
            return newState
        case 'ITEM_CHECKED':
            targetItem = newState.items.find(item => item.id === event.value);
            targetItem.checked = !targetItem.checked;
            return newState;
        case 'SPAN_CLICKED':
            targetItem = newState.items.find(item => item.id === event.value);
            targetItem.editable = true;
            return newState;
        case 'ITEM_CONTENT_CHANGE':
            targetItem = newState.items.find(item => item.id === event.value.id);
            targetItem.editable = false;
            targetItem.content = event.value.content;
            return newState;
        case 'FILTER_CHANGE':
            newState.items = event.items;
            newState.allFilters.forEach(item => {
                if(item.title === event.newFilterName)
                    item.selected = true;
                else
                    item.selected = false;
            });
            return newState;
        default:
            return state;
    }
}