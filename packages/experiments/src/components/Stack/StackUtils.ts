/**
 * Functions used by Stack components to simplify style-related computations
 */

import { Alignment } from './Stack.types';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';

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

// Parses a CSS-style gap size (e.g. "10px") into a numerical value and a CSS unit (e.g. px).
// Also allows the user to pass in the key of a themed spacing value.
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

  let stringGap = gap;
  if (theme.spacing.hasOwnProperty(gap)) {
    stringGap = theme.spacing[gap as keyof typeof theme.spacing];
  }

  const numericalPart = parseFloat(stringGap);
  const numericalValue = isNaN(numericalPart) ? 0 : numericalPart;
  const numericalString = isNaN(numericalPart) ? '' : numericalPart.toString();

  const unitPart = stringGap.substring(numericalString.toString().length);

  return {
    value: numericalValue,
    unit: unitPart || 'px'
  };
};
