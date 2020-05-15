import { IStyleSet } from './IStyleSet';

/**
 * Deep partial
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[] ? DeepPartial<U>[] : T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * A style function takes in styleprops and returns a partial styleset.
 * {@docCategory IStyleFunction}
 */
export type IStyleFunction<TStylesProps, TStyleSet extends IStyleSet<TStyleSet>> = (
  props: TStylesProps,
) => DeepPartial<TStyleSet>;

/**
 * Represents either a style function that takes in style props and returns a partial styleset,
 * or a partial styleset object.
 * {@docCategory IStyleFunctionOrObject}
 */
export type IStyleFunctionOrObject<TStylesProps, TStyleSet extends IStyleSet<TStyleSet>> =
  | IStyleFunction<TStylesProps, TStyleSet>
  | DeepPartial<TStyleSet>;
