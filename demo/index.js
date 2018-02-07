import React from 'react';
import { render } from 'react-dom';
import MotionStack from '../src/main';
import './demo.css';

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
        />
      </div>
    );
  }
}
render(<App />, document.getElementById('root'));
