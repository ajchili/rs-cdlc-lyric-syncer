import React, { Component } from 'react';
import Peaks from 'peaks.js';

// Workaround for AudioContext.
const AudioContext = window.AudioContext || window.webkitAudioContext;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.audioInput = React.createRef();
    this.audio = React.createRef();
  }

  audioInputValueChanged = async () => {
    const file = this.audioInput.current.files[0];
    const srcUri = URL.createObjectURL(file);
    this.audio.current.setAttribute('src', srcUri);
    this.audio.current.setAttribute('type', file.type);
    this.audio.current.load();
    this.initializePeaksJS(srcUri);
  };

  initializePeaksJS = async (srcUri) => {
    const audioContext = new AudioContext();
    const options = {
      containers: {
        overview: document.getElementById('overview-container'),
        zoomview: document.getElementById('zoomview-container'),
      },
      mediaElement: document.querySelector('audio'),
      webAudio: {
        audioContext: audioContext,
        scale: 128,
        multiChannel: false,
      },
      keyboard: true,
      showPlayheadTime: true,
      zoomLevels: [128, 256, 512, 1024, 2048, 4096],
    };
    Peaks.init(options, function (err, peaks) {
      if (err) {
        console.error(err.message);
        return;
      }

      console.log('Peaks instance ready');
    });
  };

  render() {
    return (
      <div>
        <input
          type="file"
          accept="audio/*"
          ref={this.audioInput}
          onChange={this.audioInputValueChanged}
        ></input>
        <audio controls ref={this.audio}></audio>
        <br />
        <div id="peaks-container">
          <div id="zoomview-container"></div>
          <div id="overview-container"></div>

          <div id="controls">
            <button data-action="zoom-in">Zoom in</button>
            <button data-action="zoom-out">Zoom out</button>
            <label for="select-audio">Select audio:</label>
            <select id="select-audio"></select>
          </div>
        </div>
      </div>
    );
  }
}
