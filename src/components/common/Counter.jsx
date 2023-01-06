import React from 'react';
import {observer} from "mobx-react-lite";

import counter from '../../store/counter';

const Counter = observer(() => {
    return (
        <div className={"max-w-xs mx-auto"}>
            <p className={"text-center font-bold text-xl text-primary-blue mb-8"}>Count: {counter.count}</p>
            <div className={"flex justify-center gap-2"}>
                <button onClick={() => counter.increment()}>+</button>
                <button onClick={() => counter.decrement()}>-</button>
            </div>
        </div>
    );
});

export default Counter;
