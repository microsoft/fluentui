import { INavStyleProps, INavStyles } from './Nav.types';
import { IButtonStyles } from '../../Button';
import {
  AnimationClassNames,
  DefaultFontStyles,
  getFocusStyle,
  FontSizes,
  FontWeights,
  globalClassNamesWhenEnabled
} from '../../Styling';

export const buttonStyles: IButtonStyles = {
  textContainer: {
    overflow: 'hidden',
  },
  label: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    lineHeight: '36px'
  }
};

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
    navHeight = 36,
    position,
    leftPadding = 20,
    leftPaddingExpanded = 28,
    rightPadding = 20
  } = props;

  const { palette, semanticColors } = theme;

  return ({
    root: [
      globalClassNamesWhenEnabled(theme, ['ms-Nav']),
      className,
      {
        overflowY: 'auto',
        userSelect: 'none',
        WebkitOverflowScrolling: 'touch'
      },
      isOnTop && [
        {
          position: 'absolute'
        },
        AnimationClassNames.slideRightIn40
      ]
    ],
    linkText: [
      globalClassNamesWhenEnabled(theme, ['ms-Nav-linkText']),
      {
        margin: '0 4px',
        overflow: 'hidden',
        verticalAlign: 'middle',
        textOverflow: 'ellipsis'
      }
    ],
    compositeLink: [
      globalClassNamesWhenEnabled(theme, ['ms-Nav-compositeLink']),
      {
        display: 'block',
        position: 'relative',
        color: semanticColors.bodyText,
        backgroundColor: semanticColors.bodyBackground,
      },
      isExpanded && 'is-expanded',
      isSelected && 'is-selected'
    ],
    link: [
      globalClassNamesWhenEnabled(theme, ['ms-Nav-link']),
      getFocusStyle(theme),
      {
        display: 'block',
        position: 'relative',
        height: `${navHeight}px`,
        width: '100%',
        lineHeight: `${navHeight}px`,
        textDecoration: 'none',
        cursor: 'pointer',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        paddingLeft: leftPadding,
        paddingRight: rightPadding,
        selectors: {
          '.ms-Nav-compositeLink:hover &': {
            backgroundColor: palette.neutralLighterAlt,
            color: semanticColors.bodyText
          },
        },
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
      globalClassNamesWhenEnabled(theme, ['ms-Nav-chevronButton']),
      getFocusStyle(theme),
      {
        display: 'block',
        fontWeight: FontWeights.regular,
        fontSize: FontSizes.small,
        textAlign: 'left',
        lineHeight: `${navHeight}px`,
        margin: '5px 0',
        padding: `0px, ${rightPadding}px, 0px, ${leftPaddingExpanded}px`,
        border: 'none',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        cursor: 'pointer',
        color: semanticColors.bodyText,
        backgroundColor: 'transparent',
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
        }
      },
      isGroup && [
        {
          width: '100%',
          height: `${navHeight}px`,
          borderBottom: `1px solid ${semanticColors.bodyDivider}`
        },
        DefaultFontStyles.large
      ],
      isLink && [
        {
          display: 'block',
          width: `${leftPaddingExpanded - 2}px`,
          height: `${navHeight - 2}px`,
          position: 'absolute',
          top: '1px',
          left: `${position}px`,
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
      globalClassNamesWhenEnabled(theme, ['ms-Nav-chevron']),
      {
        position: 'absolute',
        left: '8px',
        height: `${navHeight}px`,
        lineHeight: `${navHeight}px`,
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
      globalClassNamesWhenEnabled(theme, ['ms-Nav-navItem']),
      {
        padding: 0
      }
    ],
    navItems: [
      globalClassNamesWhenEnabled(theme, ['ms-Nav-navItems']),
      {
        listStyleType: 'none',
        padding: 0
      }
    ],
    group: [
      globalClassNamesWhenEnabled(theme, ['ms-Nav-group']),
      isExpanded && 'is-expanded'
    ],
    groupContent: [
      globalClassNamesWhenEnabled(theme, ['ms-Nav-groupContent']),
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
