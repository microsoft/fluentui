
import {
  IRawStyle,
  getFocusStyle
} from '../../Styling';
import { ISwatchColorPickerStyleProps, ISwatchColorPickerStyles } from './SwatchColorPicker.types';

function getSvgSelectorStyles(borderColor: string): IRawStyle {
  return {
    width: '12px',
    height: '12px',
    boxShadow: 'box-shadow: 0 0 0 1px #969696',
    border: '4px solid',
    borderColor: borderColor,
  };
};

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
    root: [
      {
        position: 'relative',
      }
    ],
    cell: [
      {
        padding: '0px',
        overflow: 'visible',
      },
      disabled && 'is-disabled' && {
        color: semanticColors.disabledBodyText,
        cursor: 'default',
        pointerEvents: 'none',
        opacity: .3
      },
      !disabled && {
        selectors: {
          '.ms-Fabric.is-focusVisible &:focus, .ms-Fabric.is-focusVisibl &:focus::after': { border: 'none' }
        }
      }
    ],
    svg: [
      {
        width: '20px',
        height: '20px',
        padding: '4px',
        boxSizing: 'content-box'
      },
      circle && {
        borderRadius: '100%'
      },
      'is-selected' && isSelected && getSvgSelectorStyles(theme.palette.neutralTertiaryAlt) && {
        selectors: {
          ':hover': getSvgSelectorStyles(theme.palette.neutralQuaternaryAlt),
          ':focus': getSvgSelectorStyles(theme.palette.neutralQuaternaryAlt),
          ':active': getSvgSelectorStyles(theme.palette.neutralTertiaryAlt),
        }
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