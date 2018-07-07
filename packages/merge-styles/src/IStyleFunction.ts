import { IStyleSet } from './IStyleSet';

/**
 * A style function takes in styleprops and returns a partial style set.
 */
export type IStyleFunction<TStylesProps, TStyleSet extends IStyleSet<TStyleSet>> = (
  props: TStylesProps
) => Partial<TStyleSet>;

export type IStyleFunctionOrObject<TStylesProps, TStyleSet extends IStyleSet<TStyleSet>> =
  | IStyleFunction<TStylesProps, TStyleSet>
  | Partial<TStyleSet>;
