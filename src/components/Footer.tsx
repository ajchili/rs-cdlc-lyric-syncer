import { HelpModal } from "./HelpModal";

export const Footer = () => {
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
};
