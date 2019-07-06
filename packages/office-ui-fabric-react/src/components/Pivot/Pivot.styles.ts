import { IPivotStyleProps, IPivotStyles } from './Pivot.types';
import { AnimationVariables, getGlobalClassNames, HighContrastSelector, IStyle, normalize, FontSizes, FontWeights } from '../../Styling';
import { IsFocusVisibleClassName } from '../../Utilities';

const globalClassNames = {
  count: 'ms-Pivot-count',
  icon: 'ms-Pivot-icon',
  linkIsSelected: 'is-selected',
  link: 'ms-Pivot-link',
  linkContent: 'ms-Pivot-linkContent',
  root: 'ms-Pivot',
  rootIsLarge: 'ms-Pivot--large',
  rootIsTabs: 'ms-Pivot--tabs',
  text: 'ms-Pivot-text'
};

const linkStyles = (props: IPivotStyleProps): IStyle[] => {
  const { rootIsLarge, rootIsTabs } = props;
  const { palette, semanticColors } = props.theme;
  return [
    {
      color: semanticColors.actionLink,
      display: 'inline-block',
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.regular,
      lineHeight: 44,
      height: 44,
      marginRight: 8,
      padding: '0 8px',
      textAlign: 'center',
      position: 'relative',
      backgroundColor: 'transparent',
      border: 0,
      borderRadius: 0,
      selectors: {
        ':before': {
          backgroundColor: 'transparent',
          bottom: 0,
          content: '""',
          height: 2,
          left: 8,
          position: 'absolute',
          right: 8,
          transition: `left ${AnimationVariables.durationValue2} ${AnimationVariables.easeFunction2},
                      right ${AnimationVariables.durationValue2} ${AnimationVariables.easeFunction2}`
        },
        ':after': {
          color: 'transparent',
          content: 'attr(data-content)',
          display: 'block',
          fontWeight: FontWeights.bold,
          height: 1,
          overflow: 'hidden',
          visibility: 'hidden'
        },
        ':hover': {
          backgroundColor: palette.neutralLighter,
          color: semanticColors.actionLinkHovered,
          cursor: 'pointer'
        },
        ':active': {
          backgroundColor: palette.neutralLight
        },
        ':focus': {
          outline: 'none'
        },
        [`.${IsFocusVisibleClassName} &:focus`]: {
          outline: `1px solid ${semanticColors.focusBorder}`
        },
        [`.${IsFocusVisibleClassName} &:focus:after`]: {
          content: 'attr(data-content)',
          position: 'relative',
          border: 0
        }
      }
    },
    rootIsLarge && {
      fontSize: FontSizes.large
    },
    rootIsTabs && [
      {
        marginRight: 0,
        height: 44,
        lineHeight: 44,
        backgroundColor: palette.neutralLighter,
        padding: '0 10px',
        verticalAlign: 'top',
        selectors: {
          ':focus': {
            outlineOffset: '-1px'
          },
          [`.${IsFocusVisibleClassName} &:focus::before`]: {
            height: 'auto',
            background: 'transparent',
            transition: 'none'
          }
        }
      }
    ]
  ];
};

export const getStyles = (props: IPivotStyleProps): IPivotStyles => {
  const { className, rootIsLarge, rootIsTabs, theme } = props;
  const { palette, semanticColors } = theme;

  const classNames = getGlobalClassNames(globalClassNames, theme);

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      normalize,
      {
        fontSize: FontSizes.medium,
        fontWeight: FontWeights.regular,
        position: 'relative',
        color: palette.themePrimary,
        whiteSpace: 'nowrap'
      },
      rootIsLarge && classNames.rootIsLarge,
      rootIsTabs && classNames.rootIsTabs,
      className
    ],
    link: [
      classNames.link,
      ...linkStyles(props),
      rootIsTabs && {
        selectors: {
          '&:hover, &:focus': {
            color: palette.black
          },
          '&:active, &:hover': {
            color: palette.white,
            backgroundColor: palette.themePrimary
          }
        }
      }
    ],
    linkIsSelected: [
      classNames.link,
      classNames.linkIsSelected,
      ...linkStyles(props),
      {
        fontWeight: FontWeights.semibold,
        selectors: {
          ':before': {
            backgroundColor: semanticColors.inputBackgroundChecked,
            selectors: {
              [HighContrastSelector]: {
                backgroundColor: 'Highlight'
              }
            }
          },
          ':hover::before': {
            left: 0,
            right: 0
          },
          [HighContrastSelector]: {
            color: 'Highlight'
          }
        }
      },
      rootIsTabs && {
        backgroundColor: palette.themePrimary,
        color: palette.white,
        fontWeight: FontWeights.regular,
        selectors: {
          ':before': {
            backgroundColor: 'transparent',
            transition: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            content: '""',
            height: 'auto'
          },
          ':hover': {
            backgroundColor: palette.themeDarkAlt,
            color: palette.white
          },
          '&:active': {
            backgroundColor: palette.themeDark,
            color: palette.white
          },
          [HighContrastSelector]: {
            fontWeight: FontWeights.semibold,
            color: 'HighlightText',
            background: 'Highlight',
            MsHighContrastAdjust: 'none'
          }
        }
      }
    ],
    linkContent: [classNames.linkContent],
    text: [
      classNames.text,
      {
        display: 'inline-block',
        verticalAlign: 'top'
      }
    ],
    count: [
      classNames.count,
      {
        marginLeft: '4px',
        display: 'inline-block',
        verticalAlign: 'top'
      }
    ],
    icon: [
      classNames.icon,
      {
        selectors: {
          '& + $text': {
            marginLeft: '4px'
          }
        }
      }
    ]
  };
};
