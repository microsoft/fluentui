import { isValidElement } from 'react';
import type { UnknownSlotProps, ShorthandProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResolveShorthandOptions<Props extends Record<string, any>, Required extends boolean = false> = {
  required?: Required;
  defaultProps?: Props;
};

/**
 * Resolves shorthands into slot props, to ensure normalization of the signature
 * being passed down to getSlots method
 * @param value - the base shorthand props
 * @param options - options to resolve shorthand props
 */
export function resolveShorthand<Props extends UnknownSlotProps, Required extends boolean = false>(
  value: ShorthandProps<Props>,
  options?: ResolveShorthandOptions<Props, Required>,
): Required extends false ? Props | undefined : Props {
  const { required = false, defaultProps } = options || {};
  if (value === null || (value === undefined && !required)) {
    return undefined as Required extends false ? Props | undefined : never;
  }

  let resolvedShorthand = {} as Props;

  if (typeof value === 'string' || typeof value === 'number' || Array.isArray(value) || isValidElement(value)) {
    resolvedShorthand.children = value as Props['children'];
  } else if (typeof value === 'object') {
    resolvedShorthand = value;
  }

  return (defaultProps ? { ...defaultProps, ...resolvedShorthand } : resolvedShorthand) as Required extends false
    ? never
    : Props;
}
