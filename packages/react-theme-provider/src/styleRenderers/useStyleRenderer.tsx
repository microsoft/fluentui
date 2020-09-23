import * as React from 'react';
import { StyleRenderer } from './types';
import { warn } from '@uifabric/utilities';

let hasWarned = false;

export const StyleRendererContext = React.createContext<StyleRenderer>({
  reset: () => undefined,
  getId: () => -1,
  renderStyles: rules => {
    if (!hasWarned) {
      hasWarned = true;
      warn('ThemeProvider was missing. Make sure to wrap your ' + 'React content in a ThemeProvider component.');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {} as any;
  },
  renderFontFace: () => undefined,
  renderKeyframes: () => '',
});

export const useStyleRenderer = () => React.useContext(StyleRendererContext);
