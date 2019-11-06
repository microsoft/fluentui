import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { ITeachingBubbleStyleProps, ITeachingBubbleStyles } from 'office-ui-fabric-react/lib/TeachingBubble';

export const TeachingBubbleStyles = (props: ITeachingBubbleStyleProps): Partial<ITeachingBubbleStyles> => {
  const { hasCondensedHeadline, hasSmallHeadline, theme } = props;
  const { palette, fonts } = theme;

  let headlineSize = fonts.medium.fontSize;
  let headlineWeight = FontWeights.semibold;
  if (!hasCondensedHeadline && !hasSmallHeadline) {
    headlineSize = fonts.xxLarge.fontSize;
    headlineWeight = FontWeights.light;
  }

  return {
    headline: {
      fontSize: headlineSize,
      fontWeight: headlineWeight
    },
    footer: {
      selectors: {
        '.ms-Button:not(:first-child)': {
          marginLeft: 20
        }
      }
    },
    closeButton: {
      backgroundColor: 'transparent',
      selectors: {
        '&:hover': {
          backgroundColor: palette.themePrimary,
          color: palette.black
        },
        '&:active': {
          background: palette.themeDarkAlt,
          color: palette.black
        }
      }
    }
  };
};
