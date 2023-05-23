import { slotFromShorthand } from './slot';
import type { SlotComponent, SlotShorthandValue, UnknownSlotProps } from './types';

/**
 * @deprecated
 * ResolveShorthandOptions is deprecated, infer it's type from `resolveShorthand` instead
 */
export type ResolveShorthandOptions<Props, Required extends boolean = false> = Required extends true
  ? { required: true; defaultProps?: Props }
  : { required?: Required; defaultProps?: Props };

/**
 * @deprecated
 * ResolveShorthandFunction is deprecated, infer it's type from `resolveShorthand` instead
 */
export type ResolveShorthandFunction<Props extends UnknownSlotProps = UnknownSlotProps> = {
  <P extends Props>(
    value: P | SlotShorthandValue | SlotComponent<Props> | undefined,
    // eslint-disable-next-line deprecation/deprecation
    options: ResolveShorthandOptions<P, true>,
  ): SlotComponent<P>;
  <P extends Props>(
    value: P | SlotShorthandValue | SlotComponent<Props> | null | undefined,
    // eslint-disable-next-line deprecation/deprecation
    options?: ResolveShorthandOptions<P, boolean>,
  ): SlotComponent<P> | undefined;
};

/**
 * Resolves shorthands into slot props, to ensure normalization of the signature
 * being passed down to getSlots method
 * @param value - the base shorthand props
 * @param options - options to resolve shorthand props
 */
export const resolveShorthand = slotFromShorthand;
