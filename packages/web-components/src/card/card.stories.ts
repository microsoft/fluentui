import { addons } from '@storybook/addons';
import { DOCS_RENDERED } from '@storybook/core-events';
import { DesignSystemProvider, StandardLuminance } from '../index-rollup';
import CardTemplate from './fixtures/card.html';
import './index';

addons.getChannel().addListener(DOCS_RENDERED, name => {
  if (name.toLowerCase().includes('card')) {
    const els = document.getElementsByClassName('darkMode');
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (el instanceof DesignSystemProvider) {
        el.baseLayerLuminance = StandardLuminance.DarkMode;
      }
    }
  }
});

export default {
  title: 'Components/Card',
};

export const Card = (): string => CardTemplate;

const example = `
<fluent-card>Card content in default slot</fluent-card>
`;

Card.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
