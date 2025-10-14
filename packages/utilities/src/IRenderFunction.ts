import type { JSXElement } from './jsx';
/**
 * Render function interface for providing overrideable render callbacks.
 *
 * @public
 */
export interface IRenderFunction<P> {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  (props?: P, defaultRender?: (props?: P) => JSXElement | null): JSXElement | null;
}
