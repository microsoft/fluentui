import { IDatePickerStyleProps, IDatePickerStyles } from 'office-ui-fabric-react/lib/DatePicker';
import { borderRadius } from './styleConstants';
import { Depths } from '../IbizaDepths';

export const DatePickerStyles = (props: IDatePickerStyleProps): Partial<IDatePickerStyles> => {
  return {
    callout: {
      border: 'none',
      borderRadius: borderRadius,
      boxShadow: Depths.depth8,
      selectors: {
        '.ms-Callout-main': { borderRadius: borderRadius }
      }
    }
  };
};
