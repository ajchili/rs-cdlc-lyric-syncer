import React, { Component } from 'react';

export default class extends Component {
  render() {
    const {
      full = false,
      type = 'default',
      onClick = () => {},
      text,
      title = null,
    } = this.props;

    return (
      <button
        className={`uk-button uk-button-${type} uk-button-small ${
          full && 'uk-width-1-1'
        }`}
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
        }}
        title={title}
      >
        {text}
      </button>
    );
  }
}
