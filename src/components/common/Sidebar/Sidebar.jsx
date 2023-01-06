import React from 'react';

import styles from './Sidebar.module.scss'
import close from '../../../static/images/close.svg';

const Sidebar = (props) => {
    const {
        shown,
        setState,
        className,
        children
    } = props;
    const classesArr = [styles.Sidebar, className];
    if(shown) {
        classesArr.push("!translate-x-0");
    }
    const classes = classesArr.join(" ");

    return (
        <div className={classes}>
            <img
                src={close}
                alt={"close icon"}
                className={styles.close}
                onClick={() => setState(false)}
            />
            <div>
                {children}
            </div>
        </div>
    );
};

export default Sidebar;
