import { THEMES } from "../constants";

export function ThemeSelector({ theme, onThemeChange }) {
  return (
    <section className="theme-selector">
      <label htmlFor="theme" className="sr-only">
        Theme
      </label>
      <select
        id="theme"
        value={theme}
        onChange={(event) => onThemeChange(event.target.value)}
        className="theme-select"
      >
        {THEMES.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </section>
  );
}
