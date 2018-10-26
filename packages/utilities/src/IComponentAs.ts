/**
 * Properties used by render function interface for providing overrideable render callbacks.
 *
 * @public
 */
export type IComponentAsProps<T> = T & { defaultRender?: React.ComponentType<T> };

/**
 * Render function interface for providing overrideable render callbacks.
 *
 * @public
 */
// export type IComponentAs<P> = string | ((props?: P) => JSX.Element);
export type IComponentAs<T> = React.ComponentType<IComponentAsProps<T>>;