import React, { Component } from 'react';
import Peaks from 'peaks.js';

// Workaround for AudioContext.
const AudioContext = window.AudioContext || window.webkitAudioContext;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instance: null,
    };
    this.audio = React.createRef();
  }

  componentDidMount() {
    this.initializePeaks();
    this.addEventListeners();
  }

  initializePeaks = () => {
    const { media } = this.props;
    this.setState({ instance: null });
    this.audio.current.setAttribute('src', media.url);
    this.audio.current.setAttribute('type', media.type);
    this.audio.current.load();
    const audioContext = new AudioContext();
    const options = {
      containers: {
        overview: document.getElementById('overview-container'),
        zoomview: document.getElementById('zoomview-container'),
      },
      mediaElement: this.audio.current,
      webAudio: {
        audioContext: audioContext,
        scale: 64,
        multiChannel: true,
      },
      keyboard: true,
      showPlayheadTime: true,
      zoomLevels: [64, 128, 256, 512, 1024, 2048, 4096, 8192],
    };
    Peaks.init(options, (err, instance) => {
      this.setState({ instance });
      if (err) {
        console.error(err.message);
        return;
      }

      console.log('Peak instance initialized.');

      document.querySelector(
        'button[data-action="toggle-paused"]'
      ).onclick = this.togglePaused;

      document.querySelector(
        'button[data-action="zoom-in"]'
      ).onclick = this.zoomIn;

      document.querySelector(
        'button[data-action="zoom-out"]'
      ).onclick = this.zoomOut;

      document.querySelector(
        'button[data-action="add-segment"]'
      ).onclick = this.addLyric;

      document.querySelector(
        'input[data-action="change-volume"]'
      ).onchange = this.changeVolume;
    });
  };

  addEventListeners = () => {
    document.onkeydown = this.handleKeyDown;
  };

  handleKeyDown = (e) => {
    switch (e.code.toLowerCase()) {
      // Play/Pause on space pressed
      case 'space':
        this.togglePaused();
        break;
      case 'keyl':
        this.addLyric();
        break;
      default:
        console.log(e);
        break;
    }
  };

  addLyric = () => {
    const { instance } = this.state;
    if (instance === null) {
      return;
    }
    const wasPaused = this.audio.current.paused;
    instance.player.pause();
    const lyric = prompt('Please provide a lyric', '');
    if (lyric === null || lyric.trim().length === 0) {
      if (!wasPaused) instance.player.play();
      return;
    }
    instance.segments.add({
      startTime: instance.player.getCurrentTime(),
      endTime: instance.player.getCurrentTime() + 0.5,
      labelText: lyric,
      editable: true,
    });
    if (!wasPaused) instance.player.play();
  };

  changeVolume = () => {
    const { instance } = this.state;
    if (instance === null) {
      return;
    }
    const volume =
      parseFloat(
        document.querySelector('input[data-action="change-volume"]').value
      ) || 1;
    this.audio.current.volume = volume;
  };

  togglePaused = () => {
    const { instance } = this.state;
    if (instance === null) {
      return;
    }
    const wasPaused = this.audio.current.paused;
    document.querySelector(
      'button[data-action="toggle-paused"]'
    ).textContent = wasPaused ? 'Pause' : 'Play';
    if (wasPaused) {
      instance.player.play();
    } else {
      instance.player.pause();
    }
  };

  zoomIn = () => {
    const { instance } = this.state;
    if (instance === null) {
      return;
    }
    instance.zoom.zoomIn();
  };

  zoomOut = () => {
    const { instance } = this.state;
    if (instance === null) {
      return;
    }
    instance.zoom.zoomOut();
  };

  render() {
    const { media } = this.props;
    const { instance } = this.state;

    return (
      <div className="uk-card uk-card-default uk-card-body uk-margin-top">
        <h3 className="uk-card-title">{media.title}</h3>
        <div id="peaks-container">
          <div id="zoomview-container"></div>
          <div id="overview-container"></div>
        </div>
        {instance === null ? (
          <dl className="uk-description-list">
            <dt>Processing song data...</dt>
            <dd>Please wait as "{media.title}" is processed...</dd>
            <br />
            <div uk-spinner="ratio: 1"></div>
          </dl>
        ) : (
          <div className="uk-form-stacked">
            <div className="uk-margin-top">
              <label className="uk-form-label">Controls</label>
              <div className="uk-button-group">
                <button
                  className="uk-button uk-button-default uk-button-small"
                  data-action="toggle-paused"
                  title="(SPACE)"
                >
                  Play
                </button>
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
                  Add a Lyrics at current time
                </button>
              </div>
            </div>
            <div className="uk-margin-top">
              <label className="uk-form-label">Volume</label>
              <div className="uk-form-controls">
                <input
                  className="uk-range"
                  data-action="change-volume"
                  type="range"
                  defaultValue="1"
                  min="0"
                  max="1"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        )}
        <audio ref={this.audio} hidden></audio>
      </div>
    );
  }
}
