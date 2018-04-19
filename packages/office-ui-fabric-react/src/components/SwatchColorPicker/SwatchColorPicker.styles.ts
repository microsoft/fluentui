
import { ISwatchColorPickerStyleProps, ISwatchColorPickerStyles } from './SwatchColorPicker.types';
import { globalClassNamesWhenEnabled } from '../../Styling';

export const getStyles = (props: ISwatchColorPickerStyleProps): ISwatchColorPickerStyles => {
  const {
    className,
    theme,
  } = props;

  return {
    root: {
      padding: 2,
      outline: 'none'
    },
    tableCell: {
      padding: 0
    },
    focusedContainer: [
      globalClassNamesWhenEnabled(theme, ['ms-swatchColorPickerBodyContainer']),
      {
        clear: 'both',
        display: 'block',
        minWidth: '180px',
      },
      className
    ]
  };
};