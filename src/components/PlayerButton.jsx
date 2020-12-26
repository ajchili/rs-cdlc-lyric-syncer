import React, { Component } from 'react';

export default class extends Component {
  render() {
    const {
      type = 'default',
      onClick = () => {},
      text,
      title = null,
    } = this.props;

    return (
      <button
        className={`uk-button uk-button-${type} uk-button-small`}
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
