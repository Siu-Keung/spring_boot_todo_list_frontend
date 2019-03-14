import {connect} from 'react-redux'
import {addItem} from "../actions/actions";
import AddUnit from '../components/AddUnit';
import dataApi from '../api/DataApi';


const mapStateToProps = (state, ownProps) =>{
    return state;
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        onAddButtonClicked: (newItemContent) => {
            dataApi.addItem(newItemContent, (newItem) => {
                dispatch({type: 'ADD_ITEM', value: newItem})});
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUnit)