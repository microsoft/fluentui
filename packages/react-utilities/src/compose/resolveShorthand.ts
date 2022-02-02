import { isValidElement } from 'react';
import type { UnknownSlotProps, SlotShorthandValue } from './types';

export type ResolveShorthandOptions<Props, Required extends boolean> = {
  defaultProps?: Props;
} & (Required extends true ? { required: true } : { required?: Required });

export type ResolveShorthandFunction<Props extends UnknownSlotProps = UnknownSlotProps> = {
  <P extends Props | null>(value: P | SlotShorthandValue | undefined, options?: ResolveShorthandOptions<P, true>): P;
  <P extends Props | null>(value: P | SlotShorthandValue | undefined, options?: ResolveShorthandOptions<P, boolean>):
    | P
    | undefined;
};

/**
 * Resolves a slot's SlotShorthandValue into a props object.
 *
 * @param value - The slot's SlotShorthandValue or props object
 * @param options - See {@link ResolveShorthandOptions}
 */
export const resolveShorthand: ResolveShorthandFunction = (value, options) => {
  const { required = false, defaultProps } = options || {};
  if (value === null) {
    return null;
  }
  if (value === undefined && !required) {
    return undefined;
  }

  let resolvedShorthand = {} as UnknownSlotProps;

  if (typeof value === 'string' || typeof value === 'number' || Array.isArray(value) || isValidElement(value)) {
    resolvedShorthand.children = value as UnknownSlotProps['children'];
  } else if (typeof value === 'object') {
    resolvedShorthand = value;
  }

  return defaultProps ? { ...defaultProps, ...resolvedShorthand } : resolvedShorthand;
};
