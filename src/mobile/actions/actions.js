
//添加组件
export const addItem = (newItem) => ({type: 'ADD_ITEM', value: newItem});

//列表组件
export const handleCheckBoxClicked = (id) => ({type: 'ITEM_CHECKED', value: id});
export const handleSpanClicked = (id) => ({type: 'SPAN_CLICKED', value: id});
export const handleEnterKeyUp = (id, content) => ({type: 'ITEM_CONTENT_CHANGE', value: {id, content}})

//过滤器组件
export const handleFilterChanged = (newFilterName) => ({type: 'FILTER_CHANGE', value: newFilterName});

