import { addons } from '@storybook/addons';
import { DOCS_RENDERED } from '@storybook/core-events';
import * as Fluent from '../src/index-rollup';
import webcomponentsTheme from './theme';

Fluent;

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
        ['Design Tokens', 'Color Explorer', 'High Contrast'],
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
  if (name.toLowerCase().includes('accordion') || name.toLowerCase().includes('card')) {
    fillColor.setValueFor(document.body, neutralLayer2);
  } else {
    fillColor.setValueFor(document.body, neutralLayer1);
  }

  if (name.toLowerCase().includes('color-explorer')) {
    document.body.classList.add('custom-fullscreen');
  } else {
    document.body.classList.remove('custom-fullscreen');
  }
});
