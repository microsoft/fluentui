import * as Fluent from '../src/index-rollup.js';
import webcomponentsTheme from './theme.mjs';
import { switchTheme } from '../public/theme-switch.js';
import '../../../.storybook/docs-root.css';
import './docs-root-web-compoents.css';

Fluent;

function changeTheme(e) {
  switchTheme(e.target.value);
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
      order: [
        'Concepts',
        [
          'Introduction',
        ],
        'Components',
        'Theme',
      ],
    },
  },
  docs: {
    theme: webcomponentsTheme, // override the default Storybook theme with a custom fluent theme
  },
};
