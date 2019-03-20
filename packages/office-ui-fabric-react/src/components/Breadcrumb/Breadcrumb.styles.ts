import {
  HighContrastSelector,
  IRawStyle,
  ScreenWidthMaxMedium,
  ScreenWidthMaxSmall,
  ScreenWidthMinMedium,
  getFocusStyle,
  getScreenSelector,
  getGlobalClassNames,
  FontWeights
} from '../../Styling';
import { IBreadcrumbStyleProps, IBreadcrumbStyles } from './Breadcrumb.types';
import { IsFocusVisibleClassName } from '../../Utilities';

const GlobalClassNames = {
  root: 'ms-Breadcrumb',
  list: 'ms-Breadcrumb-list',
  listItem: 'ms-Breadcrumb-listItem',
  chevron: 'ms-Breadcrumb-chevron',
  overflow: 'ms-Breadcrumb-overflow',
  overflowButton: 'ms-Breadcrumb-overflowButton',
  itemLink: 'ms-Breadcrumb-itemLink',
  item: 'ms-Breadcrumb-item'
};

const SingleLineTextStyle: IRawStyle = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden'
};

const overflowButtonFontSize = 16;
const chevronSmallFontSize = 8;
const itemLineHeight = 36;
const itemFontSize = 18;

const MinimumScreenSelector = getScreenSelector(0, ScreenWidthMaxSmall);
const MediumScreenSelector = getScreenSelector(ScreenWidthMinMedium, ScreenWidthMaxMedium);

export const getStyles = (props: IBreadcrumbStyleProps): IBreadcrumbStyles => {
  const { className, theme } = props;
  const { palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const lastChildItemStyles: IRawStyle = {
    fontWeight: FontWeights.semibold,
    color: palette.neutralPrimary
  };

  const itemStateSelectors = {
    ':hover': {
      color: palette.neutralPrimary,
      backgroundColor: theme.semanticColors.menuItemBackgroundHovered,
      cursor: 'pointer',
      selectors: {
        [HighContrastSelector]: {
          color: 'Highlight'
        }
      }
    },
    ':active': {
      backgroundColor: palette.neutralLight,
      color: theme.palette.neutralPrimary
    },
    '&:active:hover': {
      color: palette.neutralPrimary,
      backgroundColor: palette.neutralLight
    },
    '&:active, &:hover, &:active:hover': {
      textDecoration: 'none'
    }
  };

  const commonItemStyles: IRawStyle = {
    color: palette.neutralSecondary,
    padding: '0 8px',
    lineHeight: itemLineHeight,
    fontSize: itemFontSize,
    fontWeight: FontWeights.regular
  };

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        margin: '11px 0 1px'
      },
      className
    ],

    list: [
      classNames.list,
      {
        whiteSpace: 'nowrap',
        padding: 0,
        margin: 0,
        display: 'flex',
        alignItems: 'stretch'
      }
    ],

    listItem: [
      classNames.listItem,
      {
        listStyleType: 'none',
        margin: '0',
        padding: '0',
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        selectors: {
          '&:last-child .ms-Breadcrumb-itemLink': lastChildItemStyles,
          '&:last-child .ms-Breadcrumb-item': lastChildItemStyles
        }
      }
    ],

    chevron: [
      classNames.chevron,
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
      classNames.overflow,
      {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }
    ],

    overflowButton: [
      classNames.overflowButton,
      getFocusStyle(theme),
      SingleLineTextStyle,
      {
        fontSize: overflowButtonFontSize,
        color: palette.neutralSecondary,
        height: '100%',
        cursor: 'pointer',
        selectors: {
          ...itemStateSelectors,
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
      classNames.itemLink,
      getFocusStyle(theme),
      SingleLineTextStyle,
      {
        ...commonItemStyles,
        selectors: {
          ':focus': {
            color: theme.palette.neutralSecondary
          },
          [`.${IsFocusVisibleClassName} &:focus`]: {
            outline: `none`
          },
          ...itemStateSelectors
        }
      }
    ],

    item: [
      classNames.item,
      {
        ...commonItemStyles,
        selectors: {
          ':hover': {
            cursor: 'default'
          }
        }
      }
    ]
  };
};
