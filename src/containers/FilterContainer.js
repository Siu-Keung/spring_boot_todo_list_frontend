import {connect} from 'react-redux'
import {handleFilterChanged} from "../actions/actions";
import FilterUnit from '../components/FilterUnit'
import dataApi from "../api/DataApi";

const mapStateToProps = (state, ownProps) =>{
    return {allFilters: state.allFilters};
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        onFilterChanged: (newFilterName) => {
            dataApi.getItemsByFilter(newFilterName, items => {
                if(!items)
                    return;
                dispatch({type: 'FILTER_CHANGE', items, newFilterName})
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterUnit)