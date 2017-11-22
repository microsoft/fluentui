import {
  IRawStyle,
  getFocusStyle,
  HighContrastSelector,
} from '../../Styling';

import { IColorPickerGridCellStyleProps, IColorPickerGridCellStyles } from './ColorPickerGridCell.types';
const ACTIVE_BORDER_COLOR = '#969696';

function getSvgSelectorStyles(borderColor: string): IRawStyle {
  return {
    width: 12,
    height: 12,
    border: '4px solid',
    borderColor: borderColor,
  };
}

export const getStyles = (props: IColorPickerGridCellStyleProps): IColorPickerGridCellStyles => {
  const {
    theme,
    disabled,
    selected,
    circle,
    isWhite
  } = props;

  const { semanticColors, fonts } = theme;
  return {
    colorCell: [
      {
        backgroundColor: 'transparent',
        padding: 0,
        overflow: 'visible',
        position: 'relative',
        boxSizing: 'border-box',
        display: 'inline-block',
        border: '1px solid transparent',
        background: 'transparent',
        cursor: 'pointer',
        textAlign: 'center',
        verticalAlign: 'top',
        userSelect: 'none',
        height: 40,
        selectors: {
          [HighContrastSelector]: { border: 'none' },
          '.ms-Fabric.is-focusVisible &:focus, .ms-Fabric.is-focusVisible &:focus::after': { border: 'none' },
          '.ms-Fabric.is-focusVisible &:focus $svg': getSvgSelectorStyles(theme.palette.neutralQuaternaryAlt),
          ':hover $svg': getSvgSelectorStyles(theme.palette.neutralQuaternaryAlt),
          ':focus $svg': getSvgSelectorStyles(theme.palette.neutralQuaternaryAlt),
          ':active $svg': getSvgSelectorStyles(ACTIVE_BORDER_COLOR),
        }
      },
      isWhite && {
        selectors: {
          '$svg': {
            padding: 0,
            border: '1px solid #D2D2D2',
            margin: 4,
          },
          ':hover $svg, :active $svg, .ms-Fabric.is-focusVisible &:focus $svg': {
            padding: 4,
            margin: 0
          }
        }
      },
      circle && 'is-circle' && {
        selectors: {
          '$svg': { borderRadius: '100%' },
        }
      },
      selected && 'isSelected' && {
        selectors: {
          '$svg': {
            boxShadow: '0 0 0 1px #969696',
            border: '4px solid',
            borderColor: theme.palette.neutralTertiaryAlt,
            width: 12,
            height: 12,
          },
          ':hover $svg': { boxShadow: '0 0 0 1px #969696' },
          ':focus $svg': {
            borderColor: theme.palette.neutralTertiaryAlt
          },
          ':active $svg':
          {
            boxShadow: '0 0 0 1px #969696',
            borderColor: ACTIVE_BORDER_COLOR,
            padding: 4,
            margin: 0
          },
        },
      },
      selected && isWhite && {
        selectors: {
          '$svg': {
            padding: 4,
            margin: 0
          }
        }
      },
      disabled && 'is-disabled' && {
        color: semanticColors.disabledBodyText,
        cursor: 'default',
        pointerEvents: 'none',
        opacity: .3
      }
    ],
    svg: [
      {
        width: 20,
        height: 20,
        padding: 4,
        boxSizing: 'content-box',
      }
    ]
  };
};