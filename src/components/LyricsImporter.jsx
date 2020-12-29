import React, { Component } from 'react';
import Button from './Button';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: '',
    };
  }

  importFromTextfield = () => {
    const { onImport } = this.props;
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
    onImport(processedLyrics);
  };

  importFromFile = () => {};

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
            {/* <Button full text="Import From File" /> */}
          </div>
        </div>
      </div>
    );
  }
}
