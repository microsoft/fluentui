import { IColorPickerGridCellStyleProps, IColorPickerGridCellStyles } from 'office-ui-fabric-react/lib/SwatchColorPicker';

export const ColorPickerGridCellStyles = (props: IColorPickerGridCellStyleProps): Partial<IColorPickerGridCellStyles> => {
  const { theme, selected, isWhite } = props;

  const buttonBorderHovered = theme.palette.neutralLighter;
  const buttonBorderChecked = theme.palette.neutralLight;
  const buttonBorderIsWhite = theme.palette.neutralTertiary;

  return {
    colorCell: [
      selected && {
        borderColor: buttonBorderChecked
      },
      !selected && {
        selectors: {
          ['&:hover, &:active, &:focus']: {
            borderColor: buttonBorderHovered
          }
        }
      },
      isWhite &&
        !selected && {
          backgroundColor: buttonBorderIsWhite
        }
    ]
  };
};
