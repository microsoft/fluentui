import { IStyle } from '@uifabric/styling';

interface IDatePickerExampleStyles {
  msDatePicker?: IStyle;
  msDropdown?: IStyle;
}

const datePickerExampleStyles: IDatePickerExampleStyles = {
  msDatePicker: {
    margin: '0 0 15px 0',
    maxWidth: '300px'
  },
  msDropdown: {
    margin: '0 0 15px 0',
    maxWidth: '300px'
  }
};

export { datePickerExampleStyles, IDatePickerExampleStyles };
