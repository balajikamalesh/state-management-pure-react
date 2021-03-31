import React, { Component } from 'react';

const getStateFromLocalStorage = () => {
    const store = localStorage.getItem('counterState');
    if(store) return JSON.parse(store);
    return { count: 0 };
}

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = getStateFromLocalStorage();
    }

    increment = () => {
        this.setState((state, props) => {
            const {max} = props;
            if(state.count >= max) return;
            return { count: state.count + 1 };
        },
        () => { //does not get any arguments
            localStorage.setItem('counterState', JSON.stringify(this.state));   
        }
        );
    }

    incrementBy3 = () => {
        this.setState((state) => { return { count: state.count + 1 }});
        this.setState((state) => { return { count: state.count + 1 }});
        this.setState((state) => { return { count: state.count + 1 }});
    }

    decrement = () => {
        this.setState({ count: this.state.count - 1}, () => { //does not get any arguments
            localStorage.setItem('counterState', JSON.stringify(this.state));   
        })
    }

    reset = () => {
        this.setState({ count: 0})
    }

    render() {
        const { count } = this.state;

        return (
        <div className="Counter">
            <p className="count">{count}</p>
            <section className="controls">
            <button onClick={this.increment}>Increment</button>
            <button onClick={this.incrementBy3}>Increment By 3</button>
            <button onClick={this.decrement}>Decrement</button>
            <button onClick={this.reset}>Reset</button>
            </section>
        </div>
        );
    }
}

export default Counter;
