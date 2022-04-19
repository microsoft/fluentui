import { ITooltipStyles, ITooltipStyleProps } from '@fluentui/react/lib/Tooltip';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import * as StyleConstants from '../Constants';

export const TooltipStyles = (props: ITooltipStyleProps): Partial<ITooltipStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;
  return {
    root: {
      maxWidth: '480px',
      padding: 0,
    },
    content: {
      backgroundColor: extendedSemanticColors.controlBackground,
      padding: StyleConstants.inputControlPadding,
    },
  };
};
