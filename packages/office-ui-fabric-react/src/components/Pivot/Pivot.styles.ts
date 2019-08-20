import { IPivotStyleProps, IPivotStyles } from './Pivot.types';
import { AnimationVariables, getGlobalClassNames, HighContrastSelector, IStyle, normalize, FontWeights } from '../../Styling';
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
  const { semanticColors, fonts } = props.theme;
  return [
    fonts.medium,
    {
      color: semanticColors.actionLink,
      display: 'inline-block',
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
          backgroundColor: semanticColors.buttonBackgroundHovered,
          color: semanticColors.buttonTextHovered,
          cursor: 'pointer'
        },
        ':active': {
          backgroundColor: semanticColors.buttonBackgroundPressed,
          color: semanticColors.buttonTextHovered
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
      fontSize: fonts.large.fontSize
    },
    rootIsTabs && [
      {
        marginRight: 0,
        height: 44,
        lineHeight: 44,
        backgroundColor: semanticColors.buttonBackground,
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
  const { semanticColors, fonts } = theme;

  const classNames = getGlobalClassNames(globalClassNames, theme);

  return {
    root: [
      classNames.root,
      fonts.medium,
      normalize,
      {
        position: 'relative',
        color: semanticColors.link,
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
            color: semanticColors.buttonTextCheckedHovered
          },
          '&:active, &:hover': {
            color: semanticColors.primaryButtonText,
            backgroundColor: semanticColors.primaryButtonBackground
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
        backgroundColor: semanticColors.primaryButtonBackground,
        color: semanticColors.primaryButtonText,
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
            backgroundColor: semanticColors.primaryButtonBackgroundHovered,
            color: semanticColors.primaryButtonText
          },
          '&:active': {
            backgroundColor: semanticColors.primaryButtonBackgroundPressed,
            color: semanticColors.primaryButtonText
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
    linkContent: [
      classNames.linkContent,
      {
        flex: '0 1 100%',
        selectors: {
          '& > * ': {
            marginLeft: 4
          },
          '& > *:first-child': {
            marginLeft: 0
          }
        }
      }
    ],
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
        display: 'inline-block',
        verticalAlign: 'top'
      }
    ],
    icon: classNames.icon
  };
};
