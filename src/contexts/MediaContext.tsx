import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type Media = {
  title: string;
  type: string;
  url: string;
};

type MediaProviderProps = {
  children: ReactNode;
  defaultMedia?: Media;
};

type MediaProviderState = {
  media: Media | null;
  setMedia: (media: Media | null) => void;
};

const initialState: MediaProviderState = {
  media: null,
  setMedia: () => null,
};

const MediaProviderContext = createContext<MediaProviderState>(initialState);

export const MediaProvider = ({
  children,
  defaultMedia = null,
}: MediaProviderProps) => {
  const [media, setMedia] = useState<Media | null>(defaultMedia);

  const onMediaChange = useCallback(
    (media: Media) => {
      setMedia(media);
    },
    [setMedia]
  );

  const value: MediaProviderState = { media, setMedia: onMediaChange };

  return (
    <MediaProviderContext.Provider value={value}>
      {children}
    </MediaProviderContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaProviderContext);

  if (context === undefined) {
    throw new Error("useMedia must be used within a MediaProvider");
  }

  return context;
};
