import * as slot from './slot';
import type { SlotShorthandValue, UnknownSlotProps } from './types';

export type ResolveShorthandOptions<Props, Required extends boolean = false> = Required extends true
  ? { required: true; defaultProps?: Props }
  : { required?: Required; defaultProps?: Props };

export type ResolveShorthandFunction<Props extends UnknownSlotProps = UnknownSlotProps> = {
  <P extends Props>(value: P | SlotShorthandValue | undefined, options: ResolveShorthandOptions<P, true>): P;
  <P extends Props>(value: P | SlotShorthandValue | null | undefined, options?: ResolveShorthandOptions<P, boolean>):
    | P
    | undefined;
};

/**
 * Resolves shorthands into slot props, to ensure normalization of the signature
 * being passed down to getSlots method
 * @param value - the base shorthand props
 * @param options - options to resolve shorthand props
 */
export const resolveShorthand: ResolveShorthandFunction<UnknownSlotProps> = (value, options) =>
  slot.optional<UnknownSlotProps>(value, {
    ...options,
    renderByDefault: options?.required,
    // elementType as undefined is the way to identify between a slot and a resolveShorthand call
    // in the case elementType is undefined assertSlots will fail, ensuring it'll only work with slot method.
    elementType: undefined!,
  });
