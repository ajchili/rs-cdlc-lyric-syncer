import React, { Component } from 'react';
import Peaks from 'peaks.js';

// Workaround for AudioContext.
const AudioContext = window.AudioContext || window.webkitAudioContext;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instance: null,
      currentLyric: null,
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
      emitCueEvents: true,
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

      instance.on('points.enter', (point) => {
        const isLyric = point.color === '#666';
        this.setState({ currentLyric: isLyric ? point.labelText : null });
      });

      instance.on('points.dblclick', this.editLyric);

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
        'button[data-action="add-lyric"]'
      ).onclick = this.addLyric;

      document.querySelector(
        'button[data-action="end-lyric"]'
      ).onclick = this.addEndOfLyric;

      document.querySelector(
        'button[data-action="end-verse"]'
      ).onclick = this.addEndOfVerse;

      document.querySelector(
        'input[data-action="change-volume"]'
      ).onchange = this.changeVolume;
    });
  };

  addEventListeners = () => {
    document.onkeydown = this.handleKeyDown;
  };

  download = (name, artist, fileData) => {
    const fileName = `${artist} - ${name} lyrics.txt`;
    const blob = new Blob([fileData], { type: 'data:text/plain;' });
    const url = URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  export = () => {
    const { media } = this.props;
    const { instance } = this.state;
    if (instance === null) {
      return;
    }
    const title = prompt('Song title', media.title);
    if (title === null || title.trim().length === 0) {
      return;
    }
    const artist = prompt('Artist', '');
    if (artist === null || artist.trim().length === 0) {
      return;
    }
    let bpm = prompt('BPM', '100');
    if (bpm === null || bpm.trim().length === 0) {
      return;
    }
    bpm = parseInt(bpm, 10);
    const points = instance.points.getPoints().sort((a, b) => a.time - b.time);
    const gap = (points.length > 0 ? points[0].time : 0) * 1000;
    const timeToQuarterBeats = bpm * (1 / 60) * (1 / 1000);
    const textContent = [
      `#TITLE:${title}`,
      `#ARTIST:${artist}`,
      `#BPM:${bpm}`,
      `#GAP:${Math.floor(gap)}`,
      ...points.map((point, i) => {
        if (point.color === '#0000FF') {
          return null;
        }
        const isEndMarker = point.color === '#FF0000';
        const pos = point.time * 1000;
        const normalizedPos = Math.floor((pos - gap) * timeToQuarterBeats);
        if (isEndMarker) {
          if (i > 0) {
            return `- ${Math.max(normalizedPos + 1, normalizedPos)}`;
          } else {
            return `- ${normalizedPos}`;
          }
        }
        let normalizedLength = 1;
        if (i + 1 < points.length) {
          const nextPoint = points[i + 1];
          const nextPointPos = nextPoint.time * 1000;
          const normalizedNextPointPos = Math.floor(
            (nextPointPos - gap) * timeToQuarterBeats
          );
          normalizedLength = Math.max(
            1,
            normalizedNextPointPos - normalizedPos
          );
        }
        let lyric = point.labelText;
        if (lyric.slice(-1) === '-') {
          lyric = lyric.substr(0, lyric.length - 1);
        }
        if (
          // Is not the start of a verse
          (i > 0 && points[i - 1].color === '#FF0000') ||
          // Previous lyric is not a syllable
          (i > 0 && points[i - 1].labelText.slice(-1) !== '-')
        ) {
          return `: ${normalizedPos} ${normalizedLength} 0  ${lyric}`;
        }
        return `: ${normalizedPos} ${normalizedLength} 0 ${lyric}`;
      }),
      'E',
    ].filter((line) => line !== null);
    this.download(title, artist, textContent.join('\n'));
  };

  handleKeyDown = (e) => {
    switch (e.code.toLowerCase()) {
      // Play/Pause on space pressed
      case 'space':
        this.togglePaused();
        break;
      case 'keyh':
        this.addLyric();
        break;
      case 'keyj':
        this.addEndOfLyric();
        break;
      case 'keyk':
        this.addEndOfVerse();
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
    instance.points.add({
      time: instance.player.getCurrentTime(),
      labelText: lyric,
      editable: true,
      color: '#666',
    });
    if (!wasPaused) instance.player.play();
  };

  editLyric = (point) => {
    const { instance } = this.state;
    if (instance === null) {
      return;
    }
    const isEndMarker = point.color !== '#666';
    if (isEndMarker) {
      if (window.confirm('Do you want to delete this end marker?')) {
        instance.points.removeById(point.id);
      }
      return;
    }
    const lyric = prompt(
      'Update lyric, leave blank to remove',
      point.labelText
    );
    if (lyric === null || lyric.trim().length === 0) {
      instance.points.removeById(point.id);
      return;
    }
    point.update({
      labelText: lyric,
    });
  };

  addEndOfLyric = () => {
    const { instance } = this.state;
    if (instance === null) {
      return;
    }
    const wasPaused = this.audio.current.paused;
    instance.player.pause();
    instance.points.add({
      time: instance.player.getCurrentTime(),
      labelText: '(end of lyric)',
      editable: true,
      color: '#0000FF',
    });
    if (!wasPaused) instance.player.play();
  };

  addEndOfVerse = () => {
    const { instance } = this.state;
    if (instance === null) {
      return;
    }
    const wasPaused = this.audio.current.paused;
    instance.player.pause();
    instance.points.add({
      time: instance.player.getCurrentTime(),
      labelText: '(end of verse)',
      editable: true,
      color: '#FF0000',
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
      ) || 0;
    this.audio.current.volume = volume;
  };

  togglePaused = () => {
    const { instance } = this.state;
    if (instance === null) {
      return;
    }
    this.setState({ currentLyric: null });
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
    const { instance, currentLyric } = this.state;

    return (
      <div className="uk-card uk-card-default uk-card-body uk-margin-top">
        <h3 className="uk-card-title">{media.title}</h3>
        <h4 className="uk-heading-bullet">
          <span>{currentLyric}</span>
        </h4>
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
          <>
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
                    data-action="add-lyric"
                    title="(H)"
                  >
                    Add a lyrics at current time
                  </button>
                  <button
                    className="uk-button uk-button-default uk-button-small"
                    data-action="end-lyric"
                    title="(J)"
                  >
                    End lyrics at current time
                  </button>
                  <button
                    className="uk-button uk-button-default uk-button-small"
                    data-action="end-verse"
                    title="(K)"
                  >
                    End verse at current time
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
              <div className="uk-margin-top">
                <button
                  className="uk-button uk-button-primary uk-button-small"
                  onClick={this.export}
                >
                  Export
                </button>
              </div>
            </div>
          </>
        )}
        <audio ref={this.audio} hidden></audio>
      </div>
    );
  }
}