
const filterHandlers =  [
    {title: '全部', handleMethod: (item) => true},
    {title: '未完成', handleMethod: (item) => !item.checked},
    {title: '已完成', handleMethod: (item) => item.checked}];

export default filterHandlers;