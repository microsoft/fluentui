import { ICalloutContentStyleProps, ICalloutContentStyles } from '@fluentui/react/lib/Callout';
import { Depths } from '../AzureDepths';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const CalloutContentStyles = (props: ICalloutContentStyleProps): Partial<ICalloutContentStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: {
      boxShadow: Depths.depth8,
    },
    calloutMain: {
      color: semanticColors.bodyText,
      fontSize: theme.fonts.medium.fontSize,
      backgroundColor: extendedSemanticColors.controlBackground,
      border: `${extendedSemanticColors.choiceGroupContainerBorder}
      ${extendedSemanticColors.callOutBorderStyle}
      ${extendedSemanticColors.primaryButtonBorder}`,
    },
    beak: {
      backgroundColor: extendedSemanticColors.controlBackground,
      border: `${extendedSemanticColors.choiceGroupContainerBorder}
      ${extendedSemanticColors.callOutBorderStyle}
      ${extendedSemanticColors.primaryButtonBorder}`,
    },
  };
};
