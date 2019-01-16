import { ISwatchColorPickerStyleProps, ISwatchColorPickerStyles } from 'office-ui-fabric-react/lib/SwatchColorPicker';

export const SwatchColorPickerStyles = (props: ISwatchColorPickerStyleProps): Partial<ISwatchColorPickerStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;

  return {
    tableCell: {
      selectors: {
        '.ms-Button--command > circle': {
          selectors: {
            '&:hover': {
              backgroundColor: semanticColors.menuItemBackgroundHovered
            }
          }
        }
      }
    }
  };
};
