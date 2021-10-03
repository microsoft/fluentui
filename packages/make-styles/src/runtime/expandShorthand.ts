import { expandProperty } from 'inline-style-expand-shorthand';
import { MakeStyles } from '../types';

/**
 * A function that expands longhand properties ("margin", "padding") to their shorthand versions ("margin-left", etc.).
 * Follows CSS-like order in expansion i.e. last defined property wins.
 */
export function expandShorthand(style: MakeStyles, result: MakeStyles = {}): MakeStyles {
  // eslint-disable-next-line guard-for-in
  for (const property in style) {
    const value = style[property];

    if (typeof value === 'string' || typeof value === 'number') {
      const expansion = expandProperty(property, value);

      if (expansion) {
        Object.assign(result, expansion);
      } else {
        result[property] = value;
      }
      // eslint-disable-next-line eqeqeq
    } else if (value == null) {
      // should skip
    } else if (Array.isArray(value)) {
      result[property] = value;
    } else if (typeof value === 'object') {
      result[property] = expandShorthand(value);
    }
  }

  return result;
}
