import React, { Component } from 'react';
import Button from './Button';

export default class extends Component {
  render() {
    const { clear = () => {}, lyrics } = this.props;

    return (
      <div className="uk-width-1-3 uk-grid-item-match">
        <div
          className="uk-flex uk-flex-column uk-height-1-1"
          style={{ height: '35vh' }}
        >
          <h5 className="uk-heading-bullet">
            <span>
              Next Lyric: <strong>{lyrics[0]}</strong>
            </span>
          </h5>
          <div
            className="uk-flex-1"
            style={{ maxHeight: '100%', overflowY: 'scroll' }}
          >
            <ul className="uk-list uk-list-striped">
              {lyrics.slice(1).map((lyric, i) => {
                return <li key={i}>{lyric}</li>;
              })}
            </ul>
          </div>
          <div className="uk-margin-top">
            <Button full text="Clear" onClick={clear} />
          </div>
        </div>
      </div>
    );
  }
}
