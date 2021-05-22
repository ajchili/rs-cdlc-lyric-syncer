import React, { Component } from 'react';
import AudioSourceSelector from './components/AudioSourceSelector';
import Footer from './components/Footer';
import Header from './components/Header';
import LyricsImporter from './components/LyricsImporter';
import Player from './components/Player';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: [],
      media: null,
      points: [],
      showImportView: false,
    };
  }

  componentDidMount() {
    this.setState({ media: null });
  }

  setMedia = (title, type, url) => {
    this.setState({ media: null }, () => {
      this.setState({ media: { title, type, url } });
    });
  };

  setLyrics = (lyrics, callback) => {
    this.setState({ lyrics }, callback);
  };

  setPoints = (points, callback) => {
    this.setState({ points }, callback);
  };

  toggleImportView = (callback) => {
    const { showImportView } = this.state;
    this.setState({ showImportView: !showImportView }, callback);
  };

  render() {
    const { lyrics, media, points, showImportView } = this.state;

    return (
      <div className="uk-container">
        <Header />
        <AudioSourceSelector setMedia={this.setMedia} />
        <div uk-grid="true" className="uk-margin-top">
          <div className="uk-width-expand">
            {media !== null && (
              <Player
                lyrics={lyrics}
                media={media}
                points={points}
                toggleImportView={this.toggleImportView}
                resetLyrics={(callback) =>
                  this.setLyrics([], this.toggleImportView(callback))
                }
                resetPoints={(callback) =>
                  this.setPoints([], this.toggleImportView(callback))
                }
              />
            )}
          </div>
          {showImportView && (
            <div className="uk-width-1-3 uk-grid-item-match">
              <LyricsImporter
                onImportLyrics={this.setLyrics}
                onImportPoints={this.setPoints}
              />
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
