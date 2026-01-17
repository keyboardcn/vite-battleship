import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "react-toastify"
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { OnePlayerGame, TwoPlayerGame } from '../services/games';


const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const { rows, cols, mode } = useAppSelector(state => state.gameConfig);

  const [gameInstance, setGameInstance] = useState(null);
  const [playerTurn, setPlayerTurn] = useState(0); // 0 for Player1, 1 for Player2
  const [boards, setBoards] = useState([]);
  const [statusMessage, setStatusMessage] = useState(""); // Message displayed to the user
  const [winnerBoards, setWinnerBoards] = useState([]); // Boards to display in win dialog
  const [seenShots, setSeenShots] = useState([]); // To track shots already made in the current game

  const startGame = (mode: string,) => {
    console.log('Game mode', mode);
    let newGame;
    if (mode === "1P") {
      newGame = new OnePlayerGame("Player1", rows, cols);
    } else {
      newGame = new TwoPlayerGame("Player1", "Player2", rows, cols);
    }
    setGameInstance(newGame);
    setSeenShots([]);
    setPlayerTurn(0);
    setStatusMessage(""); // Clear status message

    setWinnerBoards([]); // Clear winner boards

    // Set initial boards based on the new game instance
    setBoards(mode === "1P"
      ? [newGame.player.board.board]
      : [newGame.player1.board.board, newGame.player2.board.board]);

    console.log("Game started (Context):", newGame);
  };

  const handleShoot = (rowInput, colInput) => {
    if (rowInput === "" || colInput === "") {
      setStatusMessage("Please enter both row and column!");
      return;
    }
    if (!gameInstance) {
      setStatusMessage("Game not started!");
      return;
    }

    const row = parseInt(rowInput);
    const col = parseInt(colInput);
    const marker = `P${playerTurn}.${row}.${col}`;

    if (seenShots.includes(marker) || row < 0 || row >= rows || col < 0 || col >= cols) {
      toast("❌Invalid shot or already shot here!");
      return;
    }

    const result = gameInstance.alternativeShoot(row, col);
    setSeenShots((prev) => [...prev, marker]); // Add shot to seen list

    // Update boards state from the game instance
    const newBoards = mode === "1P"
      ? [gameInstance.player.board.board]
      : [gameInstance.player1.board.board, gameInstance.player2.board.board];
    setBoards([...newBoards]);
    // Update status message
    toast(result.hit ? `🔥 ${result.shooter} hit!` : `❌ ${result.shooter} missed!`);

    if (result.winner) {
      setWinnerBoards([...newBoards]); // Capture final board state
    }

  };


  // Value provided by the context
  const contextValue = {
    gameInstance,
    playerTurn,
    boards,
    statusMessage,
    winnerBoards,
    startGame,
    handleShoot,
    setPlayerTurn,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  if (!GameContext) {
    console.log("Null game context!");
    return;
  }
  return useContext(GameContext);
}