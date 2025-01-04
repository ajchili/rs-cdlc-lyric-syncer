import React, { Component } from "react";
import HelpModal from "./HelpModal";

export default class Footer extends Component {
  render() {
    return (
      <div className="uk-margin-top">
        <HelpModal />
        <a
          className="uk-button uk-button-text uk-margin-left"
          href="https://github.com/ajchili/rs-cdlc-lyric-syncer"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <a
          className="uk-button uk-button-text uk-margin-left"
          href="https://github.com/ajchili/rs-cdlc-lyric-syncer/issues/new"
          target="_blank"
          rel="noreferrer"
        >
          Report an Issue
        </a>
      </div>
    );
  }
}
