import {connect} from 'react-redux'
import {addItem} from "../actions/actions";
import AddUnit from '../components/AddUnit';
import dataApi from '../../api/DataApi';


const mapStateToProps = (state, ownProps) =>{
    return state;
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        onAddButtonClicked: (newItemContent) => {
            dataApi.addItem(newItemContent, (newItem) => {
                dispatch({type: 'ADD_ITEM', value: newItem})});
        },
        onPageLoad: () => dataApi.getItemsByFilter("全部", (items) => dispatch({
            type: "FILTER_CHANGE",
            items: items,
            newFilterName: '全部'
        })),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUnit)