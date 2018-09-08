import { IPivotStyleProps, IPivotStyles } from './Pivot.types';
import {
  AnimationVariables,
  getFocusStyle,
  getGlobalClassNames,
  HighContrastSelector,
  IStyle,
  normalize,
  FontSizes,
  FontWeights
} from '../../Styling';
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
  const { rootIsLarge, rootIsTabs, theme } = props;
  const { palette } = props.theme;
  return [
    {
      color: palette.neutralPrimary,
      display: 'inline-block',
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.regular,
      lineHeight: '40px',
      marginRight: '8px',
      padding: '0 8px',
      textAlign: 'center',
      position: 'relative',
      backgroundColor: 'transparent',
      border: 0,
      selectors: {
        ':before': {
          backgroundColor: 'transparent',
          bottom: 0,
          content: '""',
          height: '2px',
          left: '8px',
          position: 'absolute',
          right: '8px',
          transition: `background-color ${AnimationVariables.durationValue2} ${AnimationVariables.easeFunction2}`
        },
        ':after': {
          color: 'transparent',
          content: 'attr(title)',
          display: 'block',
          fontWeight: FontWeights.bold,
          height: '1px',
          overflow: 'hidden',
          visibility: 'hidden'
        },
        ':hover': {
          color: palette.neutralPrimary,
          cursor: 'pointer'
        },
        ':focus': {
          outline: 'none'
        },
        [`.${IsFocusVisibleClassName} &:focus`]: {
          outline: `1px solid ${palette.neutralSecondaryAlt}`
        }
      }
    },
    rootIsLarge && {
      fontSize: FontSizes.large
    },
    rootIsTabs && [
      getFocusStyle(theme),
      {
        marginRight: 0,
        height: '40px',
        lineHeight: '40px',
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
  const { palette } = theme;

  const classNames = getGlobalClassNames(globalClassNames, theme);

  return {
    root: [
      classNames.root,
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
      {
        selectors: {
          ':hover::before': {
            boxSizing: 'border-box',
            borderBottom: '2px solid transparent'
          }
        }
      },
      rootIsTabs && {
        selectors: {
          '&:hover, &:focus': {
            color: palette.black
          },
          ':active': {
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
            boxSizing: 'border-box',
            borderBottom: `2px solid ${palette.themePrimary}`,
            selectors: {
              [HighContrastSelector]: {
                borderBottomColor: 'Highlight'
              }
            }
          },
          [HighContrastSelector]: {
            color: 'Highlight'
          }
        }
      },
      rootIsTabs && {
        backgroundColor: palette.themePrimary,
        color: palette.white,
        fontWeight: FontWeights.semilight,
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
          '&:active, &:hover': {
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
