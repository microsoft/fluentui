import * as React from 'react';
import { StyleRenderer } from './types';

export const StyleRendererContext = React.createContext<StyleRenderer>({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderStyles: rules => rules as any,
  renderFontFace: () => undefined,
  renderKeyframes: () => undefined,
});

export const useStyleRenderer = () => React.useContext(StyleRendererContext);
