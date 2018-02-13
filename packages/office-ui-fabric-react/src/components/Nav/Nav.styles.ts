import { INavStyleProps, INavStyles } from './Nav.types';
import {
  AnimationClassNames,
  IStyle,
  ITheme,
  getFocusStyle,
  DefaultFontStyles,
  FontSizes,
  FontWeights
} from '../../Styling';
// import { createFontStyles, FontSizes, FontWeights } from '../../../../styling/lib/styles/fonts';
// import { textAreaProperties } from 'src/index.bundle';
// import { fontFace } from '../../../../merge-styles/lib/fontFace';
// import { DefaultFontStyles } from '../../../../styling/lib/styles/DefaultFontStyles';

export const getStyles = (
  props: INavStyleProps
): INavStyles => {
  const {
    className,
    theme,
    isOnTop,
    isExpanded,
    isGroup,
    isLink,
    isSelected,
    isButtonEntry,
    navnodeHeight = 36,
    hasExpandButtonLinkLeftPadding = 28,
    noExpandButtonLinkLeftPadding = 20,
    linkRightPadding = 20
  } = props;

  const { palette, semanticColors } = theme;

  // const navFonts = createFontStyles(null);

  return ({
    root: [
      'ms-Nav',
      className,
      {
        overflowY: 'auto',
        userSelect: 'none',
        // @todo -webkit-overflow-scrolling: touch;
      },
      isOnTop && [
        {
          position: 'absolute'
        },
        AnimationClassNames.slideRightIn40
      ]
    ],
    linkText: [
      'ms-Nav-linkText',
      {
        margin: '0 4px',
        overflow: 'hidden',
        verticalAlign: 'middle',
        textOverflow: 'ellipsis'
      }
    ],
    compositeLink: [
      'ms-Nav-compositeLink',
      {
        display: 'block',
        position: 'relative',
        color: semanticColors.bodyText,
        backgroundColor: semanticColors.bodyBackground,
        selectors: {
          '&:hover': {
            backgroundColor: palette.neutralLighterAlt,
            color: semanticColors.bodyText
          }
        }
      }
    ],
    link: [
      'ms-Nav-link',
      getFocusStyle(theme),
      {
        display: 'block',
        position: 'relative',
        height: `${navnodeHeight}px`,
        width: '100%',
        lineHeight: 'navnodeHeight',
        textDecoration: 'none',
        cursor: 'pointer',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        // selectors: {
        //   '$compositeLink:hover &': {
        //     backgroundColor: palette.neutralLighterAlt,
        //     color: semanticColors.bodyText
        //   },
        // },
      },
      isSelected && {
        color: palette.themePrimary,
        backgroundColor: palette.neutralLighter,
        selectors: {
          '&:after': {
            borderLeft: `2px solid ${palette.themePrimary}`,
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      isButtonEntry && {
        color: palette.themePrimary
      }
    ],
    chevronButton: [
      'ms-Nav-chevronButton',
      getFocusStyle(theme),
      {
        display: 'block',
        fontWeight: FontWeights.regular,
        fontSize: FontSizes.small,
        textAlign: 'left',
        lineHeight: `${navnodeHeight}px`,
        margin: '5px 0',
        padding: `0px, ${linkRightPadding}px, 0px, ${hasExpandButtonLinkLeftPadding}px`,
        border: 'none',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        cursor: 'pointer',
        color: semanticColors.bodyText,
        // backgroundColor: semanticColors.bodyBackground,
        backgroundColor: 'transparent',
        selectors: {
          '&:visited': {
            color: 'inherit'
          },
          // '&:hover': { // not really needed
          //   color: semanticColors.bodyText,
          //   backgroundColor: palette.neutralLighterAlt
          // },
          // '$compositeLink:hover &': { // works
          //   color: semanticColors.bodyText,
          //   backgroundColor: palette.neutralLighterAlt
          // },
        }
      },
      isGroup && [
        {
          width: '100%',
          height: `${navnodeHeight}px`,
          borderBottom: `1px solid ${semanticColors.bodyDivider}`
        },
        DefaultFontStyles.large
      ],
      isLink && [
        {
          display: 'block',
          width: `${hasExpandButtonLinkLeftPadding - 2}px`,
          height: `${navnodeHeight - 2}px`,
          position: 'absolute',
          top: '1px',
          zIndex: 1,
          padding: 0,
          margin: 0
        }
      ],
      isSelected && {
        color: palette.themePrimary,
        backgroundColor: palette.neutralLighterAlt,
        selectors: {
          '&:after': {
            borderLeft: `2px solid ${palette.themePrimary}`,
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      }
    ],
    chevronIcon: [
      'ms-Nav-chevron',
      {
        position: 'absolute',
        left: '8px',
        height: `${navnodeHeight}px`,
        lineHeight: `${navnodeHeight}px`,
        fontSize: '12px',
        transition: 'transform .1s linear',
      },
      isExpanded && {
        transform: 'rotate(-180deg)'
      },
      isLink && {
        top: 0
      }
    ],
    navItem: [
      'ms-Nav-navItem',
      {
        padding: 0
      }
    ],
    navItems: [
      'ms-Nav-navItems',
      {
        listStyleType: 'none',
        padding: 0
      }
    ],
    group: [
      'ms-Nav-group',
      isExpanded && 'is-expanded'
    ],
    groupContent: [
      'ms-Nav-groupContent',
      {
        display: 'none',
        marginBottom: '40px'
      },
      AnimationClassNames.slideDownIn20,
      isExpanded && {
        display: 'block'
      }
    ]
  });
};
