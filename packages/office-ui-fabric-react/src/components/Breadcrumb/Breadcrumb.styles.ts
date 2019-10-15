import {
  HighContrastSelector,
  IRawStyle,
  ScreenWidthMaxMedium,
  ScreenWidthMaxSmall,
  ScreenWidthMinMedium,
  getFocusStyle,
  getScreenSelector
} from '../../Styling';
import { IBreadcrumbStyleProps, IBreadcrumbStyles } from './Breadcrumb.types';
import { IsFocusVisibleClassName } from '../../Utilities';

const SingleLineTextStyle: IRawStyle = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden'
};

const MinimumScreenSelector = getScreenSelector(0, ScreenWidthMaxSmall);
const MediumScreenSelector = getScreenSelector(ScreenWidthMinMedium, ScreenWidthMaxMedium);

export const getStyles = (props: IBreadcrumbStyleProps): IBreadcrumbStyles => {
  const { className, theme } = props;

  const overflowButtonFontSize = 16;
  const chevronSmallFontSize = 8;

  return {
    root: [
      'ms-Breadcrumb',
      theme.fonts.medium,
      {
        margin: '23px 0 1px'
      },
      className
    ],

    list: [
      'ms-Breadcrumb-list',
      {
        whiteSpace: 'nowrap',
        padding: 0,
        margin: 0,
        display: 'flex',
        alignItems: 'stretch'
      }
    ],

    listItem: [
      'ms-Breadcrumb-listItem',
      {
        listStyleType: 'none',
        margin: '0',
        padding: '0',
        display: 'flex',
        position: 'relative',
        alignItems: 'center'
      }
    ],

    chevron: [
      'ms-Breadcrumb-chevron',
      {
        color: theme.palette.neutralSecondary,
        fontSize: theme.fonts.small.fontSize,
        selectors: {
          [HighContrastSelector]: {
            color: 'WindowText',
            MsHighContrastAdjust: 'none'
          },
          [MediumScreenSelector]: {
            fontSize: chevronSmallFontSize
          },
          [MinimumScreenSelector]: {
            fontSize: chevronSmallFontSize
          }
        }
      }
    ],

    overflow: [
      'ms-Breadcrumb-overflow',
      {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }
    ],

    overflowButton: [
      'ms-Breadcrumb-overflowButton',
      getFocusStyle(theme),
      SingleLineTextStyle,
      {
        fontSize: overflowButtonFontSize,
        height: '100%',
        cursor: 'pointer',
        selectors: {
          ':hover': {
            backgroundColor: theme.palette.neutralLighter
          },
          ':active': {
            backgroundColor: theme.palette.neutralTertiaryAlt,
            color: theme.semanticColors.bodyText
          },
          ':hover:active': {
            // This seems unnecessary.
            backgroundColor: theme.palette.neutralQuaternary
          },
          [MinimumScreenSelector]: {
            padding: '4px 6px'
          },
          [MediumScreenSelector]: {
            fontSize: theme.fonts.mediumPlus.fontSize
          }
        }
      }
    ],

    itemLink: [
      'ms-Breadcrumb-itemLink',
      getFocusStyle(theme),
      SingleLineTextStyle,
      theme.fonts.xLarge,
      {
        textDecoration: 'none',
        color: theme.semanticColors.bodyText,
        padding: '0 8px',

        selectors: {
          ':hover': {
            backgroundColor: theme.semanticColors.menuItemBackgroundHovered,
            color: 'initial',
            cursor: 'pointer',
            selectors: {
              [HighContrastSelector]: {
                color: 'Highlight'
              }
            }
          },
          ':focus': {
            color: theme.palette.neutralDark
          },
          ':active': {
            backgroundColor: theme.palette.neutralTertiaryAlt,
            color: theme.palette.neutralPrimary
          },
          [MediumScreenSelector]: theme.fonts.large,
          [MinimumScreenSelector]: [theme.fonts.medium],
          [`.${IsFocusVisibleClassName} &:focus`]: {
            outline: `none`
          }
        }
      }
    ],
    item: [
      'ms-Breadcrumb-item',
      theme.fonts.xLarge,
      {
        color: theme.semanticColors.bodyText,
        padding: '0 8px',

        selectors: {
          ':hover': {
            cursor: 'default'
          }
        }
      }
    ]
  };
};
