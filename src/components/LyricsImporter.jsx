import React, { Component } from 'react';
import Button from './Button';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: '',
    };
    this.lyricInput = React.createRef();
  }

  importFromTextfield = () => {
    const { onImportLyrics } = this.props;
    const { lyrics } = this.state;
    if (lyrics == null || lyrics.length === 0) {
      return;
    }
    let rawLyrics = lyrics;
    while (rawLyrics.includes('\n')) {
      rawLyrics = rawLyrics.replace('\n', ' ');
    }
    rawLyrics = rawLyrics.split(' ');
    const processedLyrics = [];
    for (let lyric of rawLyrics) {
      lyric.split('-').forEach((lyric, i, arr) => {
        if (arr.length - 1 === i) {
          processedLyrics.push(lyric);
        } else {
          processedLyrics.push(`${lyric}-`);
        }
      });
    }
    onImportLyrics(processedLyrics);
  };

  importFromFile = () => {
    this.lyricInput.current.click();
  };

  lyricInputValueChanged = () => {
    const file = this.lyricInput.current.files[0];
    const reader = new FileReader();
    reader.onload = this.parseLyricsFromFile;
    reader.readAsText(file);
  };

  parseLyricsFromFile = (event) => {
    const { onImportPoints } = this.props;
    const text = event.target.result;
    const lines = text.split('\n');
    let gap = (
      lines.filter((line) => line.startsWith('#GAP'))[0] || '#GAP:0'
    ).split(':')[1];
    gap = parseInt(gap, 10) / 1000;
    let bpm = (
      lines.filter((line) => line.startsWith('#BPM'))[0] || '#BPM:100'
    ).split(':')[1];
    bpm = parseInt(bpm, 10);
    const lyricLines = lines.filter(
      (line) => !line.startsWith('#') && !line.startsWith('E')
    );
    const points = [];
    for (let i = 0; i < lyricLines.length; i++) {
      const line = lyricLines[i];
      const isLyric = line.startsWith(':');
      const isEndMarker = line.startsWith('-');
      const parts = line.split(' ');
      const pos = parseInt(parts[1], 10) / 1000;
      const endPos = pos + parseInt(parts[2], 10) / 1000;
      const time = (pos / bpm) * 15000 + gap;
      const endTime = (endPos / bpm) * 15000 + gap;
      if (isEndMarker) {
        points.push({
          color: '#FF0000',
          editable: true,
          labelText: '(end of verse)',
          time,
        });
      } else if (isLyric) {
        points.push({
          color: '#666',
          editable: true,
          labelText: parts[parts.length - 1],
          time,
        });
        if (i + 1 < lyricLines.length) {
          const nextLine = lyricLines[i + 1];
          const nextLinePos = parseInt(nextLine.split(' ')[1], 10) / 1000;
          if (endPos !== nextLinePos) {
            points.push({
              color: '#0000FF',
              editable: true,
              labelText: '(end of lyric)',
              time: endTime,
            });
          }
        } else {
          points.push({
            color: '#FF0000',
            editable: true,
            labelText: '(end of verse)',
            time: endTime,
          });
        }
      }
    }
    onImportPoints(points);
  };

  render() {
    const { lyrics } = this.state;

    return (
      <div className="uk-card uk-card-default uk-card-body">
        <div className="uk-flex uk-flex-column uk-height-1-1">
          <h3 className="uk-card-title">Import Lyrics</h3>
          <textarea
            className="uk-textarea uk-flex-1"
            placeholder="Lyrics"
            style={{ resize: 'none' }}
            value={lyrics}
            onChange={(e) => {
              e.stopPropagation();
              this.setState({ lyrics: e.target.value });
            }}
          ></textarea>
          <div className="uk-margin-top">
            <Button
              full
              text="Import From Textfield"
              onClick={this.importFromTextfield}
            />
            <Button
              full
              text="Import From File"
              onClick={this.importFromFile}
            />
            <input
              type="file"
              accept="text/plain"
              ref={this.lyricInput}
              onChange={this.lyricInputValueChanged}
              hidden
            />
          </div>
        </div>
      </div>
    );
  }
}
