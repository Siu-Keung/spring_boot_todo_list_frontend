
import React, {Component} from 'react';
import '../css/FilterUnit.css';

export default class FilterUnit extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {onFilterChanged} = this.props;
        let filterElems = this.props.allFilters.map((item) => {
            let resultElem = <li>
                <a href="#" className={item.selected ? 'selected' : ''}
                   onClick={onFilterChanged.bind(this, item.title)}>{item.title}</a>
            </li>;
                   return resultElem;
        });

        return <div>
            <ul id="filters">
                {filterElems}
            </ul>
        </div>
    }

}