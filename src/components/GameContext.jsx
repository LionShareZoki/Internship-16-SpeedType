import { createContext, useContext, useState, useEffect } from "react";
import levelsData from "../assets/100_words_game_levels.json";
const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [gameMode, setGameMode] = useState(null);
  const [levelsPassed, setLevelsPassed] = useState(0);
  const [currentGameWpm, setCurrentGameWpm] = useState(0);
  const [totalWpm, setTotalWpm] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [currentLevels, setCurrentLevels] = useState([]);

  const selectRandomLevels = (levels, count) => {
    const shuffled = [...levels].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (gameMode === "regular" || gameMode === "instant-death") {
      const selectedLevels = selectRandomLevels(levelsData, 3);
      setCurrentLevels(selectedLevels);
    }
  }, [gameMode]);

  const updateTotalWpm = (newWpm) => {
    const updatedTotalWpm =
      (totalWpm * gamesPlayed + newWpm) / (gamesPlayed + 1);
    setTotalWpm(updatedTotalWpm);
    setGamesPlayed(gamesPlayed + 1);
  };

  return (
    <GameContext.Provider
      value={{
        gameMode,
        setGameMode,
        levelsPassed,
        setLevelsPassed,
        currentGameWpm,
        setCurrentGameWpm,
        totalWpm,
        setTotalWpm,
        gamesPlayed,
        setGamesPlayed,
        accuracy,
        setAccuracy,
        currentLevels,
        updateTotalWpm,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
