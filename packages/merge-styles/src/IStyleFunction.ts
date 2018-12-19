import { IStyleSet } from './IStyleSet';

/**
 * A style function takes in styleprops and returns a partial styleset.
 */
export type IStyleFunction<TStylesProps, TStyleSet extends IStyleSet<TStyleSet>> = (props: TStylesProps) => Partial<TStyleSet>;

/**
 * Represents either a style function that takes in style props and returns a partial styleset,
 * or a partial styleset object.
 */
export type IStyleFunctionOrObject<TStylesProps, TStyleSet extends IStyleSet<TStyleSet>> =
  | IStyleFunction<TStylesProps, TStyleSet>
  | Partial<TStyleSet>;
