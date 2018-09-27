import { ISwatchColorPickerStyleProps, ISwatchColorPickerStyles } from './SwatchColorPicker.types';
import { getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  focusedContainer: 'ms-swatchColorPickerBodyContainer'
};

export const getStyles = (props: ISwatchColorPickerStyleProps): ISwatchColorPickerStyles => {
  const { className, theme, cellMargin = 10 } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: {
      margin: '12px 5px',
      borderCollapse: 'collapse'
    },
    tableCell: {
      paddingRight: cellMargin,
      paddingBottom: cellMargin,
      selectors: {
        ':last-child': {
          paddingRight: 0
        }
      }
    },
    focusedContainer: [
      classNames.focusedContainer,
      {
        clear: 'both',
        display: 'block',
        minWidth: '180px'
      },
      className
    ]
  };
};
