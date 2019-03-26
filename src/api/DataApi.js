import filterHandlers from '../pc/tools/FilterHandlers';
import axios from 'axios';

const DataApi = {
    items: [],

    allFilters: [{title: '全部', selected: true}, {title: '未完成', selected: false}, {title: '已完成', selected: false}],


    addItem(newItemContent, callback){
        console.log(newItemContent)
        axios({
            method: 'post',
            url: "http://localhost:1003/todoListService/todoItems",
            data: {content: newItemContent}
        }).then(
            response => {
                let newItem = response.data;
                newItem.display = true;
                newItem.editable =false;
                callback(newItem);
        });

    },

    toggleCheckedStatus(id, content, checked, callback){
        let newStatus = '已完成';
        if(checked)
            newStatus = '未完成'
        axios({
            url: `http://localhost:1003/todoListService/todoItems`,
            method: 'put',
            data: {id: id, content: content, type: newStatus}
        }).then(response => {
            console.log(response.status)
            if(response.status == 200)
                callback();
        });
    },

    updateItemContent(id, newContent, callback){
        axios({
            url: `http://localhost:1003/todoListService/todoItems`,
            method: 'patch',
            data: {id: id, content: newContent},
        }).then(response => {
           if(response.data === 'succeeded')
               callback(id, newContent);
        });
    },

    getItemsByFilter(filterTitle, callback){
        axios.get(`http://localhost:1003/todoListService/todoItems?filter=${filterTitle}`).then(response =>{
            let items = response.data;
            items.forEach(item => {
               item.display = true;
               item.checked = item.type == '已完成';
            });
            console.log(items);
            callback(items);
        });
    },

    deleteItemById(id, callback){
        axios({
            url: `http://localhost:1003/todoListService/todoItems`,
            method: 'delete',
            data: {id: id},
        })
    }


}

export default DataApi;