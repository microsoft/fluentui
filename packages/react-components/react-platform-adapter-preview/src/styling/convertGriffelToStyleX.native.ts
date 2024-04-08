/* eslint-disable no-console */
import type { GriffelStyle } from '@griffel/core';
import type { UserAuthoredStyles as StyleXStyle } from '@stylexjs/stylex/lib/StyleXTypes';

// Modifiable version of StyleXStyle
type StyleXStyleBuilder = {
  -readonly [P in keyof StyleXStyle]: StyleXStyle[P];
};

type ValueWithSelectors = {
  default?: string | number | ValueWithSelectors | null;
  [pseudoClass: `:${string}`]: string | number | ValueWithSelectors;
  [atRule: `@${string}`]: string | number | ValueWithSelectors;
};

type Selector = keyof ValueWithSelectors;

function isSelector(key: string): key is Selector {
  // Compound selectors are not supported
  if (key.includes(',')) {
    return false;
  }

  return key.startsWith(':') || key.startsWith('@') || key === 'default';
}

function isValueWithSelectors(value: StyleXStyle[keyof StyleXStyle]): value is ValueWithSelectors {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function makeValueWithSelectors(
  selectors: Selector[],
  value: string | number,
  existingValue?: string | number | unknown | null | undefined,
): string | number | ValueWithSelectors {
  if (selectors.length === 0) {
    return value;
  }

  const selector = selectors[0];
  const nestedSelectors = selectors.slice(1);

  if (isValueWithSelectors(existingValue)) {
    existingValue[selector] = makeValueWithSelectors(nestedSelectors, value, existingValue[selector]);
    return existingValue;
  }

  return {
    default: existingValue ?? null,
    [selector]: makeValueWithSelectors(nestedSelectors, value),
  } as ValueWithSelectors;
}

function convertGriffelValueToStyleX(
  griffelStyle: GriffelStyle,
  property: string,
): [keyof GriffelStyle & keyof StyleXStyle, GriffelStyle[keyof GriffelStyle]] | [undefined, undefined] {
  const prop = property as keyof GriffelStyle & keyof StyleXStyle;
  const value = griffelStyle[prop];
  if (
    prop.startsWith('grid') ||
    prop.startsWith('outline') ||
    prop === 'transform' || // REVIEW: Transform seems to be partly supported but causes errors
    prop === 'cursor' ||
    prop === 'clipPath' ||
    prop === 'boxShadow' ||
    (prop === 'display' && value === 'grid') ||
    (prop === 'position' && value === 'static') ||
    (prop === 'height' && value === 'fit-content')
  ) {
    console.log(`[convertGriffelToStyleX] Ignoring unsupported property '${prop}: ${value}'`);
    return [undefined, undefined];
  }

  if (prop === 'columnGap' || prop === 'rowGap') {
    console.log(`[convertGriffelToStyleX] Converting '${prop}' to 'gap'`);
    return ['gap', value];
  }

  if (prop === 'display' && value === 'inline-flex') {
    console.log(`[convertGriffelToStyleX] Converting 'display: inline-flex' to 'display: flex'`);
    return ['display', 'flex'];
  }

  return [prop, value];
}

/**
 * Converts from Griffel's selector format to StyleX's format.
 *
 * Griffel nests the values inside of the selectors:
 * {
 *   color: 'red',
 *  ':hover': {
 *     color: 'green',
 *     '@media (forced-colors: active)': {
 *        color: 'highlighttext',
 *      },
 *   },
 * }
 *
 * StyleX nests the selectors inside of the values:
 * {
 *   color: {
 *     default: 'red',
 *     ':hover': {
 *       default: 'green',
 *       '@media (forced-colors: active)': 'highlighttext',
 *     },
 *   },
 * }
 *
 * @param selector The selector, such as ':hover' or '@media ...'
 * @param griffelStyle The griffel styles within this selector.
 * @param strictDomStyle The react-strict-dom style to add the merged values to.
 */
function mergeSelectorValues(selectors: Selector[], griffelStyle: GriffelStyle, strictDomStyle: StyleXStyleBuilder) {
  for (const key in griffelStyle) {
    if (!Object.prototype.hasOwnProperty.call(griffelStyle, key)) {
      continue;
    }

    const [property, value] = convertGriffelValueToStyleX(griffelStyle, key);
    if (property === undefined || value === undefined || value === null) {
      continue;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      strictDomStyle[property] = makeValueWithSelectors(selectors, value, strictDomStyle[property]);
    } else if (Array.isArray(value)) {
      console.log('[convertGriffelToStyleX] Unsupported array value for ', key);
    } else if (isSelector(key) && isValueWithSelectors(value)) {
      mergeSelectorValues([...selectors, key], value, strictDomStyle);
    } else {
      console.log(`[convertGriffelToStyleX] Unsupported selector `, [...selectors, key]);
    }
  }
}

export const convertGriffelToStyleX = (griffelStyle: GriffelStyle): StyleXStyle => {
  const strictDomStyle: StyleXStyleBuilder = {};

  for (const key in griffelStyle) {
    if (!Object.prototype.hasOwnProperty.call(griffelStyle, key)) {
      continue;
    }

    const [property, value] = convertGriffelValueToStyleX(griffelStyle, key);
    if (value === undefined || value === null) {
      continue;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      // If there's already a value with :hover or :active, add a `default` case
      const existingValue = strictDomStyle[property];
      if (isValueWithSelectors(existingValue)) {
        existingValue.default = value;
      } else {
        strictDomStyle[property] = value;
      }
    } else if (Array.isArray(value)) {
      console.log('[convertGriffelToStyleX] Unsupported array value for ', property);
    } else if (property.includes('::') || property.includes(':before') || property.includes(':after')) {
      // TODO this could potentially be solved by automatically adding extra elements to the DOM tree
      console.log('[convertGriffelToStyleX] Unsupported pseudo-element ', property);
    } else if (isSelector(property) && isValueWithSelectors(value)) {
      mergeSelectorValues([property], value, strictDomStyle);
    } else {
      console.log('[convertGriffelToStyleX] Unsupported selector ', property);
    }
  }

  return strictDomStyle;
};
