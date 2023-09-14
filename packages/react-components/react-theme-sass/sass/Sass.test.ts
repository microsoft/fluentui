import { compileString } from 'sass';
import { webLightTheme } from '@fluentui/react-theme';

describe('Sass tokens', () => {
  // by referencing all react-theme tokens as SCSS variables, verifies that all the variables are exported
  it('exist for all theme tokens', () => {
    const data = [
      '@import "sass/tokens.scss";',
      ...Object.keys(webLightTheme).map(tokenName => `$expected__${tokenName}: $${tokenName};`),
    ].join('\n');

    compileString(data, { loadPaths: ['.'] });
  });
});
