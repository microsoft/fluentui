import { ICalloutContentStyleProps, ICalloutContentStyles } from '@fluentui/react/lib/Callout';
import { Depths } from '../AzureDepths';
import * as StyleConstants from '../Constants';

export const CalloutContentStyles = (props: ICalloutContentStyleProps): Partial<ICalloutContentStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;

  return {
    root: {
      borderColor: semanticColors.inputBorder,
      borderStyle: StyleConstants.borderSolid,
      borderWidth: StyleConstants.borderWidth,
      boxShadow: Depths.depth8,
    },
    calloutMain: {
      color: semanticColors.bodyText,
      fontSize: theme.fonts.medium.fontSize,
    },
  };
};
