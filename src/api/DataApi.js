import filterHandlers from '../tools/FilterHandlers';
import axios from 'axios';

const DataApi = {
    items: [],

    allFilters: [{title: '全部', selected: true}, {title: '未完成', selected: false}, {title: '已完成', selected: false}],


    addItem(newItemContent, callback){
        console.log(newItemContent)
        axios({
            method: 'post',
            url: "http://127.0.0.1:1234/todoItems",
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
            url: `http://127.0.0.1:1234/todoItems`,
            method: 'put',
            data: {id: id, content: content, type: newStatus}
        }).then(response => {
            if(response.status == 204)
                callback();
        });
    },

    updateItemContent(id, newContent, callback){
        axios({
            url: `http://127.0.0.1:1234/todoItems`,
            method: 'patch',
            data: {id: id, content: newContent},
        }).then(response => {
           if(response.data === 'succeeded')
               callback(id, newContent);
        });
    },

    getItemsByFilter(filterTitle, callback){
        axios.get(`http://127.0.0.1:1234/todoItems?filter=${filterTitle}`).then(response =>{
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
            url: `http://127.0.0.1:1234/todoItems`,
            method: 'delete',
            data: {id: id},
        })
    }


}

export default DataApi;