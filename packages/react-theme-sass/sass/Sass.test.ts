import { renderSync } from 'node-sass';
import { webLightTheme } from '@fluentui/react-theme';

describe('Sass tokens', () => {
  it('exist for all theme tokens', () => {
    const data = [
      '@import "sass/tokens.scss";',
      ...Object.keys(webLightTheme)
        .filter(t => !t.startsWith('colorPalette')) // FIXME
        .map(tokenName => `$expected__${tokenName}: $${tokenName};`),
    ].join('\n');

    renderSync({ data });
  });
});
