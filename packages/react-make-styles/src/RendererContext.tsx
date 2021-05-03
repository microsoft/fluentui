import { createDOMRenderer, MakeStylesRenderer } from '@fluentui/make-styles';
import { canUseDOM } from '@fluentui/react-utilities';
import * as React from 'react';

export interface RendererProviderProps {
  renderer: MakeStylesRenderer;
}

export const RendererContext = React.createContext<MakeStylesRenderer>(createDOMRenderer());

export const RendererProvider: React.FC<RendererProviderProps> = ({ children, renderer }) => {
  if (canUseDOM()) {
    React.useMemo(() => {
      renderer.rehydrateCache();
    }, [renderer]);
  }

  return <RendererContext.Provider value={renderer}>{children}</RendererContext.Provider>;
};

export function useRenderer(): MakeStylesRenderer {
  return React.useContext(RendererContext);
}
