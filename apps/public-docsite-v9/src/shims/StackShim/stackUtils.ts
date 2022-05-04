import { getTheme, IStackProps, IStackTokens, IStyle, ITheme } from '@fluentui/react';

// Helper function that converts a themed spacing key (if given) to the corresponding themed spacing value.
const getThemedSpacing = (space: string, theme: ITheme): string => {
  if (theme.spacing.hasOwnProperty(space)) {
    return theme.spacing[space as keyof typeof theme.spacing];
  }
  return space;
};

// Helper function that takes a gap as a string and converts it into a { value, unit } representation.
const getValueUnitGap = (gap: string): { value: number; unit: string } => {
  const numericalPart = parseFloat(gap);
  const numericalValue = isNaN(numericalPart) ? 0 : numericalPart;
  const numericalString = isNaN(numericalPart) ? '' : numericalPart.toString();

  const unitPart = gap.substring(numericalString.toString().length);

  return {
    value: numericalValue,
    unit: unitPart || 'px',
  };
};

/**
 * Takes in a gap size in either a CSS-style format (e.g. 10 or "10px")
 *  or a key of a themed spacing value (e.g. "s1").
 * Returns the separate numerical value of the padding (e.g. 10)
 *  and the CSS unit (e.g. "px").
 */
export const parseGap = (
  gap: IStackProps['gap'],
  theme: ITheme,
): { rowGap: { value: number; unit: string }; columnGap: { value: number; unit: string } } => {
  if (gap === undefined || gap === '') {
    return {
      rowGap: {
        value: 0,
        unit: 'px',
      },
      columnGap: {
        value: 0,
        unit: 'px',
      },
    };
  }

  if (typeof gap === 'number') {
    return {
      rowGap: {
        value: gap,
        unit: 'px',
      },
      columnGap: {
        value: gap,
        unit: 'px',
      },
    };
  }

  const splitGap = gap.split(' ');

  // If the array has more than two values, then return 0px.
  if (splitGap.length > 2) {
    return {
      rowGap: {
        value: 0,
        unit: 'px',
      },
      columnGap: {
        value: 0,
        unit: 'px',
      },
    };
  }

  // If the array has two values, then parse each one.
  if (splitGap.length === 2) {
    return {
      rowGap: getValueUnitGap(getThemedSpacing(splitGap[0], theme)),
      columnGap: getValueUnitGap(getThemedSpacing(splitGap[1], theme)),
    };
  }

  // Else, parse the numerical value and pass it as both the vertical and horizontal gap.
  const calculatedGap = getValueUnitGap(getThemedSpacing(gap, theme));

  return {
    rowGap: calculatedGap,
    columnGap: calculatedGap,
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
    return getThemedSpacing(padding, theme);
  }

  return paddingValues.reduce((padding1: string, padding2: string) => {
    return getThemedSpacing(padding1, theme) + ' ' + getThemedSpacing(padding2, theme);
  });
};

export interface IStackShimStyles {
  root?: IStyle;
  inner?: IStyle;
}
/**
 *
 * getStyles function for Stack.tokens.childrenGap prop styling
 */
export const getChildrenGapStyles = (props: IStackProps): IStackShimStyles => {
  const theme = getTheme();

  const { horizontal, reversed } = props;
  const tokens: IStackTokens = { ...props.tokens };

  const { rowGap, columnGap } = parseGap(tokens.childrenGap, theme);
  const horizontalMargin = `${-0.5 * columnGap.value}${columnGap.unit}`;
  const verticalMargin = `${-0.5 * rowGap.value}${rowGap.unit}`;

  return {
    root: [
      reversed &&
        horizontal && {
          '> *:not(:last-child)': {
            marginLeft: `${columnGap.value}${columnGap.unit}`,
          },
        },
      reversed &&
        !horizontal && {
          '> *:not(:last-child)': {
            marginTop: `${rowGap.value}${rowGap.unit}`,
          },
        },
      !reversed &&
        horizontal && {
          '> *:not(:first-child)': {
            marginLeft: `${columnGap.value}${columnGap.unit}`,
          },
        },
      !reversed &&
        !horizontal && {
          '> *:not(:first-child)': {
            marginTop: `${rowGap.value}${rowGap.unit}`,
          },
        },
    ],
    inner: [
      {
        marginLeft: horizontalMargin,
        marginRight: horizontalMargin,
        marginTop: verticalMargin,
        marginBottom: verticalMargin,
        width: columnGap.value === 0 ? '100%' : `calc(100% + ${columnGap.value}${columnGap.unit})`,
        '> *': {
          margin: `${0.5 * rowGap.value}${rowGap.unit} ${0.5 * columnGap.value}${columnGap.unit}`,
        },
      },
      horizontal && {
        height: rowGap.value === 0 ? '100%' : `calc(100% + ${rowGap.value}${rowGap.unit})`,
        '> *': {
          maxWidth: columnGap.value === 0 ? '100%' : `calc(100% - ${columnGap.value}${columnGap.unit})`,
        },
      },
      !horizontal && {
        height: `calc(100% + ${rowGap.value}${rowGap.unit})`,
        '> *': {
          maxHeight: rowGap.value === 0 ? '100%' : `calc(100% - ${rowGap.value}${rowGap.unit})`,
        },
      },
    ],
  };
};
