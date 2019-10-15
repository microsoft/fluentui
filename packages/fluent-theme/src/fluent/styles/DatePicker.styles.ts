import { IDatePickerStyleProps, IDatePickerStyles } from 'office-ui-fabric-react/lib/DatePicker';

export const DatePickerStyles = (props: IDatePickerStyleProps): Partial<IDatePickerStyles> => {
  const { theme } = props;
  const { effects } = theme;

  return {
    callout: {
      border: 'none',
      borderRadius: effects.roundedCorner2,
      boxShadow: effects.elevation8,
      selectors: {
        '.ms-Callout-main': { borderRadius: effects.roundedCorner2 }
      }
    }
  };
};
