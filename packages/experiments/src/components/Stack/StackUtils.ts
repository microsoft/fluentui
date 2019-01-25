/**
 * Functions used by Stack components to simplify style-related computations
 */

import { ITheme } from '../../Styling';

// Helper function that converts a themed spacing key (if given) to the corresponding themed spacing value.
const _getThemedSpacing = (space: string, theme: ITheme): string => {
  if (theme.spacing.hasOwnProperty(space)) {
    return theme.spacing[space as keyof typeof theme.spacing];
  }
  return space;
};

/**
 * Takes in a gap size in either a CSS-style format (e.g. 10 or "10px")
 *  or a key of a themed spacing value (e.g. "s1").
 * Returns the separate numerical value of the padding (e.g. 10)
 *  and the CSS unit (e.g. "px").
 */
export const parseGap = (gap: number | string | undefined, theme: ITheme): { value: number; unit: string } => {
  if (gap === undefined || gap === '') {
    return {
      value: 0,
      unit: 'px'
    };
  }

  if (typeof gap === 'number') {
    return {
      value: gap,
      unit: 'px'
    };
  }

  const stringGap = _getThemedSpacing(gap, theme);

  const numericalPart = parseFloat(stringGap);
  const numericalValue = isNaN(numericalPart) ? 0 : numericalPart;
  const numericalString = isNaN(numericalPart) ? '' : numericalPart.toString();

  const unitPart = stringGap.substring(numericalString.toString().length);

  return {
    value: numericalValue,
    unit: unitPart || 'px'
  };
};

/**
 * Takes in a padding in a CSS-style format (e.g. 10, "10px", "10px 10px", etc.)
 *  where the separate padding values can also be the key of a themed spacing value
 *  (e.g. "s1 m", "10px l1 20px l2", etc.).
 * Returns a CSS-style padding.
 */
export const parsePadding = (padding: number | string | undefined, theme: ITheme): number | string | undefined => {
  if (padding === undefined || typeof padding === 'number' || padding === '') {
    return padding;
  }

  const paddingValues = padding.split(' ');
  if (paddingValues.length < 2) {
    return _getThemedSpacing(padding, theme);
  }

  return paddingValues.reduce((padding1: string, padding2: string) => {
    return _getThemedSpacing(padding1, theme) + ' ' + _getThemedSpacing(padding2, theme);
  });
};
