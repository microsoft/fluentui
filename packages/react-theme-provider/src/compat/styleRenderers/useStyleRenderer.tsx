import * as React from 'react';
import { StyleRenderer } from './types';
import { mergeStylesRenderer } from './mergeStylesRenderer';

export const StyleRendererContext = React.createContext<StyleRenderer>(mergeStylesRenderer);

export const useStyleRenderer = () => React.useContext(StyleRendererContext);
