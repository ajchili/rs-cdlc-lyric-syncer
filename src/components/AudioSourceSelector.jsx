import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.audioInput = React.createRef();
  }

  audioInputValueChanged = () => {
    const { setMedia } = this.props;
    if (setMedia) {
      const file = this.audioInput.current.files[0];
      const url = URL.createObjectURL(file);
      setMedia(file.name, file.type, url);
    }
  };

  selectAudioSource = () => {
    this.audioInput.current.click();
  };

  render() {
    return (
      <div>
        <button
          className="uk-button uk-button-default uk-button-small"
          onClick={this.selectAudioSource}
        >
          Select Audio Source
        </button>
        <input
          type="file"
          accept="audio/*"
          ref={this.audioInput}
          onChange={this.audioInputValueChanged}
          hidden
        />
      </div>
    );
  }
}
