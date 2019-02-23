import { ICalloutContentStyleProps, ICalloutContentStyles } from 'office-ui-fabric-react/lib/Callout';
import { Depths } from '../FluentDepths';

export const CalloutContentStyles = (props: ICalloutContentStyleProps): Partial<ICalloutContentStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { effects } = theme;

  return {
    root: {
      borderRadius: effects.roundedCorner2,
      borderWidth: 0,
      boxShadow: Depths.depth16
    },
    beakCurtain: {
      borderRadius: effects.roundedCorner2
    },
    calloutMain: {
      borderRadius: effects.roundedCorner2
    }
  };
};
