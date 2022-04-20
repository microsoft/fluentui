import {
  AnimationClassNames,
  getFocusStyle,
  ZIndexes,
  getGlobalClassNames,
  HighContrastSelector,
  FontWeights,
} from '../../Styling';
import type { INavStyleProps, INavStyles } from './Nav.types';
import type { IButtonStyles } from '../../Button';

const GlobalClassNames = {
  root: 'ms-Nav',
  linkText: 'ms-Nav-linkText',
  compositeLink: 'ms-Nav-compositeLink',
  link: 'ms-Nav-link',
  chevronButton: 'ms-Nav-chevronButton',
  chevronIcon: 'ms-Nav-chevron',
  navItem: 'ms-Nav-navItem',
  navItems: 'ms-Nav-navItems',
  group: 'ms-Nav-group',
  groupContent: 'ms-Nav-groupContent',
};

export const buttonStyles: IButtonStyles = {
  textContainer: {
    overflow: 'hidden',
  },
  label: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
};

export const getStyles = (props: INavStyleProps): INavStyles => {
  const {
    className,
    theme,
    isOnTop,
    isExpanded,
    isGroup,
    isLink,
    isSelected,
    isDisabled,
    isButtonEntry,
    navHeight = 44,
    position,
    leftPadding = 20,
    leftPaddingExpanded = 28,
    rightPadding = 20,
  } = props;

  const { palette, semanticColors, fonts } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      className,
      fonts.medium,
      {
        overflowY: 'auto',
        userSelect: 'none',
        WebkitOverflowScrolling: 'touch',
      },
      isOnTop && [
        {
          position: 'absolute',
        },
        AnimationClassNames.slideRightIn40,
      ],
    ],
    linkText: [
      classNames.linkText,
      {
        margin: '0 4px',
        overflow: 'hidden',
        verticalAlign: 'middle',
        textAlign: 'left',
        textOverflow: 'ellipsis',
      },
    ],
    compositeLink: [
      classNames.compositeLink,
      {
        display: 'block',
        position: 'relative',
        color: semanticColors.bodyText,
      },
      isExpanded && 'is-expanded',
      isSelected && 'is-selected',
      isDisabled && 'is-disabled',
      isDisabled && {
        color: semanticColors.disabledText,
      },
    ],
    link: [
      classNames.link,
      getFocusStyle(theme),
      {
        display: 'block',
        position: 'relative',
        height: navHeight,
        width: '100%',
        lineHeight: `${navHeight}px`,
        textDecoration: 'none',
        cursor: 'pointer',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        paddingLeft: leftPadding,
        paddingRight: rightPadding,
        color: semanticColors.bodyText,
        selectors: {
          [HighContrastSelector]: {
            border: 0,
            selectors: {
              ':focus': {
                border: '1px solid WindowText',
              },
            },
          },
        },
      },
      !isDisabled && {
        selectors: {
          '.ms-Nav-compositeLink:hover &': {
            backgroundColor: semanticColors.bodyBackgroundHovered,
          },
        },
      },
      isSelected && {
        color: semanticColors.bodyTextChecked,
        fontWeight: FontWeights.semibold, // todo: get from theme
        backgroundColor: semanticColors.bodyBackgroundChecked,
        selectors: {
          '&:after': {
            borderLeft: `2px solid ${palette.themePrimary}`,
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            pointerEvents: 'none',
          },
        },
      },
      isDisabled && {
        color: semanticColors.disabledText,
      },
      isButtonEntry && {
        color: palette.themePrimary,
      },
    ],
    chevronButton: [
      classNames.chevronButton,
      getFocusStyle(theme),
      fonts.small,
      {
        display: 'block',
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
            color: semanticColors.bodyText,
          },
        },
      },
      isGroup && {
        fontSize: fonts.large.fontSize,
        width: '100%',
        height: navHeight,
        borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      },
      isLink && {
        display: 'block',
        width: leftPaddingExpanded - 2,
        height: navHeight - 2,
        position: 'absolute',
        top: '1px',
        left: `${position}px`,
        zIndex: ZIndexes.Nav,
        padding: 0,
        margin: 0,
      },
    ],
    chevronIcon: [
      classNames.chevronIcon,
      {
        position: 'absolute',
        left: '8px',
        height: navHeight,
        // inline-flex prevents the chevron from shifting with custom line height styles
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: `${navHeight}px`,
        fontSize: fonts.small.fontSize,
        transition: 'transform .1s linear',
      },
      isExpanded && {
        transform: 'rotate(-180deg)',
      },
      isLink && {
        top: 0,
      },
    ],
    navItem: [
      classNames.navItem,
      {
        padding: 0,
      },
    ],
    navItems: [
      classNames.navItems,
      {
        listStyleType: 'none',
        padding: 0,
        margin: 0, // remove default <UL> styles
      },
    ],
    group: [classNames.group, isExpanded && 'is-expanded'],
    groupContent: [
      classNames.groupContent,
      {
        display: 'none',
        marginBottom: '40px',
      },
      AnimationClassNames.slideDownIn20,
      isExpanded && {
        display: 'block',
      },
    ],
  };
};
