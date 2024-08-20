import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from '@fluentui/tokens';
import webcomponentsTheme from './theme.mjs';
import { setTheme } from '../src/theme/set-theme.js';

import '../src/index-rollup.js';
import './docs-root.css';

const themes = {
  'web-light': webLightTheme,
  'web-dark': webDarkTheme,
  'teams-light': teamsLightTheme,
  'teams-dark': teamsDarkTheme,
};

function changeTheme(/** @type {Event} */ e) {
  setTheme(themes[/** @type {keyof themes} */ (/** @type {HTMLInputElement}*/ (e.target).value)]);
}

// This is needed in Playwright.
Object.defineProperty(window, 'setTheme', { value: setTheme });

document.getElementById('theme-switch')?.addEventListener('change', changeTheme, false);
setTheme(themes['web-light']);

export const parameters = {
  layout: 'fullscreen',
  controls: { expanded: true },
  viewMode: 'docs',
  previewTabs: {
    canvas: { hidden: true },
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Concepts', ['Introduction', 'Developer', ['Quick Start']], 'Components', 'Theme'],
    },
  },
  docs: {
    theme: webcomponentsTheme, // override the default Storybook theme with a custom fluent theme
  },
};
