import { AudioSourceSelector } from "./components/AudioSourceSelector";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MediaProvider } from "./contexts/MediaContext";
import { PlayerWrapper } from "./components/PlayerWrapper";

export const App = () => {
  return (
    <div className="uk-container">
      <Header />
      <MediaProvider>
        <AudioSourceSelector />
        <PlayerWrapper />
      </MediaProvider>
      <Footer />
    </div>
  );
};
