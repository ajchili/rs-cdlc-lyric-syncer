const hotkeys = {
  SPACE: "Play/Pause",
  H: "Add lyric at current time",
  J: "End lyric at current time",
  K: "End verse at current time",
  "Scroll/Zoom": "Scrolling on the audio area will zoom in and out",
};

interface HelpModalProps {
  id?: string;
}

export const HelpModal = ({ id = "help-modal" }: HelpModalProps) => {
  return (
    <>
      <a
        className="uk-button uk-button-text"
        href={`#${id}`}
        uk-toggle={`target: #${id}`}
      >
        Help
      </a>
      <div id={id} className="uk-flex-top" uk-modal="true">
        <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <button
            className="uk-modal-close-default"
            type="button"
            uk-close="true"
          />
          <h1 className="uk-heading-line uk-margin-top">
            <span>Hotkeys</span>
          </h1>
          <ul className="uk-list">
            {Object.entries(hotkeys).map(([key, description]) => {
              return (
                <li key={key}>
                  <span>
                    <strong>{key}</strong> - {description}
                  </span>
                </li>
              );
            })}
          </ul>
          <h1 className="uk-heading-line uk-margin-top">
            <span>Syntax</span>
          </h1>
          <ul className="uk-list">
            <li>
              To specify syllables in a word, add a lyric per syllable,
              specifying a <strong>- (hyphen)</strong> at the end of each lyric
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
