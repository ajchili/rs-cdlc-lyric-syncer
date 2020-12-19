import React, { Component } from 'react';
import Peaks from 'peaks.js';

// Workaround for AudioContext.
const AudioContext = window.AudioContext || window.webkitAudioContext;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initializingPeaks: false,
    };
    this.audio = React.createRef();
    setTimeout(this.initializePeaks, 0);
  }

  initializePeaks = () => {
    const { media } = this.props;
    if (this.audio.current === null) {
      return;
    }
    this.setState({ initializingPeaks: true });
    this.audio.current.setAttribute('src', media.url);
    this.audio.current.setAttribute('type', media.type);
    this.audio.current.load();
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
    Peaks.init(options, (err, instance) => {
      this.setState({ initializingPeaks: false });
      if (err) {
        console.error(err.message);
        return;
      }

      console.log('Peak instance initialized.');
    });
  };

  render() {
    const { media } = this.props;
    const { initializingPeaks } = this.state;

    return (
      <div className="uk-card uk-card-default uk-card-body uk-margin-top">
        <div id="peaks-container">
          <div id="zoomview-container"></div>
          <div id="overview-container"></div>
        </div>
        {initializingPeaks ? (
          <dl class="uk-description-list">
            <dt>Processing song data...</dt>
            <dd>Please wait as "{media.title}" is processed...</dd>
          </dl>
        ) : (
          <div className="uk-button-group uk-margin-top">
            <button
              className="uk-button uk-button-default uk-button-small"
              data-action="zoom-in"
            >
              Zoom in
            </button>
            <button
              className="uk-button uk-button-default uk-button-small"
              data-action="zoom-out"
            >
              Zoom out
            </button>
            <button
              className="uk-button uk-button-default uk-button-small"
              data-action="add-segment"
            >
              Add a Segment at current time
            </button>
          </div>
        )}
        <audio ref={this.audio} hidden></audio>
      </div>
    );
  }
}
