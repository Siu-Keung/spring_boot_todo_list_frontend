import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './todo.css';
import AddUnitContainer from './containers/AddUnitContainer';
import ListUnitContainer from './containers/ListUnitContainer';
import FilterContainer from './containers/FilterContainer';

class App extends Component {

    render() {
        return (
            <div className="container">
                <div>
                    <h2>Todo List Demo</h2>
                    <p>
                        <h3>添加新的事项：</h3>
                    </p>
                </div>
                <AddUnitContainer />
                <br/>
                <ListUnitContainer/>
                <FilterContainer/>
            </div>
        );
    }
}

export default App;
