import { ICalloutContentStyleProps, ICalloutContentStyles } from 'office-ui-fabric-react/lib/Callout';

export const CalloutContentStyles = (props: ICalloutContentStyleProps): Partial<ICalloutContentStyles> => {
  const { theme } = props;
  const { effects, palette } = theme;

  return {
    root: {
      border: `1px solid ${palette.neutralLight}`,
      borderRadius: effects.roundedCorner2,
      boxShadow: effects.elevation16
    },
    beakCurtain: {
      borderRadius: effects.roundedCorner2
    },
    calloutMain: {
      borderRadius: effects.roundedCorner2
    }
  };
};
