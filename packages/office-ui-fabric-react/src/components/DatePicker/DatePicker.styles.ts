import { IDatePickerStyleProps, IDatePickerStyles } from './DatePicker.types';
// import { IStyle, ITheme } from '../../Styling';

export const getStyles = (props: IDatePickerStyleProps): IDatePickerStyles => {
  const { className } = props;
  // const { className, theme } = props;

  // const { palette, semanticColors } = theme;

  return {
    root: [
      'ms-DatePicker',
      {
        // Insert css properties
      },
      className
    ]

    // Insert className styles
  };
};
