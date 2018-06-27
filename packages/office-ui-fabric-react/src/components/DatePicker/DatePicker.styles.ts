import { IDatePickerStyleProps, IDatePickerStyles } from './DatePicker.types';

export const getStyles = (props: IDatePickerStyleProps): IDatePickerStyles => {
  const { className } = props;

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
