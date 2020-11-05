import { ICalloutContentStyleProps, ICalloutContentStyles } from 'office-ui-fabric-react/lib/Callout';
import { Depths } from '../AzureDepths';

export const CalloutContentStyles = (props: ICalloutContentStyleProps): Partial<ICalloutContentStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;

  return {
    root: {
      boxShadow: Depths.depth8,
    },
    calloutMain: {
      color: semanticColors.bodyText,
      fontSize: theme.fonts.medium.fontSize,
    },
  };
};
