import { ICalloutContentStyleProps, ICalloutContentStyles } from 'office-ui-fabric-react/lib/Callout';
import { Depths } from '../FluentDepths';
import { fluentBorderRadius } from './styleConstants';

export const CalloutContentStyles = (props: ICalloutContentStyleProps): Partial<ICalloutContentStyles> => {
  return {
    root: {
      borderRadius: fluentBorderRadius,
      borderWidth: 0,
      boxShadow: Depths.depth16
    },
    beakCurtain: {
      borderRadius: fluentBorderRadius
    },
    calloutMain: {
      borderRadius: fluentBorderRadius
    }
  };
};
