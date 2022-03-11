import { addons } from '@storybook/addons';
import { DOCS_RENDERED } from '@storybook/core-events';
import * as Fluent from '../src/index-rollup';
import { fillColor, neutralLayer1, neutralLayer2 } from '../src/design-tokens';
import webcomponentsTheme from './theme';
import { changeWeight, toggleBgMode, toggleLtr } from '../public/switches';

Fluent;

document.getElementById('luminance-switch').addEventListener('change', toggleBgMode, false);
document.getElementById('direction-switch').addEventListener('change', toggleLtr, false);
document.getElementById('font-weight').addEventListener('change', changeWeight, false);

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
        ['Overview', 'Installation', 'Styling'],
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

addons.getChannel().addListener(DOCS_RENDERED, name => {
  if (name.toLowerCase() === 'components/accordion' || name.toLowerCase() === 'components/card') {
    fillColor.setValueFor(document.body, neutralLayer2);
  } else {
    fillColor.setValueFor(document.body, neutralLayer1);
  }
});
