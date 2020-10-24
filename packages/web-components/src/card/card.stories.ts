import { createColorPalette } from '@microsoft/fast-components-styles-msft';
import { ColorRGBA64 } from '@microsoft/fast-colors';
import { FluentDesignSystemProvider } from '../design-system-provider';
import CardTemplate from './fixtures/card.html';
import { FluentCard } from './';

// Prevent tree-shaking
FluentCard;
FluentDesignSystemProvider;

export default {
  title: 'Card',
};

export const Card = (): string => CardTemplate;

document.addEventListener('readystatechange', e => {
  if (document.readyState === 'complete') {
    const red = document.getElementById('red') as FluentDesignSystemProvider;
    red.neutralPalette = createColorPalette(new ColorRGBA64(1, 0, 0));
  }
});
