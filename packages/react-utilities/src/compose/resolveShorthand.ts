import { isValidElement } from 'react';
import type { DefaultObjectShorthandProps, ShorthandProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ResolveShorthandOptions<Props extends Record<string, any>, Required extends boolean = false> {
  required?: Required;
  defaultProps?: Props;
}

/**
 * Resolves ShorthandProps into ObjectShorthandProps, to ensure normalization of the signature
 * being passed down to getSlots method
 * @param value - the base ShorthandProps
 * @param options - options to resolve ShorthandProps
 */
export function resolveShorthand<Props extends DefaultObjectShorthandProps, Required extends boolean = false>(
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
