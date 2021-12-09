import { expandProperty } from 'inline-style-expand-shorthand';
import { MakeStylesStyle } from '../types';

/**
 * A function that expands longhand properties ("margin", "padding") to their shorthand versions ("margin-left", etc.).
 * Follows CSS-like order in expansion i.e. last defined property wins.
 */
export function expandShorthand(style: MakeStylesStyle, result: MakeStylesStyle = {}): MakeStylesStyle {
  // eslint-disable-next-line guard-for-in
  for (const property in style) {
    const value = style[property as keyof MakeStylesStyle];

    if (typeof value === 'string' || typeof value === 'number') {
      const expansion = expandProperty(property, value);

      if (expansion) {
        Object.assign(result, expansion);
      } else {
        // Cast to any to avoid "error TS2590: Expression produces a union type that is too complex to represent"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result as any)[property as keyof MakeStylesStyle] = value;
        // result[property as keyof MakeStylesStyle] = value;
      }
      // eslint-disable-next-line eqeqeq
    } else if (value == null) {
      // should skip
    } else if (Array.isArray(value)) {
      result[property as 'animationName'] = value;
    } else if (typeof value === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (result as any)[property as keyof MakeStylesStyle] = expandShorthand(value as MakeStylesStyle);
    }
  }

  return result;
}
