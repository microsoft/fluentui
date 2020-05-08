import { ThemePrepared } from './types';

/**
 * Creates a blank initial theme.
 */
export const createDefaultTheme = (): ThemePrepared => ({
  stylesheets: [],
  tokens: {
    body: {
      fill: 'white',
      text: 'black',
      subText: '#333',
      link: {
        default: 'blue',
      },
      divider: '#eee',
    },
  },
});
