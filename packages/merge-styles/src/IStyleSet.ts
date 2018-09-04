import { IStyle } from './IStyle';
import { IStyleFunctionOrObject, IStyleFunction } from './IStyleFunction';

export type Diff<T extends keyof any, U extends keyof any> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];

export type Omit<U, K extends keyof U> = Pick<U, Diff<keyof U, K>>;

export type __ReduceToFunction<T> = T extends (...args: any[]) => any ? T : never;

/**
 * Helper function whose role is supposed to express that regardless if T is a style object or style function,
 * it will always map to a style function.
 *
 * Note: the commmented segment is the right expression but it is buggy in 2.8.2. Once Fabric upgrades to Typescript 3,
 *  we should uncomment the commented segmment below as well as uncomment the test in mergeStyleSets.test.ts.
 *
 * See https://github.com/OfficeDev/office-ui-fabric-react/issues/6124.
 */
export type __MapToFunctionType<T> = /*[T] extends [IStyleSet<any>] ? (...args: any[]) => T :*/ __ReduceToFunction<T>;

/**
 * A style set is a dictionary of display areas to IStyle objects.
 * It may optionally contain style functions for sub components in the special `subComponentStyles`
 * property.
 */
export type IStyleSet<TStyleSet extends IStyleSet<TStyleSet>> = {
  [P in keyof Omit<TStyleSet, 'subComponentStyles'>]: IStyle
} & {
  subComponentStyles?: { [P in keyof TStyleSet['subComponentStyles']]: IStyleFunctionOrObject<any, IStyleSet<any>> };
};

/**
 * A concatenated style set differs from `IStyleSet` in that subComponentStyles will always be a style function.
 */
export type IConcatenatedStyleSet<TStyleSet extends IStyleSet<TStyleSet>> = {
  [P in keyof Omit<TStyleSet, 'subComponentStyles'>]: IStyle
} & {
  subComponentStyles?: { [P in keyof TStyleSet['subComponentStyles']]: IStyleFunction<any, IStyleSet<any>> };
};

/**
 * A processed style set is one which the set of styles associated with each area has been converted
 * into a class name. Additionally, all subComponentStyles are style functions.
 */
export type IProcessedStyleSet<TStyleSet extends IStyleSet<TStyleSet>> = {
  [P in keyof Omit<TStyleSet, 'subComponentStyles'>]: string
} & {
  subComponentStyles: {
    [P in keyof TStyleSet['subComponentStyles']]: __MapToFunctionType<TStyleSet['subComponentStyles'][P]>
  };
};
