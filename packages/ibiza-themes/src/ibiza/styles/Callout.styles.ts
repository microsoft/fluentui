import { ICalloutContentStyleProps, ICalloutContentStyles } from 'office-ui-fabric-react/lib/Callout';
import { Depths } from '../IbizaDepths';
import { borderRadius } from './styleConstants';

export const CalloutContentStyles = (props: ICalloutContentStyleProps): Partial<ICalloutContentStyles> => {
  return {
    root: {
      borderRadius: borderRadius,
      borderWidth: 0,
      boxShadow: Depths.depth16
    },
    beakCurtain: {
      borderRadius: borderRadius
    },
    calloutMain: {
      borderRadius: borderRadius
    }
  };
};
