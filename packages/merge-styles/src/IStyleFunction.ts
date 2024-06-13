import { IStyleSetBase } from './IStyleSet';
import type { DeepPartialV2 } from './DeepPartial';

/**
 * A style function takes in styleprops and returns a partial styleset.
 * {@docCategory IStyleFunction}
 */
export type IStyleFunction<TStylesProps, TStyleSet extends IStyleSetBase> = (
  props: TStylesProps,
) => DeepPartialV2<TStyleSet>;

/**
 * Represents either a style function that takes in style props and returns a partial styleset,
 * or a partial styleset object.
 * {@docCategory IStyleFunctionOrObject}
 */
export type IStyleFunctionOrObject<TStylesProps, TStyleSet extends IStyleSetBase> =
  | IStyleFunction<TStylesProps, TStyleSet>
  | DeepPartialV2<TStyleSet>;
