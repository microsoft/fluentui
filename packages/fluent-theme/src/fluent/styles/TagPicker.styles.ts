import { ITagItemStyleProps, ITagItemStyles } from 'office-ui-fabric-react/lib/Pickers';
import { fluentBorderRadius } from './styleConstants';

export const TagItemStyles = (props: ITagItemStyleProps): Partial<ITagItemStyles> => {
  return {
    root: {
      borderRadius: fluentBorderRadius
    },
    close: {
      background: 'transparent',
      borderRadius: `0 ${fluentBorderRadius} ${fluentBorderRadius} 0`
    }
  };
};
