// Set the colour scheme before the first paint, then connect the controls.
(() => {
  const key = 'daniel-colour-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try { preference = localStorage.getItem(key); } catch (_) { /* Storage may be unavailable. */ }
  let theme = preference === 'dark' || preference === 'light' ? preference : system.matches ? 'dark' : 'light';

  function applyTheme(value) {
    theme = value;
    document.documentElement.dataset.theme = value;
    document.documentElement.style.colorScheme = value;
    document.querySelectorAll('.theme-toggle').forEach(button => {
      const dark = value === 'dark';
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('aria-pressed', String(dark));
      button.querySelector('[data-theme-label]').textContent = dark ? 'Light' : 'Dark';
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = value === 'dark' ? '#181e29' : '#f5f3ec';
  }

  applyTheme(theme);
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(theme);
    document.querySelectorAll('.theme-toggle').forEach(button => {
      button.addEventListener('click', () => {
        preference = theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem(key, preference); } catch (_) { /* Keep the in-page choice. */ }
        applyTheme(preference);
      });
    });
  });
  system.addEventListener('change', event => {
    if (preference !== 'light' && preference !== 'dark') applyTheme(event.matches ? 'dark' : 'light');
  });
})();
