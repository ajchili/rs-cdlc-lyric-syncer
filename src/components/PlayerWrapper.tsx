import { useState, Suspense, lazy } from "react";
import LyricsImporter from "./LyricsImporter";
import { useMedia } from "../contexts/MediaContext";

const Player = lazy(() => import("./Player"));

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
        <Suspense>
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
        </Suspense>
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
