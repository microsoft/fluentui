import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { useEffect, useMemo, useState, type ReactNode } from 'react';

import { PreviewSettingsProvider, type TextDirection } from './story-preview';

const THEMES = {
  'web-light': { label: 'Web Light', theme: webLightTheme },
  'web-dark': { label: 'Web Dark', theme: webDarkTheme },
  'teams-light': { label: 'Teams Light', theme: teamsLightTheme },
  'teams-dark': { label: 'Teams Dark', theme: teamsDarkTheme },
} as const;

export type ThemeId = keyof typeof THEMES;

const STORAGE_KEY = 'fluentui-docsite-preview-settings';
const DEFAULT_THEME: ThemeId = 'web-light';

function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && value in THEMES;
}

export interface DocsSettingsProviderProps {
  children: ReactNode;
  /** Omit the theme picker for trees where theming does not apply (e.g. headless). */
  showThemePicker?: boolean;
}

/**
 * Holds the reader's theme and text-direction choices and applies them to every preview
 * on the page (`docsite/component-page`).
 *
 * Selections persist across navigation via storage. Storage is read in an effect rather
 * than during render so prerendering stays deterministic and hydration cannot mismatch.
 */
export function DocsSettingsProvider({ children, showThemePicker = true }: DocsSettingsProviderProps) {
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME);
  const [dir, setDir] = useState<TextDirection>('ltr');

  useEffect(() => {
    try {
      const raw = globalThis.localStorage?.getItem(STORAGE_KEY);

      if (!raw) {
        return;
      }

      const stored = JSON.parse(raw) as { themeId?: unknown; dir?: unknown };

      if (isThemeId(stored.themeId)) {
        setThemeId(stored.themeId);
      }

      if (stored.dir === 'ltr' || stored.dir === 'rtl') {
        setDir(stored.dir);
      }
    } catch {
      // A malformed or unavailable store must not break the page; defaults stand.
    }
  }, []);

  useEffect(() => {
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify({ themeId, dir }));
    } catch {
      // Persistence is best-effort (private mode, disabled storage).
    }
  }, [themeId, dir]);

  const value = useMemo(() => ({ theme: THEMES[themeId].theme, themeId, dir }), [themeId, dir]);

  return (
    <PreviewSettingsProvider value={value}>
      <div className="my-4 flex flex-wrap items-center gap-4 text-sm">
        {showThemePicker ? (
          <label className="flex items-center gap-2">
            <span>Theme</span>
            <select
              value={themeId}
              onChange={event => setThemeId(event.currentTarget.value as ThemeId)}
              className="rounded-md border px-2 py-1"
            >
              {Object.entries(THEMES).map(([id, { label }]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={dir === 'rtl'}
            onChange={event => setDir(event.currentTarget.checked ? 'rtl' : 'ltr')}
          />
          <span>Right-to-left</span>
        </label>
      </div>
      {children}
    </PreviewSettingsProvider>
  );
}
