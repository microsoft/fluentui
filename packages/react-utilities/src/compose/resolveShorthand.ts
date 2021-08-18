import { isValidElement } from 'react';
import { ObjectShorthandProps, ShorthandProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ResolveShorthandOptions<Props extends Record<string, any>, Required extends boolean = false> {
  required?: Required;
  defaultProps?: Props;
}

/**
 * Resolves ShorthandProps into ObjectShorthandProps, to ensure normalization of the signature
 * being passed down to getSlots method
 * @param value - the base ShorthandProps
 * @param defaultProps - base properties to be merged with the end ObjectShorthandProps
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveShorthand<Props extends Record<string, any>, Required extends boolean = false>(
  value: ShorthandProps<Props>,
  options?: ResolveShorthandOptions<Props, Required>,
): Required extends false ? ObjectShorthandProps<Props> | undefined : ObjectShorthandProps<Props> {
  const { required = false, defaultProps } = options || {};
  if (value === null || (value === undefined && required)) {
    return undefined as Required extends false ? ObjectShorthandProps<Props> | undefined : never;
  }

  let resolvedShorthand = {} as ObjectShorthandProps<Props>;

  if (typeof value === 'string' || typeof value === 'number' || Array.isArray(value) || isValidElement(value)) {
    resolvedShorthand.children = value as Props['children'];
  } else if (typeof value === 'object') {
    resolvedShorthand = value;
  }

  return (defaultProps ? { ...defaultProps, ...resolvedShorthand } : resolvedShorthand) as Required extends false
    ? never
    : ObjectShorthandProps<Props>;
}
