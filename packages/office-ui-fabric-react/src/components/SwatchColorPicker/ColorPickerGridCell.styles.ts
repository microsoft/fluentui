import { IRawStyle, HighContrastSelector } from '../../Styling';
import { IsFocusVisibleClassName } from '../../Utilities';
import { IColorPickerGridCellStyleProps, IColorPickerGridCellStyles } from './ColorPickerGridCell.types';

const ACTIVE_BORDER_COLOR = '#969696';

function getSvgSelectorStyles(borderColor: string, isHover: boolean): IRawStyle {
  return {
    width: 12,
    height: 12,
    border: '4px solid',
    borderColor: borderColor,
    boxShadow: isHover ? 'none' : '0 0 0 1px #969696',
    padding: 4,
    margin: 0
  };
}

export const getStyles = (props: IColorPickerGridCellStyleProps): IColorPickerGridCellStyles => {
  const { theme, disabled, selected, circle, isWhite } = props;

  const { semanticColors } = theme;
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
          [`.${IsFocusVisibleClassName} &:focus, .${IsFocusVisibleClassName} &:focus::after`]: { border: 'none' },
          [`.${IsFocusVisibleClassName} &:focus $svg`]: getSvgSelectorStyles(theme.palette.neutralQuaternaryAlt, false),
          ':hover $svg': getSvgSelectorStyles(theme.palette.neutralQuaternaryAlt, true),
          ':focus $svg': getSvgSelectorStyles(theme.palette.neutralQuaternaryAlt, false),
          ':active $svg': getSvgSelectorStyles(ACTIVE_BORDER_COLOR, false)
        }
      },
      isWhite && {
        selectors: {
          $svg: {
            padding: 0,
            border: '1px solid',
            borderColor: theme.palette.neutralTertiary,
            margin: 4
          }
        }
      },
      circle &&
        'is-circle' && {
          selectors: {
            $svg: { borderRadius: '100%' }
          }
        },
      selected &&
        'isSelected' && {
          selectors: {
            $svg: {
              boxShadow: '0 0 0 1px #969696',
              border: '4px solid',
              borderColor: theme.palette.neutralTertiaryAlt,
              width: 12,
              height: 12
            },
            ':hover $svg': { boxShadow: '0 0 0 1px #969696' },
            ':focus $svg': {
              boxShadow: '0 0 0 1px #969696'
            },
            ':active $svg': {
              boxShadow: '0 0 0 1px #969696',
              borderColor: ACTIVE_BORDER_COLOR
            }
          }
        },
      selected &&
        isWhite && {
          selectors: {
            $svg: {
              padding: 4,
              margin: 0
            }
          }
        },
      disabled &&
        'is-disabled' && {
          color: semanticColors.disabledBodyText,
          cursor: 'default',
          pointerEvents: 'none',
          opacity: 0.3
        }
    ],
    svg: [
      {
        width: 20,
        height: 20,
        padding: 4,
        boxSizing: 'content-box'
      }
    ]
  };
};
