'use client';

import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from '@fluentui/react-theme';
import * as React from 'react';
import { clsx } from 'clsx';

import { PreviewSettingsProvider } from './StoryPreview';
import type { TextDirection } from './StoryPreview';
import { DocsLabel, DocsSelect, DocsSwitch } from './DocsControls';

export const THEMES = {
  'web-light': { label: 'Web Light', theme: webLightTheme },
  'web-dark': { label: 'Web Dark', theme: webDarkTheme },
  'teams-light': { label: 'Teams Light', theme: teamsLightTheme },
  'teams-dark': { label: 'Teams Dark', theme: teamsDarkTheme },
};

export type ThemeId = keyof typeof THEMES;

const STORAGE_KEY = 'fluentui-docsite-preview-settings';
const DEFAULT_THEME: ThemeId = 'web-light';

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && value in THEMES;
}

export interface DocsSettingsProviderProps {
  children: React.ReactNode;
  showThemePicker?: boolean;
  actions?: React.ReactNode;
  introduction?: React.ReactNode;
  className?: string;
}

export const DocsSettingsProvider = ({
  children,
  showThemePicker = true,
  actions,
  introduction,
  className,
}: DocsSettingsProviderProps): React.ReactElement => {
  const themeSelectId = React.useId();
  const [themeId, setThemeId] = React.useState<ThemeId>(DEFAULT_THEME);
  const [dir, setDir] = React.useState<TextDirection>('ltr');
  const [settingsLoaded, setSettingsLoaded] = React.useState(false);

  React.useEffect(() => {
    let stored: unknown;
    try {
      const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
      stored = raw ? JSON.parse(raw) : undefined;
    } catch (error) {
      // eslint-disable-next-line no-console -- Report persistence failures without interrupting the preview.
      console.warn('Unable to restore docsite preview settings; using defaults.', error);
    }

    if (stored !== null && typeof stored === 'object') {
      if ('themeId' in stored && isThemeId(stored.themeId)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setThemeId(stored.themeId);
      }

      if ('dir' in stored && (stored.dir === 'ltr' || stored.dir === 'rtl')) {
        setDir(stored.dir);
      }
    }
    setSettingsLoaded(true);
  }, []);

  React.useEffect(() => {
    if (!settingsLoaded) {
      return;
    }
    const serializedSettings = JSON.stringify({ themeId, dir });
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, serializedSettings);
    } catch (error) {
      // eslint-disable-next-line no-console -- Report persistence failures without interrupting the preview.
      console.warn('Unable to save docsite preview settings; changes will not persist after reload.', error);
    }
  }, [themeId, dir, settingsLoaded]);

  const value = React.useMemo(() => ({ theme: THEMES[themeId].theme, themeId, dir }), [themeId, dir]);
  const handleThemeChange = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setThemeId(event.currentTarget.value as ThemeId);
  }, []);
  const handleDirectionChange = React.useCallback((_: unknown, data: { checked: boolean }) => {
    setDir(data.checked ? 'rtl' : 'ltr');
  }, []);

  return (
    <PreviewSettingsProvider value={value}>
      <div
        className={clsx(
          'flex flex-wrap items-center justify-between gap-x-lg gap-y-sm text-control',
          className ?? 'my-lg',
        )}
      >
        <div className="flex flex-wrap items-center gap-lg">
          {showThemePicker ? (
            <div className="flex items-center gap-sm">
              <DocsLabel htmlFor={themeSelectId}>Theme</DocsLabel>
              <DocsSelect id={themeSelectId} value={themeId} onChange={handleThemeChange}>
                {Object.entries(THEMES).map(([id, { label }]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </DocsSelect>
            </div>
          ) : null}
          <DocsSwitch checked={dir === 'rtl'} onChange={handleDirectionChange} label="Right-to-left" />
        </div>
        {actions}
      </div>
      {introduction}
      {children}
    </PreviewSettingsProvider>
  );
};
