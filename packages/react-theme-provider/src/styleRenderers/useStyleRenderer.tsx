import * as React from 'react';
import { StyleRenderer } from './types';

export const StyleRendererContext = React.createContext<StyleRenderer>({
  reset: () => undefined,
  getId: () => -1,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderStyles: rules => ({} as any),
  renderFontFace: () => undefined,
  renderKeyframes: () => '',
});

export const useStyleRenderer = () => React.useContext(StyleRendererContext);
