import { getGlobalClassNames } from '../../Styling';
import type { ISwatchColorPickerStyleProps, ISwatchColorPickerStyles } from './SwatchColorPicker.types';

const GlobalClassNames = {
  focusedContainer: 'ms-swatchColorPickerBodyContainer',
};

export const getStyles = (props: ISwatchColorPickerStyleProps): ISwatchColorPickerStyles => {
  const { className, theme, cellMargin } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: {
      margin: '8px 0',
      borderCollapse: 'collapse',
    },
    tableCell: {
      padding: cellMargin! / 2,
    },
    focusedContainer: [
      classNames.focusedContainer,
      {
        clear: 'both',
        display: 'block',
        minWidth: '180px',
      },
      className,
    ],
  };
};
