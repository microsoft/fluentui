import { IStyleSet } from './IStyleSet';
import { DeepPartial } from './DeepPartial';

/**
 * A style function takes in styleprops and returns a partial styleset.
 * {@docCategory IStyleFunction}
 */
export type IStyleFunction<TStylesProps, TStyleSet extends IStyleSet<TStyleSet>> = (
  props: TStylesProps,
  __stylesheetKey__?: string,
) => DeepPartial<TStyleSet>;

/**
 * Represents either a style function that takes in style props and returns a partial styleset,
 * or a partial styleset object.
 * {@docCategory IStyleFunctionOrObject}
 */
export type IStyleFunctionOrObject<TStylesProps, TStyleSet extends IStyleSet<TStyleSet>> =
  | IStyleFunction<TStylesProps, TStyleSet>
  | DeepPartial<TStyleSet>;
