import React, {memo} from 'react';

import BaseCheckbox from "../../base/BaseCheckbox/BaseCheckbox";
import todo from "../../../store/todo";
import styles from './Todo.module.scss';

const Todo = memo((props) => {
    const {
        item,
        className
    } = props;
    const toggleTodo = (id) => {
        todo.completed(id);
    }

    return (
        <div className={[styles.Todo, className].join(" ")}>
            <BaseCheckbox
                name={`todo-${item.id}`}
                value={item.completed}
                setValue={() => toggleTodo(item.id)}
            >
                {item.title}
            </BaseCheckbox>
        </div>
    );
});

export default Todo;
