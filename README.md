# react-motion-stack

A simple react component that gives you a beautiful 60fps swipe interaction.

## Install:

`npm i --save react-motion-stack`

## Example:

[Demo](https://jz3ok45pww.codesandbox.io/)

```js
import React from 'react';
import { render } from 'react-dom';
import MotionStack from 'react-motion-stack';
import 'react-motion-stack/build/motion-stack.css';
import './index.css';

const data = Array.from({ length: 10 }, (_, i) => ({
  id: new Date().getTime() + i,
  element: (
    <img
      draggable={false}
      src={`https://source.unsplash.com/random/${i + 1}`}
    />
  )
}));

class App extends React.Component {
  onSwipeEnd = ({ data }) => {
    console.log('data', data);
  };

  renderButtons(props) {
    return (
      <div className="btn-group">
        <button children="👎" onClick={props.reject} />
        <button children="👍" onClick={props.accept} />
      </div>
    );
  }

  render() {
    return (
      <div className="demo-wrapper">
        <MotionStack
          data={data}
          onSwipeEnd={this.onSwipeEnd}
          render={props => props.element}
          renderButtons={this.renderButtons}
        />
      </div>
    );
  }
}
render(<App />, document.getElementById('root'));
```

## Available props:

#### springConfig

`PropTypes.object`

Spring physics settings for the component `{ stiffness: 1600, damping: 80 }`

#### threshold

`PropTypes.number`

Determines how far you need to drag to complete the swipe. Default `200`.

#### renderCount

`PropTypes.number`

The number of Motion Cards you want to render at a time.

#### infinite

`PropTypes.bool`

Infinite defaults to `true` and just puts your card at the end of the list when the swipe is finished. `false` removes it from the list.

#### onSwipeEnd

`PropTypes.func`

A callback function that returns the updated data passed to the Motion Stack component.

#### renderButtons

`PropTypes.func`

A render prop that returns an object with `accept` and `reject` keys and allows you to render your own buttons and call those actions.

#### render

`PropTypes.func.isRequired`

A render prop that returns an object with `accept` and `reject` keys and allows you to render your own buttons and call those actions.

#### data

```
PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.any
  })
).isRequired
```

This is an array of objects containing an `id` key. The key is required. This is the data that gets passed to the render function and generates the list of Motion Cards.
