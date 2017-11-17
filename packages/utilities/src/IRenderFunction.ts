/**
 * Render function interface for providing overrideable render callbacks.
 *
 * @public
 */
export interface IRenderFunction<P> {
  (props?: P, defaultRender?: (props?: P) => JSX.Element | null): JSX.Element | null;
}
