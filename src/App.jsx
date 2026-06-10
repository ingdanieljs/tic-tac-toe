import { useState } from "react";
import { Buttons } from "./components/Buttons";
import { Scores } from "./components/Scores";
import { Square } from "./components/Square";
import { ThemeSelector } from "./components/ThemeSelector";
import {
  THEME_STORAGE_KEY,
  THEMES,
  TURNS,
  WINNING_COMBINATIONS,
} from "./constants";
import confetti from "canvas-confetti";

const DEFAULT_THEME = THEMES[0].id;
const CONFETTI_COLORS = [
  "--color-bg-blue",
  "--color-text-hover",
  "--color-bg-aqua",
  "--color-text-square",
];
const CONFETTI_PARTICLE_COUNT = 180;
const CONFETTI_DEFAULTS = {
  origin: { y: 0.65 },
  ticks: 220,
};

function App() {
  const [winnerConbination, setWinnerConbination] = useState([]);

  const [theme, setTheme] = useState(() => {
    const themeFromStorage = window.localStorage.getItem(THEME_STORAGE_KEY);
    return THEMES.some(({ id }) => id === themeFromStorage)
      ? themeFromStorage
      : DEFAULT_THEME;
  });

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.iddle;
  });

  const [winners, setWinners] = useState(() => {
    const winnersFromStorage = window.localStorage.getItem("winners");
    return winnersFromStorage
      ? JSON.parse(winnersFromStorage)
      : { playerX: 0, playerO: 0, draws: 0 };
  });

  const handleNewGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.playerX);
    setWinnerConbination([]);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  const handleRestartGame = () => {
    handleNewGame();
    window.localStorage.removeItem("winners");
    setWinners({ playerX: 0, playerO: 0, draws: 0 });
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const checkWinner = (board) => {
    for (const _combination of WINNING_COMBINATIONS) {
      const [a, b, c] = _combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinnerConbination(_combination);
        return board[a];
      }
    }

    return null;
  };

  const runConfetti = () => {
    const themeElement = document.querySelector(".background-wrapper");
    const styles = getComputedStyle(themeElement ?? document.documentElement);
    const colors = CONFETTI_COLORS.map((color) =>
      styles.getPropertyValue(color).trim()
    );

    const fireConfetti = (particleRatio, options) => {
      confetti({
        ...CONFETTI_DEFAULTS,
        ...options,
        colors,
        particleCount: Math.floor(CONFETTI_PARTICLE_COUNT * particleRatio),
      });
    };

    fireConfetti(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fireConfetti(0.2, {
      spread: 60,
    });

    fireConfetti(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fireConfetti(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fireConfetti(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const verifyWinner = (_board) => {
    let winnerPlayer = null;
    const _winner = checkWinner(_board);
    if (_winner) {
      winnerPlayer = _winner === TURNS.playerX ? "playerX" : "playerO";
      runConfetti();
    } else if (!_board.includes(null)) {
      winnerPlayer = "draws";
    }

    if (winnerPlayer) {
      const updateWinner = {
        ...winners,
        [winnerPlayer]: winners[winnerPlayer] + 1,
      };
      setWinners(updateWinner);
      setTurn(TURNS.iddle);
      window.localStorage.setItem("winners", JSON.stringify(updateWinner));
      window.localStorage.removeItem("board");
      window.localStorage.removeItem("turn");
    }
  };

  const updateBoard = (index) => {
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.playerX ? TURNS.playerO : TURNS.playerX;
    setTurn(newTurn);

    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);
    verifyWinner(newBoard);
  };

  return (
    <section className="background-wrapper" data-theme={theme}>
      <section className="board">
        <ThemeSelector theme={theme} onThemeChange={handleThemeChange} />
        <Scores winners={winners} />
        <section className="game-pad">
          {board.map((cell, index) => (
            <Square
              isDisabled={turn === TURNS.iddle}
              key={index}
              index={index}
              updateBoard={updateBoard}
              isWinner={winnerConbination.includes(index)}
            >
              {cell}
            </Square>
          ))}
        </section>

        <Buttons
          restartGame={handleRestartGame}
          newGame={handleNewGame}
          currentTurn={turn}
        />
      </section>
    </section>
  );
}

export default App;
