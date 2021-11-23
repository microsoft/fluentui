/**
 * Render function interface for providing overrideable render callbacks, where the props are optional.
 *
 * @public
 */
export interface IRenderFunction<P> {
  (props?: P, defaultRender?: (props?: P) => JSX.Element | null): JSX.Element | null;
}
