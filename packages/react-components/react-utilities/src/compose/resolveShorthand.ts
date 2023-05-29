import { slot } from './slot';
import type { SlotShorthandValue, UnknownSlotProps } from './types';

/**
 * @deprecated use the slot method instead
 */
export type ResolveShorthandOptions<Props, Required extends boolean = false> = Required extends true
  ? { required: true; defaultProps?: Props }
  : { required?: Required; defaultProps?: Props };

/**
 * @deprecated use the slot method instead
 */
export type ResolveShorthandFunction<Props extends UnknownSlotProps = UnknownSlotProps> = {
  // eslint-disable-next-line deprecation/deprecation
  <P extends Props>(value: P | SlotShorthandValue | undefined, options: ResolveShorthandOptions<P, true>): P;
  // eslint-disable-next-line deprecation/deprecation
  <P extends Props>(value: P | SlotShorthandValue | null | undefined, options?: ResolveShorthandOptions<P, boolean>):
    | P
    | undefined;
};

/**
 * @deprecated use the slot method instead
 *
 * Resolves shorthands into slot props, to ensure normalization of the signature
 * being passed down to getSlots method
 * @param value - the base shorthand props
 * @param options - options to resolve shorthand props
 */
// eslint-disable-next-line deprecation/deprecation
export const resolveShorthand = slot as ResolveShorthandFunction;
