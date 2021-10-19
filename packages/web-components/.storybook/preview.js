import * as Fluent from '../src/index-rollup';
import webcomponentsTheme from './theme';
import { toggleBgMode, toggleLtr } from '../public/switches';

Fluent;

document.getElementById('luminance-switch').addEventListener('change', () => toggleBgMode(), false);
document.getElementById('ltr-switch').addEventListener('change', () => toggleLtr(), false);

export const parameters = {
  layout: 'fullscreen',
  controls: { expanded: true },
  viewMode: 'docs',
  previewTabs: {
    canvas: { hidden: true },
  },
  options: {
    storySort: {
      order: [
        'Getting Started',
        ['Overview', 'Installation'],
        'Components',
        'Integrations',
        ['Introduction'],
        'Design System',
        ['Design Tokens', 'High Contrast'],
        'Resources',
        ['Browser Support', 'FAQ', 'License', 'Security'],
        '*',
      ],
      method: 'alphabetical',
    },
  },
  docs: {
    theme: webcomponentsTheme, // override the default Storybook theme with a custom fluent theme
  },
};
