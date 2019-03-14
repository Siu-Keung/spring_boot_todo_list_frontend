import {connect} from 'react-redux'
import {handleCheckBoxClicked, handleSpanClicked, handleEnterKeyUp} from "../actions/actions";
import ListUnit from '../components/ListUnit';
import dataApi from '../api/DataApi';
import filterHandlers from '../tools/FilterHandlers';

const mapStateToProps = (state, ownProps) => {
    let currentFilter = state.allFilters.find(filter => filter.selected === true);
    let handleMethod = filterHandlers.find(item => item.title === currentFilter.title).handleMethod;
    let displayItems = state.items.filter(item => handleMethod(item));
    return {items: displayItems};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCheckBoxClicked: (item) => {
            dataApi.toggleCheckedStatus(item.id, item.content, item.checked, () => {
                dispatch({type: 'ITEM_CHECKED', value: item.id})
            });
        },
        onSpanClicked: (id) => dispatch(handleSpanClicked(id)),
        onEnterKeyUp: (id, content) => {
            // dispatch(handleEnterKeyUp(id, content))
            dataApi.updateItemContent(id, content, (id, content) => {
                    if (!id)
                        return;
                    dispatch({type: 'ITEM_CONTENT_CHANGE', value: {id, content}});
                }
            );
        },
        onPageLoad: () => dataApi.getItemsByFilter("全部", (items) => dispatch({
            type: "FILTER_CHANGE",
            items: items,
            newFilterName: '全部'
        })),
        onDeleteButtonClicked: (id) => {
            dataApi.deleteItemById(id);
            dispatch({type: 'ITEM_DELETED', value: id})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListUnit)