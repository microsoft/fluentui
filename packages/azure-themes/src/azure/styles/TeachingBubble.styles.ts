import { ITeachingBubbleStyleProps, ITeachingBubbleStyles } from 'office-ui-fabric-react/lib/TeachingBubble';
import { Depths } from '../AzureDepths';
import { FontSizes } from '../AzureType';
import * as StyleConstants from '../Constants';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const TeachingBubbleStyles = (props: ITeachingBubbleStyleProps): Partial<ITeachingBubbleStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    bodyContent: {
      color: extendedSemanticColors.teachingBubbleText,
      border: `1px solid ${extendedSemanticColors.teachingBubbleBackground}`,
      selectors: {
        '.ms-TeachingBubble-subText': {
          fontSize: FontSizes.size14,
        },
      },
    },
    footer: {
      color: extendedSemanticColors.teachingBubbleText,
      selectors: {
        '.ms-Button-label': {
          lineHeight: 22,
        },
      },
    },
    header: {
      color: extendedSemanticColors.teachingBubbleText,
    },
    headline: {
      color: extendedSemanticColors.teachingBubbleText,
    },
    content: {
      backgroundColor: extendedSemanticColors.teachingBubbleBackground,
      color: extendedSemanticColors.teachingBubbleText,
      selectors: {
        '.ms-TeachingBubble-header--small': {
          fontSize: FontSizes.size14,
        },
        '.ms-TeachingBubble-header--condensed': {
          fontSize: FontSizes.size14,
        },
      },
    },
    subText: {
      color: extendedSemanticColors.teachingBubbleText,
    },
    subComponentStyles: {
      callout: {
        root: {
          borderColor: semanticColors.inputBorder,
          borderStyle: StyleConstants.borderSolid,
          borderWidth: StyleConstants.borderWidth,
          boxShadow: Depths.depth8,
          selectors: {
            '.ms-Callout-beak': {
              backgroundColor: extendedSemanticColors.teachingBubbleBackground,
            },
          },
        },
      },
    },
    closeButton: {
      color: extendedSemanticColors.teachingBubbleText,
      margin: 1,
      selectors: {
        '&:hover': {
          backgroundColor: `${extendedSemanticColors.primaryButtonBackgroundPressed} !important`,
        },
        '&:active': {
          backgroundColor: extendedSemanticColors.primaryButtonBackgroundPressed,
        },
      },
    },
    primaryButton: {
      backgroundColor: extendedSemanticColors.teachingBubbleSecondaryBackground,
      selectors: {
        '&:focus': {
          backgroundColor: extendedSemanticColors.teachingBubblePrimaryButtonHover,
          color: extendedSemanticColors.primaryButtonBackground,
        },
        '&:hover': {
          backgroundColor: extendedSemanticColors.teachingBubblePrimaryButtonHover,
          borderColor: extendedSemanticColors.teachingBubblePrimaryButtonHover,
        },
        span: {
          color: extendedSemanticColors.teachingBubbleBackground,
        },
        '.ms-Button-label': {
          fontSize: theme.fonts.medium.fontSize,
        },
      },
    },
    secondaryButton: {
      backgroundColor: extendedSemanticColors.teachingBubbleBackground,
      selectors: {
        '.ms-Button-label': {
          fontSize: theme.fonts.medium.fontSize,
        },
        '&:hover': {
          backgroundColor: extendedSemanticColors.primaryButtonBackgroundPressed,
        },
        '&:focus': {
          backgroundColor: extendedSemanticColors.primaryButtonBackgroundPressed,
        },
      },
    },
  };
};
