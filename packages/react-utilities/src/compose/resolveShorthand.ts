import { isValidElement } from 'react';
import { ObjectShorthandProps, ShorthandProps } from './types';

/**
 * Resolves ShorthandProps into ObjectShorthandProps, to ensure normalization of the signature
 * being passed down to getSlots method
 * @param value - the base ShorthandProps
 * @param defaultProps - base properties to be merged with the end ObjectShorthandProps
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveShorthand<Props extends Record<string, any>>(
  value: ShorthandProps<Props>,
  defaultProps?: Props,
): ObjectShorthandProps<Props> {
  if (value === null) {
    return {} as ObjectShorthandProps<Props>;
  }
  let resolvedShorthand: ObjectShorthandProps<Props> = {} as Props;

  if (typeof value === 'string' || typeof value === 'number' || isValidElement(value)) {
    resolvedShorthand = { children: value } as ObjectShorthandProps<Props>;
  } else if (isObjectShorthandProps(value)) {
    resolvedShorthand = value;
  }
  return defaultProps ? { ...defaultProps, ...resolvedShorthand } : resolvedShorthand;
}

function isObjectShorthandProps<Props>(value: ShorthandProps<Props>): value is ObjectShorthandProps<Props> {
  return typeof value === 'object';
}
