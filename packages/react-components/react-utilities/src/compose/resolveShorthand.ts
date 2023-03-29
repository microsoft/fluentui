import { isValidElement } from 'react';
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
export const resolveShorthand: ResolveShorthandFunction = (value, options) => {
  const { required = false, defaultProps } = options || {};
  if (value === null || (value === undefined && !required)) {
    return undefined;
  }

  let resolvedShorthand = {} as UnknownSlotProps;

  if (typeof value === 'string' || typeof value === 'number' || Array.isArray(value) || isValidElement(value)) {
    resolvedShorthand.children = value;
  } else if (typeof value === 'object') {
    resolvedShorthand = { ...value };
  }

  return defaultProps ? { ...defaultProps, ...resolvedShorthand } : resolvedShorthand;
};
