import React, { Component } from 'react';

class Title extends Component {
  render() {
    return (
      <div
        className="absolute top-12 left-44 text-5xl"
        style={ { fontFamily: '"Alegreya Sans SC", sans-serif' } }
      >
        <span className="text-green-600">T</span>
        <span>rybe </span>
        <span className="text-yellow-400">W</span>
        <span>allet</span>
      </div>
    );
  }
}

export default Title;
