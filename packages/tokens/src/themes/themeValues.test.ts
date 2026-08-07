import * as fs from 'fs';
import * as path from 'path';

import {
  teamsDarkTheme,
  teamsDarkV21Theme,
  teamsHighContrastTheme,
  teamsLightTheme,
  teamsLightV21Theme,
} from './teams/index';
import { webDarkTheme, webLightTheme } from './web/index';

const SHIPPED_THEMES = {
  webLightTheme,
  webDarkTheme,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightV21Theme,
  teamsDarkV21Theme,
} as const;

/**
 * Drift gate for the committed `theme-values.json` snapshot (theming Phase 2b).
 *
 * The snapshot is the value source for the static theme CSS classes emitted by
 * `@fluentui/react-tailwind-theme` (which deliberately does not depend on this package's
 * build output). If a theme value changes without regenerating the snapshot, the shipped
 * CSS would silently diverge from the JS themes — this test turns that into a CI failure.
 *
 * To fix a failure: `yarn nx run tokens:build && yarn workspace @fluentui/tokens generate-theme-values`,
 * then regenerate the theme CSS (`yarn workspace @fluentui/react-tailwind-theme generate-tokens-css`).
 */
describe('theme-values.json', () => {
  const snapshotPath = path.join(__dirname, '..', '..', 'theme-values.json');

  it('exists (committed at the package root)', () => {
    expect(fs.existsSync(snapshotPath)).toBe(true);
  });

  it('deep-equals the computed shipped themes', () => {
    const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));

    expect(Object.keys(snapshot.themes)).toEqual(Object.keys(SHIPPED_THEMES));

    for (const [name, theme] of Object.entries(SHIPPED_THEMES)) {
      expect(snapshot.themes[name]).toEqual(theme);
    }
  });
});
