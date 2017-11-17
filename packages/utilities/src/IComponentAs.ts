/**
 * Component "as" interface, allowing components and primitives to be replaced.
 */
export type IComponentAs<TProps> = string | ((props?: TProps) => JSX.Element);