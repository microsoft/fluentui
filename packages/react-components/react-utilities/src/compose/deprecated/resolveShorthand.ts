import * as slot from '../slot';
import type { SlotShorthandValue, UnknownSlotProps } from '../types';

/**
 * @deprecated - use slot.always or slot.optional combined with assertSlots instead
 */
export type ResolveShorthandOptions<Props, Required extends boolean = false> = Required extends true
  ? { required: true; defaultProps?: Props }
  : { required?: Required; defaultProps?: Props };

/**
 * @deprecated use slot.always or slot.optional combined with assertSlots instead
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
 *
 * Resolves shorthands into slot props, to ensure normalization of the signature
 * being passed down to getSlots method
 * @param value - the base shorthand props
 * @param options - options to resolve shorthand props
 *
 * @deprecated use slot.always or slot.optional combined with assertSlots instead
 */
// eslint-disable-next-line deprecation/deprecation
export const resolveShorthand: ResolveShorthandFunction<UnknownSlotProps> = (value, options) =>
  slot.optional<UnknownSlotProps>(value, {
    ...options,
    renderByDefault: options?.required,
    // elementType as undefined is the way to identify between a slot and a resolveShorthand call
    // in the case elementType is undefined assertSlots will fail, ensuring it'll only work with slot method.
    elementType: undefined!,
  });
