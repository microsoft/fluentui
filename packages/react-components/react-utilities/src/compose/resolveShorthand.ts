import { isShorthandValue, isSlot } from './isSlot';
import type { ReplaceNullWithUndefined, SlotShorthandValue, UnknownSlotProps } from './types';

export type ResolveShorthandOptions<Props, Required extends boolean = false> = {
  required?: Required;
  defaultProps?: Props;
};

export type ResolveShorthandFunction<Props extends UnknownSlotProps = UnknownSlotProps> = {
  <P extends Props | null>(
    value: P | SlotShorthandValue | undefined,
    options?: ResolveShorthandOptions<P, true>,
  ): ReplaceNullWithUndefined<P>;
  <P extends Props | null>(value: P | SlotShorthandValue | undefined, options?: ResolveShorthandOptions<P, boolean>):
    | ReplaceNullWithUndefined<P>
    | undefined;
};

/**
 * Resolves shorthands into slot props, to ensure normalization of the signature
 * being passed down to getSlots method
 * @param shorthand - the base shorthand props
 * @param options - options to resolve shorthand props
 */
export const resolveShorthand: ResolveShorthandFunction = (shorthand, options) => {
  const { required = false, defaultProps } = options || {};
  if (shorthand === null || (shorthand === undefined && !required)) {
    return undefined;
  }
  let resolvedShorthand: UnknownSlotProps = {};
  if (isShorthandValue(shorthand)) {
    resolvedShorthand = { children: shorthand };
  } else if (isSlot(shorthand)) {
    resolvedShorthand = shorthand;
  }
  return defaultProps ? { ...defaultProps, ...resolvedShorthand } : resolvedShorthand;
};
