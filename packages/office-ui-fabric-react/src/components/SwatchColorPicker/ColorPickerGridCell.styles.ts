import { IsFocusVisibleClassName } from '../../Utilities';
import { IColorPickerGridCellStyleProps, IColorPickerGridCellStyles } from './ColorPickerGridCell.types';

export const getStyles = (props: IColorPickerGridCellStyleProps): IColorPickerGridCellStyles => {
  const { theme, disabled, selected, circle, isWhite, height, width, borderWidth } = props;
  const { semanticColors } = theme;

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
        height: height,
        width: width,
        selectors: {
          // remove default focus border
          [`.${IsFocusVisibleClassName} &:focus::after`]: { display: 'none' },
          // add a custom focus border
          [`.${IsFocusVisibleClassName} &:focus`]: { outline: `1px solid ${semanticColors.focusBorder}` }
        }
      },
      circle && {
        borderRadius: '100%'
      },
      selected && {
        padding: borderWidth,
        border: `${borderWidth}px solid ${theme.palette.neutralTertiaryAlt}`
      },
      !selected && {
        selectors: {
          ['&:hover, &:active, &:focus']: {
            backgroundColor: semanticColors.bodyBackground, // overwrite white's override
            padding: borderWidth,
            border: `${borderWidth}px solid ${theme.palette.neutralLight}`
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
        borderRadius: '100%'
      }
    ]
  };
};
