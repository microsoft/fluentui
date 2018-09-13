/**
 * Render function interface for providing overrideable render callbacks.
 *
 * @public
 */
// export type IComponentAs<P> = string | ((props?: P) => JSX.Element);
export type IComponentAs<T> =
  | React.StatelessComponent<T & { defaultRender?: React.StatelessComponent<T> }>
  | React.ComponentClass<T & { defaultRender?: React.ComponentClass<T> }>;
