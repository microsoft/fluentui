import type { GriffelResetStyle, GriffelStyle } from '@griffel/core';
import type { UserAuthoredStyles as StyleXStyle } from '@stylexjs/stylex/lib/StyleXTypes';

// Modifiable version of StyleXStyle
type StyleXStyleBuilder = {
  -readonly [P in keyof StyleXStyle]: StyleXStyle[P];
};

type ComplexValueType = {
  default?: string | number;
  [pseudoClass: `:${string}`]: string | number;
  [atRule: `@${string}`]: string | number;
};

function isComplexValueKey(key: string): key is keyof ComplexValueType {
  return key.startsWith(':') || key.startsWith('@') || key === 'default';
}

function isComplexValue(value: StyleXStyle[keyof StyleXStyle]): value is ComplexValueType {
  return typeof value === 'object' && value !== null;
}

function mergeSelectorValues(
  selector: keyof ComplexValueType,
  style: GriffelStyle | GriffelResetStyle,
  result: StyleXStyleBuilder,
) {
  for (const key in style) {
    if (!Object.prototype.hasOwnProperty.call(style, key)) {
      continue;
    }

    const value = style[key as keyof GriffelStyle];
    if (typeof value === 'string' || typeof value === 'number') {
      const property = key as keyof GriffelStyle & keyof StyleXStyle;

      // If there's already a value with another selector, add this to it
      const existingValue = result[property];
      if (isComplexValue(existingValue)) {
        existingValue[selector] = value;
      } else {
        result[property] = { default: existingValue || null, [selector]: value };
      }
    } else {
      throw new Error(`Unsupported nested selector: '${selector}' '${key}'`);
    }
  }
}

export const convertGriffelToStyleX = (style: GriffelStyle | GriffelResetStyle): StyleXStyle => {
  const result: StyleXStyleBuilder = {};

  for (const key in style) {
    if (!Object.prototype.hasOwnProperty.call(style, key)) {
      continue;
    }

    const value = style[key as keyof GriffelStyle];
    if (value === null) {
      continue;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      const property = key as keyof GriffelStyle & keyof StyleXStyle;

      // If there's already a value with :hover or :active, add a `default` case
      const existingValue = result[property];
      if (isComplexValue(existingValue)) {
        existingValue.default = value;
      } else {
        result[property] = value;
      }
    } else if (Array.isArray(value)) {
      throw new Error(`Unsupported array value: '${key}'`);
    } else if (typeof value === 'object') {
      if (isComplexValueKey(key)) {
        mergeSelectorValues(key, value, result);
      }
    } else {
      throw new Error(`Unsupported value: '${key}'`);
    }
  }

  return result;
};
