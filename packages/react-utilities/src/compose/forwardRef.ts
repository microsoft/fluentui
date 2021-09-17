import * as React from 'react';

/**
 * Re-typed version of `React.forwardRef`, with an API that works with components that use `IntrinsicShorthandProps`
 * from this package, and works around an issue in the official types, where its use of `React.PropsWithoutRef`
 * breaks the union type created by `IntrinsicShorthandProps`.
 *
 * Expects the Props type to already have a `ref` attribute (which is the case if using `IntrinsicShorthandProps`).
 * If not, add the ref attribute using `React.RefAttributes`:
 * ```
 * const Example = forwardRef<ExampleProps & React.RefAttributes<HTMLDivElement>>((props, ref) => { ... });
 * ```
 */
export const forwardRef = React.forwardRef as <Props extends React.RefAttributes<unknown>>(
  component: React.ForwardRefRenderFunction<Props extends React.RefAttributes<infer R> ? R : never, Props>,
) => React.ForwardRefExoticComponent<Props>;
