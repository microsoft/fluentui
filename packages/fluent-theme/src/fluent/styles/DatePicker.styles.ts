import { IDatePickerStyleProps, IDatePickerStyles } from 'office-ui-fabric-react/lib/DatePicker';
import { fluentBorderRadius } from './styleConstants';
import { Depths } from '../FluentDepths';

export const DatePickerStyles = (props: IDatePickerStyleProps): Partial<IDatePickerStyles> => {
  return {
    callout: {
      border: 'none',
      borderRadius: fluentBorderRadius,
      boxShadow: Depths.depth8,
      selectors: {
        '.ms-Callout-main': { borderRadius: fluentBorderRadius }
      }
    }
  };
};
