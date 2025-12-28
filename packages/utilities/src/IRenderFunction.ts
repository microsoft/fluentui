import type { JSXElement } from './jsx';

/**
 * Render function interface for providing overrideable render callbacks.
 *
 * @public
 */
export type IRenderFunction<P> = (props?: P, defaultRender?: (props?: P) => JSXElement | null) => JSXElement | null;
