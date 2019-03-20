import { IColorPickerGridCellStyleProps, IColorPickerGridCellStyles } from 'office-ui-fabric-react/lib/SwatchColorPicker';
import { IsFocusVisibleClassName } from 'office-ui-fabric-react/lib/Utilities';

export const ColorPickerGridCellStyles = (props: IColorPickerGridCellStyleProps): Partial<IColorPickerGridCellStyles> => {
  const { theme, selected, isWhite, circle, borderWidth } = props;
  const { palette } = theme;

  return {
    colorCell: [
      {
        selectors: {
          [`.${IsFocusVisibleClassName} &:focus`]: [
            !circle && {
              // According to the toolkit the outline is flush with the rest swatches without adding visually in size.
              outlineOffset: '-1px'
            },
            // Might need to be reworked after some changes in SwatchColorPicker default styles
            circle && {
              outlineColor: 'transparent',
              border: `1px solid ${palette.neutralSecondary}`,
              padding: borderWidth! + (borderWidth! - 1)
            }
          ]
        }
      },
      isWhite &&
        !selected && {
          backgroundColor: palette.neutralTertiary
        },
      !selected && {
        selectors: {
          ':focus': {
            borderColor: palette.white
          },
          ':hover': {
            borderColor: palette.neutralLighter
          },
          ':active:hover': {
            borderColor: palette.neutralLight
          }
        }
      },
      selected && {
        borderColor: palette.neutralLight,
        selectors: {
          ':hover': [
            !circle && {
              outline: `1px solid ${palette.neutralSecondary}`,
              outlineOffset: '-1px'
            },
            // Might need to be reworked after some changes in SwatchColorPicker default styles
            circle && {
              border: `1px solid ${palette.neutralSecondary}`,
              padding: borderWidth! + (borderWidth! - 1)
            }
          ]
        }
      }
    ]
  };
};
