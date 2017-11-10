/**
 * Render function interface for providing overrideable render callbacks.
 *
 * @public
 */
export interface IRenderFunction<P> {
  (props?: P, defaultRender?: (props?: P) => JSX.Element | null): JSX.Element | null;
}

/**
 * Component "as" interface, allowing components and primitives to be replaced.
 */
export type IComponentAs<TProps> = string | ((props?: TProps) => JSX.Element);