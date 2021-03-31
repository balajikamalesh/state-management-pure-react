# State Management in Pure React in Depth
--> Think Deeply about what state even means in React Applications
--> Learn about inner workings on "this.setState"
--> How State in Class-based components and hooks differ
--> Explore APIs for navigating around prop-drilling
--> Use reducers for advanced state management
--> Write custom hooks for managing state
--> Store state in local storage and URL using query parameters
--> Fetch state from server - YES! this is possible


## The main job of React is to take the application state and turn it into DOM nodes

## State in Class Component
"this.setState" is Asyncronous. It can take both objects and functions as Parameters.

### Asyncronous Updates and Queuing

Okay, let's say we refactored `increment()` as follows:


```js
increment() {
  this.setState({ count: this.state.count + 1 });
  this.setState({ count: this.state.count + 1 });
  this.setState({ count: this.state.count + 1 });

  console.log(this.state.count); //0 
  //because objects can be merged
}
```
The above is similar to 

```js
let obj = { x: 1};
let obj2 = { ...obj, x: obj.x + 1, x: obj.x + 1, x: obj.x + 1 };
console.log(obj2); //{ x: 2}
```
when functions are passed, the behaviour is different

```js
incrementBy3() {
    this.setState((state) => { return { count: state.count + 1 }});
    this.setState((state) => { return { count: state.count + 1 }});
    this.setState((state) => { return { count: state.count + 1 }});

  console.log(this.state.count); //3
  //functions cannot be merged
}
```
"this.setState" can take a second argument as well, a Callback function which will be called after the state is updated

```js
increment = () => {
    this.setState((state, props) => {
        const {max} = props;
        if(state.count >= max) return;
        return { count: state.count + 1 };
    },
    () => { //does not get any arguments
        console.log('After!', this.state);   
    }
    );
}
```
We can even store the state to local store and retrieve based on the requirement

```js
localStorage.setItem('counterState', JSON.stringify(this.state));

const getStateFromLocalStorage = () => {
    const store = localStorage.getItem('counterState');
    if(store) return JSON.parse(store);
    return { count: 0 };
}
```
### setState Pattern and Anti-Pattern
Do's
- Is it can be computed from props or if it is not being used in the render method, don't store it in the state.
