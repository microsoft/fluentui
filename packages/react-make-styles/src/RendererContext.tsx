import { createDOMRenderer, MakeStylesRenderer } from '@fluentui/make-styles';
import * as React from 'react';

export interface RendererProviderProps {
  /** An instance of makeStyles() renderer. */
  renderer: MakeStylesRenderer;
}

/**
 * @private
 */
export const RendererContext = React.createContext<MakeStylesRenderer>(createDOMRenderer());

/**
 * @public
 */
export const RendererProvider: React.FC<RendererProviderProps> = ({ children, renderer }) => {
  return <RendererContext.Provider value={renderer}>{children}</RendererContext.Provider>;
};

/**
 * Returns an instance of current makeStyles() renderer.
 *
 * @private
 */
export function useRenderer(): MakeStylesRenderer {
  return React.useContext(RendererContext);
}
