import React, {Component} from 'react';
import '../css/ListUnit.css';

export default class ListUnit extends Component {
    constructor(props) {
        super(props);
        this.inputValue = React.createRef();
    }

    onKeyUp(id, event) {
        if (event.keyCode === 13) {
            this.props.onEnterKeyUp(id, this.inputValue.current.value);
        }
    }

    componentDidMount() {
        this.props.onPageLoad();
    }

    render() {
        const {onCheckBoxClicked, onSpanClicked,onDeleteButtonClicked} = this.props;
        let itemsArray = this.props.items.map(item => {
            let itemElem = null;
            if (item.display) {
                itemElem = <li className={item.checked ? 'checked' : ''}>
                   <span> <input name="done-todo" type="checkbox" className="done-todo" checked={item.checked}
                                 onClick={onCheckBoxClicked.bind(this, {
                                     id: item.id,
                                     content: item.content,
                                     checked: item.checked
                                 })}/>

                       {/*<span ref={this.spanContent} contentEditable={item.editable} onClick={onSpanClicked.bind(this, item.id)}*/}
                       {/*onKeyUp={this.onKeyUp.bind(this, item.id)}> {item.content}</span>*/}
                       {item.editable ?
                           (<input type='text' ref={this.inputValue} onKeyUp={this.onKeyUp.bind(this, item.id)}
                                   defaultValue={item.content}/>) :
                           (<span onDoubleClick={onSpanClicked.bind(this, item.id)}>{item.content}</span>)}</span>
                    <span
                        style={{float: 'right'}}><button onClick={onDeleteButtonClicked.bind(this, item.id)}>删除</button>
                    </span>
                </li>
            }
            return itemElem;
        });

        let resultElem =
            <ol>
                {itemsArray}
            </ol>
        return resultElem;
    }

}
