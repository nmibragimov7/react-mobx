import React from 'react';
import {observer} from "mobx-react-lite";

import filter from '../../../store/filter';
import styles from './Filter.module.scss';

const Filter = observer((props) => {
    const { className } = props;

    return (
        <div className={[styles.Filter, className].join(" ")}>
            <button
                disabled={filter.filter === "all"}
                onClick={() => filter.setFilter("all")}
            >All</button>
            <button
                disabled={filter.filter === "uncompleted"}
                onClick={() => filter.setFilter("uncompleted")}
            >Not completed</button>
            <button
                disabled={filter.filter === "completed"}
                onClick={() => filter.setFilter("completed")}
            >Completed</button>
        </div>
    );
});

export default Filter;
