import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import { useGameContext } from "../GameContext";

const Header = () => {
  const { levelsPassed, currentGameWpm, totalWpm, setGameMode } =
    useGameContext();
  const [openPractice, setOpenPractice] = useState(false);
  const [openNewGame, setOpenNewGame] = useState(false);
  const navigate = useNavigate();

  const handleOpenPractice = () => {
    setOpenPractice(true);
    setGameMode("practice");
  };

  const handleClosePractice = () => {
    setOpenPractice(false);
  };

  const handleConfirmPractice = () => {
    navigate("/practice");
    setOpenPractice(false);
  };

  const handleSelectGameMode = (mode) => {
    if (mode === "regular") {
      setGameMode("regular");
    } else if (mode === "instant-death") {
      setGameMode("instant-death");
    }
    navigate(`/${mode}`);
    setOpenNewGame(false);
  };

  const handleOpenNewGame = () => {
    setOpenNewGame(true);
  };

  const handleCloseNewGame = () => {
    setOpenNewGame(false);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <Box>
          <Button color="inherit" onClick={handleOpenPractice}>
            Practice
          </Button>
          <Button color="inherit" onClick={handleOpenNewGame}>
            New Game
          </Button>
        </Box>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "right" }}>
          Levels Passed: {levelsPassed} | Current Game WPM:{" "}
          {currentGameWpm.toFixed(2)} | Total WPM: {totalWpm.toFixed(2)}
        </Typography>
        <Dialog open={openPractice} onClose={handleClosePractice}>
          <DialogTitle>Practice Mode</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to enter Practice Mode?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmPractice} color="primary">
              Yes
            </Button>
            <Button onClick={handleClosePractice} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openNewGame} onClose={handleCloseNewGame}>
          <DialogTitle>New Game</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want Regular mode or Instant death mode?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleSelectGameMode("regular")}
              color="primary"
            >
              Regular
            </Button>
            <Button
              onClick={() => handleSelectGameMode("instant-death")}
              color="primary"
            >
              Instant Death
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
