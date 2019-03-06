import { IsFocusVisibleClassName } from '../../Utilities';
import { HighContrastSelector } from '../../Styling';
import { IColorPickerGridCellStyleProps, IColorPickerGridCellStyles } from './ColorPickerGridCell.types';

// Size breakpoint when the default border width changes from 2px to 4px.
const CELL_BORDER_BREAKPOINT = 24;
const LARGE_BORDER = 4;
const SMALL_BORDER = 2;
const DIVIDING_PADDING = 2;
const DEFAULT_CELL_SIZE = 20;

export const getStyles = (props: IColorPickerGridCellStyleProps): IColorPickerGridCellStyles => {
  const { theme, disabled, selected, circle, isWhite, height = DEFAULT_CELL_SIZE, width = DEFAULT_CELL_SIZE, borderWidth } = props;
  const { semanticColors } = theme;

  // If user provided a value, use it. If not, then we decide depending on the 24px size breakpoint.
  const calculatedBorderWidth = borderWidth ? borderWidth : width < CELL_BORDER_BREAKPOINT ? SMALL_BORDER : LARGE_BORDER;

  return {
    // this is a button that wraps the color
    colorCell: [
      {
        backgroundColor: semanticColors.bodyBackground,
        padding: 0,
        position: 'relative',
        boxSizing: 'border-box',
        display: 'inline-block',
        cursor: 'pointer',
        userSelect: 'none',
        border: 'none',
        height: height,
        width: width
      },
      !circle && {
        selectors: {
          [`.${IsFocusVisibleClassName} &:focus::after`]: {
            // -1px so that we don't increase visually the size of the cell.
            outlineOffset: `${calculatedBorderWidth - 1}px`
          }
        }
      },
      // In focus state for circle we want a round border which is not possible with outline.
      circle && {
        borderRadius: '50%',
        selectors: {
          [`.${IsFocusVisibleClassName} &:focus::after`]: {
            outline: 'none',
            borderColor: semanticColors.focusBorder,
            borderRadius: '50%',
            left: -calculatedBorderWidth,
            right: -calculatedBorderWidth,
            top: -calculatedBorderWidth,
            bottom: -calculatedBorderWidth,
            selectors: {
              [HighContrastSelector]: {
                outline: `1px solid ButtonText`
              }
            }
          }
        }
      },
      selected && {
        padding: DIVIDING_PADDING,
        border: `${calculatedBorderWidth}px solid ${theme.palette.neutralTertiaryAlt}`
      },
      !selected && {
        selectors: {
          ['&:hover, &:active, &:focus']: {
            backgroundColor: semanticColors.bodyBackground, // overwrite white's override
            padding: DIVIDING_PADDING,
            border: `${calculatedBorderWidth}px solid ${theme.palette.neutralLight}`
          },
          ['&:focus']: {
            borderColor: semanticColors.bodyBackground,
            padding: 0,
            selectors: {
              ':hover': {
                borderColor: theme.palette.neutralLight,
                padding: DIVIDING_PADDING
              }
            }
          }
        }
      },
      disabled && {
        color: semanticColors.disabledBodyText,
        pointerEvents: 'none',
        opacity: 0.3
      },
      isWhite &&
        !selected && {
          // fake a border for white
          backgroundColor: semanticColors.bodyDivider,
          padding: 1
        }
    ],
    // the <svg> that holds the color
    svg: [
      {
        width: '100%',
        height: '100%'
      },
      circle && {
        borderRadius: '50%'
      }
    ]
  };
};
