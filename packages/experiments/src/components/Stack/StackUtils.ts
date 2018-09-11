/**
 * Functions used by Stack components to simplify style-related computations
 */

import { Alignment } from './Stack.types';

const horizontalAlignmentMap: { [key: string]: string } = {
  left: 'start',
  right: 'end'
};

const verticalAlignmentMap: { [key: string]: string } = {
  top: 'start',
  bottom: 'end'
};

// Converts the alignment expected by a HorizontalStack to an alignment expected by a Stack.
export const getHorizontalAlignment = (alignment: string | undefined): Alignment => {
  return (horizontalAlignmentMap[alignment!] || alignment) as Alignment;
};

// Converts the alignment expected by a VerticalStack to an alignment expected by a Stack.
export const getVerticalAlignment = (alignment: string | undefined): Alignment => {
  return (verticalAlignmentMap[alignment!] || alignment) as Alignment;
};

// Parses the CSS-style gap size into a numerical value and a CSS unit (e.g. px).
export const parseGap = (gap: number | string | undefined): { value: number; unit: string } => {
  if (gap === undefined) {
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

  const numericalPart = parseFloat(gap);
  const numericalValue = isNaN(numericalPart) ? 0 : numericalPart;
  const numericalString = isNaN(numericalPart) ? '' : numericalPart.toString();

  const unitPart = gap.substring(numericalString.toString().length);

  return {
    value: numericalValue,
    unit: unitPart || 'px'
  };
};
