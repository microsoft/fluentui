
import { ISwatchColorPickerStyleProps, ISwatchColorPickerStyles } from './SwatchColorPicker.types';

export const getStyles = (props: ISwatchColorPickerStyleProps): ISwatchColorPickerStyles => {
  const { className } = props;

  return {
    root: {
      padding: 2,
      outline: 'none'
    },
    tableCell: {
      padding: 0
    },
    focusedContainer: [
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