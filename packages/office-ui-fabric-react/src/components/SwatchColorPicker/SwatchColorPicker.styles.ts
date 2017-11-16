
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
      !disabled && isSelected && 'is-selected' && {
        selectors: {
          '&:hover .svg': { boxShadow: '0 0 0 1px #969696' },
          '&:focus .svg, & .svg': {
            width: 12,
            height: 12,
            border: '4px solid',
            borderColor: theme.palette.neutralTertiaryAlt
          },
          '&:active .svg ': { boxShadow: '0 0 0 1px #969696' },
        },
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
        boxSizing: 'content-box',
        selectors: {
          '&:hover': {
            width: 12,
            height: 12,
            border: '4px solid',
            borderColor: theme.palette.neutralQuaternaryAlt,
          },
          '&:focus': {
            width: 12,
            height: 12,
            border: '4px solid',
            borderColor: theme.palette.neutralQuaternaryAlt,
          },
          '&:active': {
            width: 12,
            height: 12,
            border: '4px solid',
            borderColor: theme.palette.neutralTertiaryAlt
          }
        }
      },
      circle && {
        borderRadius: '100%'
      },
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