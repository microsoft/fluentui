
import { ISwatchColorPickerStyleProps, ISwatchColorPickerStyles } from './SwatchColorPicker.types';
import { getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  focusedContainer: 'ms-swatchColorPickerBodyContainer',
};

export const getStyles = (props: ISwatchColorPickerStyleProps): ISwatchColorPickerStyles => {
  const {
    className,
    theme,
  } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: {
      padding: 2,
      outline: 'none'
    },
    tableCell: {
      padding: 0
    },
    focusedContainer: [
      classNames.focusedContainer,
      {
        clear: 'both',
        display: 'block',
        minWidth: '180px',
      },
      className
    ]
  };
};