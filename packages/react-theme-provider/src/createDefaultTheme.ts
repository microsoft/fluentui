import { Theme } from './types';

/**
 * Creates a blank initial theme.
 */
export const createDefaultTheme = (): Theme => ({
  stylesheets: [],
  tokens: {
    body: {
      background: 'white',
      contentColor: 'black',
      captionColor: '#333',
      linkColor: 'blue',
      dividerColor: '#eee',
    },
  },
});
