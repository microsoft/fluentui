import * as React from 'react';

/**
 * Wrapper for `React.forwardRef`, with an API that works with components that use `IntrinsicShorthandProps`
 * from this package. It can also be used as a cleaner API for defining any component that forwards refs.
 *
 * Expects the Props type to already have a `ref` attribute (which is the case if using `IntrinsicShorthandProps`).
 * If not, add the ref attribute using `React.RefAttributes`:
 * ```
 * const Example = forwardRef<ExampleProps & React.RefAttributes<HTMLElement>>((props, ref) => { ... });
 * ```
 *
 * @returns the same as `React.forwardRef`, re-typed to `React.FunctionCompoonent<Props>`.
 * This prevents union props types from getting broken by the use of `React.PropsWithoutRef`,
 * which is unnecessary in this case, since Props already contains `ref`.
 */
export function forwardRef<Props extends React.RefAttributes<unknown>>(
  component: React.ForwardRefRenderFunction<Props extends React.RefAttributes<infer R> ? R : never, Props>,
) {
  return (React.forwardRef(component) as unknown) as React.FunctionComponent<Props>;
}
