import { IsFocusVisibleClassName } from '../../Utilities';
import { HighContrastSelector } from '../../Styling';
import { IColorPickerGridCellStyleProps, IColorPickerGridCellStyles } from './ColorPickerGridCell.types';

// Size breakpoint when the default border width changes from 2px to 4px.
const CELL_BORDER_BREAKPOINT = 24;
const DIVIDING_PADDING = 2;

export const getStyles = (props: IColorPickerGridCellStyleProps): IColorPickerGridCellStyles => {
  const { theme, disabled, selected, circle, isWhite, height = 20, width = 20, borderWidth } = props;
  const { semanticColors } = theme;

  const calculatedBorderWidth = borderWidth ? borderWidth : width < CELL_BORDER_BREAKPOINT ? 2 : 4;

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
            outlineOffset: `${calculatedBorderWidth - 1}px`
          }
        }
      },
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
