import { IBasePickerStyleProps, IBasePickerStyles } from 'office-ui-fabric-react/lib/Pickers';
import { fluentBorderRadius } from './styleConstants';

export const BasePickerStyles = (props: IBasePickerStyleProps): Partial<IBasePickerStyles> => {
  return {
    text: {
      borderRadius: fluentBorderRadius
    },
    input: {
      borderRadius: fluentBorderRadius
    }
  };
};
