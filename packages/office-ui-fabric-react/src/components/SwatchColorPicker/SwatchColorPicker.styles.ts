
import {
  IRawStyle,
  getFocusStyle,
  HighContrastSelector
} from '../../Styling';
import { ISwatchColorPickerStyleProps, ISwatchColorPickerStyles } from './SwatchColorPicker.types';

function getSvgSelectorStyles(borderColor: string): IRawStyle {
  return {
    width: 12,
    height: 12,
    border: '4px solid',
    borderColor: borderColor
  };
}

export const getStyles = (props: ISwatchColorPickerStyleProps): ISwatchColorPickerStyles => {
  const {
    theme,
    className,
    disabled,
    isSelected,
    circle
  } = props;

  const { semanticColors, fonts } = theme;
  return {
    colorCell: [
      {
        padding: 0,
        overflow: 'visible',
        selectors: {
          '.ms-Fabric.is-focusVisible &:focus, .ms-Fabric.is-focusVisible &:focus::after': { border: 'none' },
          [HighContrastSelector]: { border: 'none' }
        }
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
        selectors: {
          ':hover': getSvgSelectorStyles(theme.palette.neutralQuaternaryAlt),
          ':focus': getSvgSelectorStyles(theme.palette.neutralQuaternaryAlt),
          ':active': getSvgSelectorStyles(theme.palette.neutralTertiaryAlt),
        }
      },
      circle && {
        borderRadius: '100%'
      },
      isSelected && {
        boxShadow: '0 0 0 1px #969696',
        border: '4px solid',
        width: 12,
        height: 12,
        borderColor: theme.palette.neutralTertiaryAlt,
        selectors: {
          ':hover': { boxShadow: '0 0 0 1px #969696' },
          ':focus': {
            borderColor: theme.palette.neutralTertiaryAlt
          },
          ':active': { boxShadow: '0 0 0 1px #969696' },
        },
      }
    ],
    container: [
      'ms-swatchColorPickerBodyContainer',
      {
        clear: 'both',
        display: 'block',
        minWidth: '180px',
      },
      className
    ]
  };
};