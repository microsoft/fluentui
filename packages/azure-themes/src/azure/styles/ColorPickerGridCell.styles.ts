import { IColorPickerGridCellStyleProps, IColorPickerGridCellStyles } from '@fluentui/react/lib/SwatchColorPicker';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const ColorPickerGridCellStyles = (
  props: IColorPickerGridCellStyleProps,
): Partial<IColorPickerGridCellStyles> => {
  const { theme, selected, circle } = props;
  const semanticColors = theme.semanticColors as IExtendedSemanticColors;

  return {
    colorCell: [
      !selected && {
        selectors: {
          ':focus': {
            borderColor: semanticColors.controlOutline,
            backgroundColor: semanticColors.listItemBackgroundHovered,
          },
          ':hover': {
            borderColor: semanticColors.controlOutline,
            backgroundColor: semanticColors.listItemBackgroundHovered,
          },
          ':active:hover': {
            borderColor: semanticColors.controlOutline,
            backgroundColor: semanticColors.listItemBackgroundHovered,
          },
        },
      },
      selected && {
        borderColor: semanticColors.controlOutline,
        selectors: {
          ':hover': [
            !circle && {
              outlineColor: semanticColors.controlOutline,
            },
            circle && {
              borderColor: semanticColors.controlOutline,
            },
          ],
        },
      },
    ],
  };
};
