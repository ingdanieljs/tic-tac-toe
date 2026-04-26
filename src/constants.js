export const TURNS = {
  playerX: "X",
  playerO: "O",
  iddle: null,
};

export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const THEME_STORAGE_KEY = "theme";

export const THEMES = [
  { id: "gruvbox", label: "Gruvbox" },
  { id: "ayu", label: "Ayu" },
  { id: "dracula", label: "Dracula" },
  { id: "catppuccin-mocha", label: "Catppuccin Mocha" },
];
