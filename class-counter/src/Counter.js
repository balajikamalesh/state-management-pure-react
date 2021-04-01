import React, { useState, useEffect } from 'react';

const getStateFromLocalStorage = () => {
    const store = localStorage.getItem('counterState');
    if(store !== '{}') return JSON.parse(store).count;
    return 0;
}

const storeStateFromLocalStorage = count => {
    localStorage.setItem('counterState', JSON.stringify({ count }));
}

const Counter = ({ max })=> {
    const [ count, setCount ] = useState(getStateFromLocalStorage());

    useEffect(() => {
        document.title = count;
        storeStateFromLocalStorage(count);
    }, [ count ])

    const incrementBy3 = () => {
        setCount(cou => cou + 1 );
        setCount(cou => cou + 1 );
        setCount(cou => cou + 1 );
    }

    const decrement = () => setCount(count - 1);

    const reset = () => setCount(0);

    return (
        <div className="Counter">
            <p className="count">{count}</p>
            <section className="controls">
            <button onClick={incrementBy3}>Increment By 3</button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={reset}>Reset</button>
            </section>
        </div>
    );
}

export default Counter;
