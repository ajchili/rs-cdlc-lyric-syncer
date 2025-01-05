import { useState } from "react";
import LyricsImporter from "./LyricsImporter";
import Player from "./Player";
import { useMedia } from "../contexts/MediaContext";

// Temporary component to help with migration to typescript
export const PlayerWrapper = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [lyrics, setLyrics] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [points, setPoints] = useState<any[]>([]);
  const [showLyricsImporter, setShowLyricsImporter] = useState(false);
  const { media } = useMedia();

  if (media === null) {
    return null;
  }

  return (
    <div uk-grid="true" className="uk-margin-top">
      <div className="uk-width-expand">
        <Player
          lyrics={lyrics}
          media={media}
          points={points}
          toggleImportView={() =>
            setShowLyricsImporter((prevValue) => !prevValue)
          }
          resetLyrics={(callback: () => void) => {
            setLyrics([]);
            setShowLyricsImporter(false);
            callback();
          }}
          resetPoints={(callback: () => void) => {
            setPoints([]);
            setShowLyricsImporter(false);
            callback();
          }}
        />
      </div>
      {showLyricsImporter && (
        <div className="uk-width-1-3 uk-grid-item-match">
          <LyricsImporter
            onImportLyrics={setLyrics}
            onImportPoints={setPoints}
          />
        </div>
      )}
    </div>
  );
};
