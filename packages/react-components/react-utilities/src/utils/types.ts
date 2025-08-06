import * as React from 'react';
import type { JSXIntrinsicElementKeysCompat, JSXIntrinsicElementKeysLatest } from './generated-types';

/**
 * Helper type that works similar to Omit,
 * but when modifying an union type it will distribute the omission to all the union members.
 *
 * See [distributive conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types) for more information
 */
// Traditional Omit is basically equivalent to => Pick<T, Exclude<keyof T, K>>
//
// let's say we have Omit<{ a: string } | { b: string }, 'a'>
// equivalent to: Pick<{ a: string } | { b: string }, Exclude<keyof ({ a: string } | { b: string }), 'a'>>
// The expected result would be {} | { b: string }, the omission of 'a' from all the union members,
// but keyof ({ a: string } | { b: string }) is never as they don't share common keys
// so  Exclude<never, 'a'> is never,
// and Pick<{ a: string } | { b: string }, never> is {}.
//
// With DistributiveOmit on the other hand it becomes like this:
// DistributiveOmit<{ a: string } | { b: string }, 'a'>
// equivalent to: Omit<{ a: string }, 'a'> | Omit<{ b: string }, 'a'>
// Since every single Omit clause in this case is being applied to a single union member there's no conflicts on keyof evaluation and in the second clause Omit<{ b: string }, 'a'> becomes { b: string },
// so the result is {} | { b: string }, as expected.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributiveOmit<T, K extends keyof any> = T extends unknown ? Omit<T, K> : T;

/**
 * @public
 *
 * Helper type that works similar to Pick,
 * but when modifying an union type it will distribute the picking to all the union members.
 *
 * See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types} for more information
 */
export type DistributivePick<T, K> = T extends unknown ? Pick<T, K & keyof T> : never;

/**
 * Converts a union type (`A | B | C`) to an intersection type (`A & B & C`)
 */
export type UnionToIntersection<U> = (U extends unknown ? (x: U) => U : never) extends (x: infer I) => U ? I : never;

/**
 * @internal
 * If type T includes `null`, remove it and add `undefined` instead.
 */
export type ReplaceNullWithUndefined<T> = T extends null ? Exclude<T, null> | undefined : T;

/**
 * @internal
 * With react 18, our `children` type starts leaking everywhere and that causes conflicts on component declaration, specially in the `propTypes` property of
 * both `ComponentClass` and `FunctionComponent`.
 *
 * This type substitutes `React.ComponentType` only keeping the function signature, it omits `propTypes`, `displayName` and other properties that are not
 * required for the inference.
 */
export type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;

/**
 * @internal
 *
 * On types/react 18 there are two types being delivered,
 * they rely on the typescript version to decide which will be consumed {@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/b59dc3ac1e2770fbd6cdbb90ba52abe04c168196/types/react/package.json#L10}
 *
 * If TS is higher than 5.0 then the `FunctionComponent` will be returning ReactNode (which we don't support)
 * If TS is below or equal to 5.0 then the `FunctionComponent` will be returning ReactElement | null (which we support)
 *
 * Since it's not possible to have a single type that works for both cases
 * (as ReactNode is more specific, and this will break while evaluating functions),
 * we need to create our own `FunctionComponent` type
 * that will work for both cases.
 *
 * **THIS TYPE IS INTERNAL AND SHOULD NEVER BE EXPOSED**
 */
export interface FunctionComponent<P> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: P): any;
  displayName?: string;
}

export type FC<P> = FunctionComponent<P>;

export interface ExoticComponent<P> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: P): any;
  $$typeof: symbol;
}

export interface NamedExoticComponent<P> extends ExoticComponent<P> {
  displayName?: string;
}

/**
 * @internal
 * **THIS TYPE IS INTERNAL AND SHOULD NEVER BE EXPOSED**
 */
export interface ComponentClass<P = {}, S = React.ComponentState> extends React.StaticLifecycle<P, S> {
  new (props: P): React.Component<P, S>;
}

/**
 * @internal
 *
 * on types/react 18 ReactNode becomes a more strict type, which is not compatible with our current implementation. to avoid any issues we are creating our own ReactNode type which allows anything.
 *
 * This type should only be used for inference purposes, and should never be exposed.
 *
 * **THIS TYPE IS INTERNAL AND SHOULD NEVER BE EXPOSED**
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReactNode = any;

/**
 * Removes the 'ref' prop from the given Props type, leaving unions intact (such as the discriminated union created by
 * IntrinsicSlotProps). This allows IntrinsicSlotProps to be used with React.forwardRef.
 */
export type PropsWithoutRef<P> = 'ref' extends keyof P ? DistributiveOmit<P, 'ref'> : P;

/**
 * Removes the 'children' prop from the given Props type, leaving unions intact (such as the discriminated union created by
 * IntrinsicSlotProps). This allows IntrinsicSlotProps to be used with React.forwardRef.
 */
export type PropsWithoutChildren<P> = 'children' extends keyof P ? DistributiveOmit<P, 'children'> : P;

/**
 * @internal
 *
 * This type is used to determine if the current version of React is 18+ or not.
 *
 * It checks if the `React.ReactNode` has `{}` it its type.
 * If it is, then it means that the current version of React is lower than 18.
 * If it is not, then it means that the current version of React is 18 or higher.
 * This is useful for ensuring compatibility with different versions of React.
 *
 * **THIS TYPE IS INTERNAL AND SHOULD NEVER BE EXPOSED**
 */
export type ReactVersionDependent<Modern, Legacy> = {} extends React.ReactNode ? Legacy : Modern;

/**
 * Our own alias for `JSX.Element` type that is compatible with both React 17 and React 18+.
 * Use this type when annotating JSX markup in all our code in order to avoid issues between different React versions.
 *
 * Example usage:
 *
 * BAD:
 * ```tsx
 * const renderFoo = (state: FooState) = <div {...props}>Hello World</div>;
 * // infers
 * // R17:  declare const renderFoo: (state: FooState) => JSX.Element;
 * // R18+: declare const renderFoo: (state: FooState) => React.JSX.Element;
 * ```
 *
 * GOOD:
 * ```tsx
 * import type { JSXElement } from '@fluentui/react-utilities';
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
 * Union of all intrinsic element keys in React.
 * Based on the React version, it will either be the latest set of intrinsic elements or the legacy set.
 */
export type JSXIntrinsicElementKeys = ReactVersionDependent<
  JSXIntrinsicElementKeysLatest,
  JSXIntrinsicElementKeysCompat
>;

/**
 * Our own alias for `JSX.IntrinsicElements` type that is compatible with both React 17 and React 18+.
 * Use this type to get the intrinsic elements from React types in order to avoid issues between different React versions.
 */
export type JSXIntrinsicElement<Element extends JSXIntrinsicElementKeys> = React.ComponentProps<Element>;
