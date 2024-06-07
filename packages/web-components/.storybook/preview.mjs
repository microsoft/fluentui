import { switchTheme } from '../public/theme-switch.js';
import webcomponentsTheme from './theme.mjs';

import '../src/index-rollup.js';
import './docs-root.css';

function changeTheme(/** @type {Event} */ e) {
  switchTheme(/** @type {Parameters<typeof switchTheme>[number]} */ (/** @type {HTMLInputElement}*/ (e.target).value));
}

document.getElementById('theme-switch')?.addEventListener('change', changeTheme, false);
switchTheme('web-light');

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
      order: ['Concepts', ['Introduction'], 'Components', 'Theme'],
    },
  },
  docs: {
    theme: webcomponentsTheme, // override the default Storybook theme with a custom fluent theme
  },
};
