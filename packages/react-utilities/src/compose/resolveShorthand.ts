import { isValidElement } from 'react';
import { ObjectShorthandProps, ShorthandProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ResolveShorthandOptions<Props extends Record<string, any>, Optional extends boolean = true> {
  optional?: Optional;
  defaultProps?: Props;
}

/**
 * Resolves ShorthandProps into ObjectShorthandProps, to ensure normalization of the signature
 * being passed down to getSlots method
 * @param value - the base ShorthandProps
 * @param defaultProps - base properties to be merged with the end ObjectShorthandProps
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveShorthand<Props extends Record<string, any>, Optional extends boolean = true>(
  value: ShorthandProps<Props>,
  options?: ResolveShorthandOptions<Props, Optional>,
): Optional extends true ? ObjectShorthandProps<Props> | undefined : ObjectShorthandProps<Props> {
  const { optional = true, defaultProps } = options || {};
  if (value === null || (value === undefined && optional)) {
    return undefined as Optional extends true ? ObjectShorthandProps<Props> | undefined : never;
  }

  const resolvedShorthand = {} as ObjectShorthandProps<Props>;

  if (typeof value === 'string' || typeof value === 'number' || isValidElement(value)) {
    resolvedShorthand.children = value as Props['children'];
  } else if (typeof value === 'object') {
    Object.assign(resolvedShorthand, value);
  }

  return (defaultProps ? { ...defaultProps, ...resolvedShorthand } : resolvedShorthand) as Optional extends true
    ? never
    : ObjectShorthandProps<Props>;
}
