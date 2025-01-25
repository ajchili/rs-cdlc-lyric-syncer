import { useCallback, useRef, type ChangeEvent } from "react";
import { useMedia } from "../contexts/MediaContext";

export const AudioSourceSelector = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { setMedia } = useMedia();

  const selectAudioSource = useCallback(() => {
    if (ref.current) {
      ref.current.click();
    }
  }, [ref]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files === null) {
        return;
      }

      const file = e.target.files.item(0);
      const url = URL.createObjectURL(file);
      setMedia({ title: file.name, type: file.type, url });
    },
    [setMedia]
  );

  return (
    <>
      <button
        className="uk-button uk-button-default uk-button-small"
        onClick={selectAudioSource}
      >
        Select Audio Source
      </button>
      <input
        ref={ref}
        type="file"
        accept="audio/*,.wav,.mp3"
        onChange={(e) => onChange(e)}
        hidden
      />
    </>
  );
};
