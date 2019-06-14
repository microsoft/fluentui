import { ISwatchColorPickerStyleProps, ISwatchColorPickerStyles } from 'office-ui-fabric-react/lib/SwatchColorPicker';

export const SwatchColorPickerStyles = (props: ISwatchColorPickerStyleProps): ISwatchColorPickerStyles => {
  const { theme } = props;

  return {
    root: {},
    tableCell: {},
    focusedContainer: [
      {
        selectors: {
          // table[class*="root-"] : {
          table: {
            // backgroundColor: 'red',
            boxShadow: theme.effects.elevation8
          }
        }
      }
    ]
  };
};
