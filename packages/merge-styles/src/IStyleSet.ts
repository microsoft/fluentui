import { IStyle } from './IStyle';
import { IStyleFunctionOrObject, IStyleFunction } from './IStyleFunction';
import type { ShadowConfig } from './shadowConfig';

/**
 * @deprecated Use `Exclude` provided by TypeScript instead.
 */
export type Diff<T extends keyof any, U extends keyof any> = ({ [P in T]: P } & { [P in U]: never } & {
  [x: string]: never;
})[T];

/**
 * @deprecated Use the version provided by TypeScript instead.
 */
// eslint-disable-next-line deprecation/deprecation, @typescript-eslint/naming-convention
type _Omit<U, K extends keyof U> = Pick<U, Diff<keyof U, K>>;
// eslint-disable-next-line deprecation/deprecation
export type { _Omit as Omit };

/**
 * Helper function whose role is supposed to express that regardless if T is a style object or style function,
 * it will always map to a style function.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type __MapToFunctionType<T> = Extract<T, Function> extends never
  ? (...args: any[]) => Partial<T>
  : Extract<T, Function>;

/**
 * Used for 'extends IStyleSetBase' type constraints when an IStyleSet type argument is needed.
 */
export interface IStyleSetBase {
  [key: string]: any;
  subComponentStyles?: any;
}

/**
 * A style set is a dictionary of display areas to IStyle objects.
 * It may optionally contain style functions for sub components in the special `subComponentStyles`
 * property.
 */
export type IStyleSet<TStyleSet extends IStyleSetBase = { [key: string]: any }> = {
  // eslint-disable-next-line deprecation/deprecation
  [P in keyof _Omit<TStyleSet, 'subComponentStyles'>]: IStyle;
} & {
  subComponentStyles?: { [P in keyof TStyleSet['subComponentStyles']]: IStyleFunctionOrObject<any, any> };
} & IShadowConfig;

/**
 * A concatenated style set differs from `IStyleSet` in that subComponentStyles will always be a style function.
 */
export type IConcatenatedStyleSet<TStyleSet extends IStyleSetBase> = {
  // eslint-disable-next-line deprecation/deprecation
  [P in keyof _Omit<TStyleSet, 'subComponentStyles'>]: IStyle;
} & {
  subComponentStyles?: { [P in keyof TStyleSet['subComponentStyles']]: IStyleFunction<any, any> };
} & IShadowConfig;

/**
 * A processed style set is one which the set of styles associated with each area has been converted
 * into a class name. Additionally, all subComponentStyles are style functions.
 */
export type IProcessedStyleSet<TStyleSet extends IStyleSetBase> = {
  // eslint-disable-next-line deprecation/deprecation
  [P in keyof _Omit<TStyleSet, 'subComponentStyles'>]: string;
} & {
  subComponentStyles: {
    [P in keyof TStyleSet['subComponentStyles']]: __MapToFunctionType<
      TStyleSet['subComponentStyles'] extends infer J ? (P extends keyof J ? J[P] : never) : never
    >;
  };
} & IShadowConfig;

type IShadowConfig = {
  __shadowConfig__?: ShadowConfig;
};
