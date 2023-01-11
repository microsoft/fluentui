import * as Fluent from '../src/index-rollup.ts';
import webcomponentsTheme from './theme.mjs';
import { switchTheme } from '../public/theme-switch.ts';

Fluent;

function changeTheme(e) {
  switchTheme(e.target.value);
}

document.getElementById('theme-switch').addEventListener('change', changeTheme, false);
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
      order: [],
      method: 'alphabetical',
    },
  },
  docs: {
    theme: webcomponentsTheme, // override the default Storybook theme with a custom fluent theme
  },
};
