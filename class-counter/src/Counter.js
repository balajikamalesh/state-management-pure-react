import React, { useState, useEffect } from 'react';

const useLocalStorage = (initialState, key) => {
    const get = () => {
      const storage = localStorage.getItem(key);
      if (storage) return JSON.parse(storage).value;
      return initialState;
    };
  
    const [value, setValue] = useState(get());
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify({ value }));
    }, [value]);
  
    return [value, setValue];
  };

const Counter = ({ max })=> {
    const [ count, setCount ] = useLocalStorage(0, 'count');

    useEffect(() => {
        document.title = count;
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
