import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import PracticePage from "./pages/PracticePage/PracticePage";
import { GameProvider } from "./components/GameContext";
import RegularGameMode from "./pages/NewGamePage/GameModes/RegularGameMode";

function App() {
  return (
    <>
      <GameProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/practice" element={<PracticePage />} />
            <Route
              path="/regular"
              element={<RegularGameMode instantDeath={false} />}
            />
            <Route
              path="/instant-death"
              element={<RegularGameMode instantDeath={true} />}
            />
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </>
  );
}

export default App;
