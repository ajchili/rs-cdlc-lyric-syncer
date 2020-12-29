import React, { Component } from 'react';

const hotkeys = {
  SPACE: 'Play/Pause',
  H: 'Add lyric at current time',
  J: 'End lyric at current time',
  K: 'End verse at current time',
};

export default class extends Component {
  renderHotkeys = () => {
    const hotkeyElements = [];
    for (let hotkey in hotkeys) {
      hotkeyElements.push(
        <span>
          <strong>{hotkey}</strong> - {hotkeys[hotkey]}
        </span>
      );
    }
    return hotkeyElements.map((hotkey, i) => <li key={i}>{hotkey}</li>);
  };

  render() {
    const { id = 'help-modal' } = this.props;

    return (
      <>
        <a
          className="uk-button uk-button-text"
          href={`#${id}`}
          uk-toggle={`target: #${id}`}
        >
          Help
        </a>
        <div id={id} className="uk-flex-top" uk-modal="true">
          <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
            <button
              className="uk-modal-close-default"
              type="button"
              uk-close="true"
            />
            <h1 className="uk-heading-line">
              <span>Hotkeys</span>
            </h1>
            <ul className="uk-list">{this.renderHotkeys()}</ul>
          </div>
        </div>
      </>
    );
  }
}
