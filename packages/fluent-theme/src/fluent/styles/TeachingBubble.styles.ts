import { Depths } from '../FluentDepths';
import { FontSizes } from '../FluentType';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { ITeachingBubbleStyleProps, ITeachingBubbleStyles } from 'office-ui-fabric-react/lib/TeachingBubble';

export const TeachingBubbleStyles = (props: ITeachingBubbleStyleProps): Partial<ITeachingBubbleStyles> => {
  return {
    subComponentStyles: {
      callout: {
        root: {
          boxShadow: Depths.depth16
        }
      }
    }
  };
};

export const TeachingBubbleContentStyles = (props: ITeachingBubbleStyleProps): Partial<ITeachingBubbleStyles> => {
  const { hasCondensedHeadline, hasSmallHeadline, theme } = props;
  const { palette } = theme;

  let headlineSize = FontSizes.size14;
  if (!hasCondensedHeadline && !hasSmallHeadline) {
    headlineSize = FontSizes.size20;
  }

  return {
    headline: {
      fontSize: headlineSize,
      fontWeight: FontWeights.semibold
    },
    footer: {
      selectors: {
        '.ms-Button:not(:first-child)': {
          marginLeft: '16px'
        }
      }
    },
    closeButton: {
      backgroundColor: 'transparent',
      selectors: {
        '&:hover': {
          color: palette.black
        }
      }
    }
  };
};
