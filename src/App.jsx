import React, { Component } from 'react';
import AudioSourceSelector from './components/AudioSourceSelector';
import Footer from './components/Footer';
import Header from './components/Header';
import Player from './components/Player';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      media: null,
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

  render() {
    const { media } = this.state;

    return (
      <div className="uk-container">
        <Header />
        <AudioSourceSelector setMedia={this.setMedia} />
        {media !== null && <Player media={media} />}
        <Footer />
      </div>
    );
  }
}
