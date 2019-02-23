import { IDatePickerStyleProps, IDatePickerStyles } from 'office-ui-fabric-react/lib/DatePicker';
import { Depths } from '../FluentDepths';

export const DatePickerStyles = (props: IDatePickerStyleProps): Partial<IDatePickerStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { effects } = theme;

  return {
    callout: {
      border: 'none',
      borderRadius: effects.roundedCorner2,
      boxShadow: Depths.depth8,
      selectors: {
        '.ms-Callout-main': { borderRadius: effects.roundedCorner2 }
      }
    }
  };
};
