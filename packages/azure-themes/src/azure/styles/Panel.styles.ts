import { IPanelStyles, IPanelStyleProps } from '@fluentui/react';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import { BaseColors } from '../AzureColors';

export const PanelStyles = (props: IPanelStyleProps): Partial<IPanelStyles> => {
  const { theme } = props;
  const semanticColors = theme.semanticColors as IExtendedSemanticColors;
  return {
    main: {
      backgroundColor: semanticColors.bodyBackground,
      selectors: {
        '&.ms-Panel-main': {
          border: 'none',
        },
      },
    },
    closeButton: {
      color: semanticColors.bodyText,
      selectors: {
        '&:hover': {
          backgroundColor: BaseColors.RED_E00B1C, // always this color regardless of theme.
          color: BaseColors.WHITE,
        },
        '&:active': {
          backgroundColor: BaseColors.RED_E00B1C, // always this color regardless of theme.
          color: BaseColors.WHITE,
        },
      },
    },
    content: {
      color: semanticColors.bodyText,
    },
    headerText: {
      color: semanticColors.bodyText,
    },
  };
};
