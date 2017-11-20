import {
  IRawStyle,
  getFocusStyle,
  HighContrastSelector,
} from '../../Styling';

import { IColorPickerGridCellStyleProps, IColorPickerGridCellStyles } from './ColorPickerGridCell.types';

function getSvgSelectorStyles(borderColor: string): IRawStyle {
  return {
    width: 12,
    height: 12,
    border: '4px solid',
    borderColor: borderColor
  };
}

export const getStyles = (props: IColorPickerGridCellStyleProps): IColorPickerGridCellStyles => {
  const {
    theme,
    disabled,
    selected,
    circle
  } = props;

  const { semanticColors, fonts } = theme;
  return {
    root: [
      {
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
          ':active $svg': getSvgSelectorStyles(theme.palette.neutralTertiaryAlt),
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
            width: 12,
            height: 12,
          },
          ':hover $svg': { boxShadow: '0 0 0 1px #969696' },
          ':focus $svg': {
            borderColor: theme.palette.neutralTertiaryAlt
          },
          ':active $svg': { boxShadow: '0 0 0 1px #969696' },
        },
      },
      disabled && 'is-disabled' && {
        color: semanticColors.disabledBodyText,
        cursor: 'default',
        pointerEvents: 'none',
        opacity: .3
      },
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