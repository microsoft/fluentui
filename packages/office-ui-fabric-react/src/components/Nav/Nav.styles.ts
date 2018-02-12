import { INavStyleProps, INavStyles } from './Nav.types';
import {
  AnimationClassNames,
  IStyle,
  ITheme,
} from '../../Styling';
import { createFontStyles, FontSizes, FontWeights } from '../../../../styling/lib/styles/fonts';
import { textAreaProperties } from 'src/index.bundle';
import { fontFace } from '../../../../merge-styles/lib/fontFace';
import { DefaultFontStyles } from '../../../../styling/lib/styles/DefaultFontStyles';

export const getStyles = (
  props: INavStyleProps
): INavStyles => {
  const {
    className,
    theme,
    isOnTop,
    isExpanded,
    // isGroupExpanded,
    // isLinkExpanded,
    isSelected,
    navnodeHeight = '36px',
    hasExpandButtonLinkLeftPadding = '28px',
    noExpandButtonLinkLeftPadding = '20px',
    linkRightPadding = '20px'
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
    link: [
      'ms-Nav-link',
      {
        display: 'block',
        position: 'relative',
        height: navnodeHeight,
        width: '100%',
        lineHeight: 'navnodeHeight',
        textDecoration: 'none',
        cursor: 'pointer',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        selectors: {
          '$compositeLink:hover &': {
            backgroundColor: palette.neutralLighterAlt,
            color: semanticColors.bodyText
          },
          '$compositeLink &': [
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
            }
          ]
        }
      },
      // isLinkExpanded && 'is-expanded' && {
      //   selectors: {
      //     '$chevronIcon': {
      //       transform: 'rotate(-180deg)'
      //     }
      //   }
      // },
      isSelected && 'is-selected'
    ],
    compositeLink: [
      'ms-Nav-compositeLink',
      {
        display: 'block',
        position: 'relative',
        color: semanticColors.bodyText,
        backgroundColor: semanticColors.bodyBackground
      }
    ],
    chevronButton: [
      'ms-Nav-chevronButton',
      {
        display: 'block',
        fontWeight: FontWeights.regular,
        fontSize: FontSizes.small,
        textAlign: 'left',
        lineHeight: navnodeHeight,
        margin: '5px 0',
        padding: `0px, ${linkRightPadding}, 0px, ${hasExpandButtonLinkLeftPadding}`,
        border: 'none',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        cursor: 'pointer',
        color: semanticColors.bodyText,
        backgroundColor: semanticColors.bodyBackground,
        selectors: {
          '&:visited': {
            color: 'inherit'
          },
          '&:hover': {
            color: semanticColors.bodyText,
            backgroundColor: palette.neutralLighterAlt
          },
          '$compositeLink:hover &': {
            color: semanticColors.bodyText,
            backgroundColor: palette.neutralLighterAlt
          },
          '$group &': [
            // fonts.large, //from .groupHeaderFontSize
            {
              width: '100%',
              height: navnodeHeight,
              borderBottom: `1px solid ${semanticColors.bodyDivider}`
            },
            DefaultFontStyles.large
          ],
          '$compositeLink &': [
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
          ]
        }
      }
    ],
    chevronIcon: [
      'ms-Nav-chevron',
      {
        position: 'absolute',
        left: '8px',
        height: navnodeHeight,
        lineHeight: navnodeHeight,
        fontSize: '12px',
        transition: 'transform .1s linear',
      },
      isExpanded && {
        transform: 'rotate(-180deg)'
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
