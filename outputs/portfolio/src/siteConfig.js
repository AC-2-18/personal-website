// Personal settings adapted from Firefly's display configuration concepts.
export const defaultAppearance = Object.freeze({
  theme: 'dark', hue: 220, layout: 'list', wallpaper: 'pattern',
  waves: true, cardBorder: false, cardTint: false,
});
export const appearanceKey = 'gui-appearance-v1';
export function readAppearance() {
  let saved = {};
  try {
    const raw = localStorage.getItem(appearanceKey);
    if (raw) saved = JSON.parse(raw) || {};
    else {
      const oldTheme = localStorage.getItem('gui-theme');
      if (['light', 'dark'].includes(oldTheme)) saved.theme = oldTheme;
    }
  } catch { /* Defaults remain usable when storage is unavailable or invalid. */ }
  return {
    theme: 'dark',
    hue: typeof saved.hue === 'number' && Number.isFinite(saved.hue) ? Math.max(0, Math.min(360, saved.hue)) : defaultAppearance.hue,
    layout: saved.layout === 'grid' ? 'grid' : 'list',
    wallpaper: 'pattern',
    ...Object.fromEntries(['waves', 'cardBorder', 'cardTint'].map(key => [key, typeof saved[key] === 'boolean' ? saved[key] : defaultAppearance[key]])),
  };
}
