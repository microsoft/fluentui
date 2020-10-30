import * as React from 'react';
import { StyleRenderer } from './types';

export const StyleRendererContext = React.createContext<StyleRenderer>({
  reset: () => undefined,
  getId: () => -1,
  renderStyles: rules => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {} as any;
  },
  renderFontFace: () => undefined,
  renderKeyframes: () => '',
});

export const useStyleRenderer = () => React.useContext(StyleRendererContext);
