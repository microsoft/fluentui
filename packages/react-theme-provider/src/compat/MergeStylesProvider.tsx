import * as React from 'react';
import { mergeStylesRenderer } from '@fluentui/react-internal/lib/utilities/ThemeProvider/styleRenderers/mergeStylesRenderer';
import { StyleRenderer } from '@fluentui/react-internal/lib/utilities/ThemeProvider/styleRenderers/types';

export const StyleRendererContext = React.createContext<StyleRenderer>(mergeStylesRenderer);

export const useStyleRenderer = () => React.useContext(StyleRendererContext);

export const MergeStylesProvider = ({ children }: React.PropsWithChildren<{}>) => (
  <StyleRendererContext.Provider value={mergeStylesRenderer}>{children}</StyleRendererContext.Provider>
);
