import { useState, useEffect } from "react";
import { useGameContext } from "../../../components/GameContext";
import useTypingGame from "react-typing-game-hook";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const RegularGameMode = ({ instantDeath }) => {
  const {
    currentLevels,
    setCurrentGameWpm,
    setAccuracy,
    accuracy: contextAccuracy,
    updateTotalWpm,
  } = useGameContext();

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentGameWpm, setCurrentGameWpmState] = useState(0);

  const levelText =
    currentLevels.length > 0 ? currentLevels[currentLevelIndex].text : "";

  const {
    states: {
      chars,
      charsState,
      startTime,
      endTime,
      correctChar,
      errorChar,
      phase,
    },
    actions: { insertTyping, resetTyping },
  } = useTypingGame(levelText, {
    skipCurrentWordOnSpace: true,
    pauseOnError: false,
    countErrors: "everytime",
  });

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === "Escape") {
      resetTyping();
    } else if (key === "Backspace") {
      insertTyping("", true);
    } else if (key.length === 1) {
      insertTyping(key);
    }
    e.preventDefault();
  };

  const calculateStats = (currentTimeStamp) => {
    const durationInMinutes =
      ((instantDeath ? currentTimeStamp : endTime) - startTime) / 60000;
    console.log(startTime);
    const calculatedWpm = correctChar / 5 / durationInMinutes;
    const accuracy = (correctChar / (correctChar + errorChar)) * 100 || 0;
    setCurrentGameWpm(calculatedWpm);
    setCurrentGameWpmState(calculatedWpm);
    setAccuracy(accuracy);
  };

  useEffect(() => {
    const currentTimestamp = Date.now();
    if (instantDeath && errorChar > 0) {
      calculateStats(currentTimestamp);
      updateTotalWpm(currentGameWpm);
      setGameCompleted(true);
    } else if (phase === 2) {
      calculateStats(currentTimestamp);
      if (currentLevelIndex < currentLevels.length - 1) {
        setOpenDialog(true);
      } else {
        calculateStats(currentTimestamp);
        setGameCompleted(true);
        updateTotalWpm(currentGameWpm);
      }
    }
  }, [phase, currentLevelIndex, currentLevels.length, errorChar, instantDeath]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentLevelIndex(currentLevelIndex + 1);
    resetTyping();
  };

  const handleRestartGame = () => {
    setCurrentLevelIndex(0);
    setGameCompleted(false);
    resetTyping();
    setOpenDialog(false);
    setCurrentGameWpmState(0);
  };

  if (gameCompleted) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Game Completed!
        </Typography>
        <Typography variant="h6">
          Your Current Game WPM: {currentGameWpm.toFixed(2)}
        </Typography>
        <Typography variant="h6">
          Your Accuracy: {contextAccuracy.toFixed(2)}%
        </Typography>
        <Button onClick={handleRestartGame} sx={{ mt: 2 }}>
          Restart
        </Button>
      </Box>
    );
  }

  return (
    <Box
      onKeyDown={handleKeyDown}
      tabIndex={0}
      sx={{ outline: "none", padding: "25px" }}
    >
      <Typography variant="h4" gutterBottom sx={{ marginBottom: "20px" }}>
        Type the text below:
      </Typography>
      <Typography variant="h5" component="div">
        {chars.split("").map((char, index) => {
          const state = charsState[index];
          const color =
            state === 0
              ? "grey"
              : state === 1
              ? "green"
              : state === 2
              ? "red"
              : "inherit";
          return (
            <span key={index} style={{ color }}>
              {char}
            </span>
          );
        })}
      </Typography>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Level Completed</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Great job! Ready for the next level?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Yes, continue</Button>
        </DialogActions>
      </Dialog>
      <Button onClick={resetTyping} sx={{ mt: 2 }}>
        Reset
      </Button>
    </Box>
  );
};

export default RegularGameMode;
