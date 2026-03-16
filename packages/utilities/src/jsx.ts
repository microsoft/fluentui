import * as React from 'react';

/**
 * Our own alias for `JSXElement` type that is compatible with both React 17 and React 18+.
 * Use this type when annotating JSX markup in all our code in order to avoid issues between different React versions.
 *
 * Example usage:
 *
 * BAD:
 * ```tsx
 * const renderFoo = (state: FooState) = <div {...props}>Hello World</div>;
 * // infers
 * // R17:  declare const renderFoo: (state: FooState) => JSXElement;
 * // R18+: declare const renderFoo: (state: FooState) => React.JSXElement;
 * ```
 *
 * GOOD:
 * ```tsx
 * import type { JSXElement } from '@fluentui/utilities';
 * const renderFoo = (state: FooState): JSXElement = <div {...props}>Hello World</div>;
 * ```
 */
export type JSXElement = React.ReactElement<
  /* eslint-disable @typescript-eslint/no-explicit-any */
  any,
  any
  /* eslint-enable @typescript-eslint/no-explicit-any */
>;

/**
 * Alias for `JSX.IntrinsicElements` keys that is compatible with both React 17 and React 18+.
 * Use this type to get the intrinsic element keys from React types in order to avoid issues
 * between different React versions.
 */
export type JSXIntrinsicElementKeys = Exclude<React.ElementType, React.ComponentType>;

/**
 * Our own alias for `JSX.IntrinsicElements` type that is compatible with both React 17 and React 18+.
 * Use this type to get the intrinsic elements from React types in order to avoid issues
 * between different React versions.
 */
export type JSXIntrinsicElement<Element extends JSXIntrinsicElementKeys> = React.ComponentProps<Element>;
