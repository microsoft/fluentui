import * as React from 'react';
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
 * Converts a union type (`A | B | C`) to an intersection type (`A & B & C`)
 */
export type UnionToIntersection<U> = (U extends unknown ? (x: U) => U : never) extends (x: infer I) => U ? I : never;

/**
 * @internal
 * If type T includes `null`, remove it and add `undefined` instead.
 */
export type ReplaceNullWithUndefined<T> = T extends null ? Exclude<T, null> | undefined : T;

/**
 * This type should be used in place of `React.RefAttributes<T>` in all components that specify `ref` prop.
 *
 * If user is using React 18 types `>=18.2.61`, they will run into type issues of incompatible refs, using this type mitigates this issues across react type versions.
 *
 * @remarks
 *
 * React 18 types introduced Type Expansion Change to the `RefAttributes` interface as patch release.
 * These changes were released in `@types/react@18.2.61` (replacing ref with `LegacyRef`, which leaks `string` into the union type, causing breaking changes between v8/v9 libraries):
 *  - {@link https://github.com/DefinitelyTyped/DefinitelyTyped/pull/68720 | PR }
 *  - {@link https://app.unpkg.com/@types/react@18.2.61/files/index.d.ts | shipped definitions }
 *
 *
 * In React 19 types this was "reverted" back to the original `Ref<T>` type.
 * In order to maintain compatibility with React 17,18,19, we are forced to use our own version of `RefAttributes`.
 *
 */
export interface RefAttributes<T> extends React.Attributes {
  ref?: React.Ref<T> | undefined;
}
