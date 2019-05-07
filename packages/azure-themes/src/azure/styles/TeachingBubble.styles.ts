import { ITeachingBubbleStyleProps, ITeachingBubbleStyles } from 'office-ui-fabric-react/lib/TeachingBubble';
import { BaseColors } from '../AzureColors';
import { Depths } from '../AzureDepths';
import * as StyleConstants from '../Constants';

export const TeachingBubbleStyles = (props: ITeachingBubbleStyleProps): Partial<ITeachingBubbleStyles> => {
  const { theme } = props;
  const { palette, semanticColors } = theme;

  return {
    bodyContent: {
      color: semanticColors.bodyText,
      border: `1px solid ${palette.themePrimary}`
    },
    footer: {
      color: semanticColors.bodyText
    },
    header: {
      color: semanticColors.bodyText
    },
    headline: {
      color: semanticColors.bodyText
    },
    content: {
      backgroundColor: semanticColors.bodyBackground,
      color: semanticColors.bodyText
    },
    subText: {
      color: semanticColors.bodyText
    },
    subComponentStyles: {
      callout: {
        root: {
          borderColor: semanticColors.inputBorder,
          borderStyle: StyleConstants.borderSolid,
          borderWidth: StyleConstants.borderWidth,
          boxShadow: Depths.depth8
        }
      }
    },
    closeButton: {
      color: semanticColors.bodyText,
      margin: 1,
      selectors: {
        '&:hover': {
          backgroundColor: BaseColors.RED_E00B1C, // always this color regardless of theme.
          color: BaseColors.WHITE
        },
        '&:active': {
          backgroundColor: BaseColors.RED_E00B1C, // always this color regardless of theme.
          color: BaseColors.WHITE
        }
      }
    }
  };
};
