import {
  DefaultFontStyles,
  FontSizes,
  HighContrastSelector,
  IStyle,
  ITheme,
  ScreenWidthMaxMedium,
  ScreenWidthMaxSmall,
  mergeStyleSets
} from '../../Styling';
import { memoizeFunction } from '../../Utilities';
import { IBreadcrumbClassNames } from './Breadcrumb.Props';

export const getClassNames = memoizeFunction((
  theme: ITheme,
  className: string
): IBreadcrumbClassNames => {
  const { palette } = theme;

  // Sizing values.
  const overflowButtonColor = palette.themePrimary;
  const overflowButtonSize = 16;
  const buttonHoverColor = palette.themeDark;
  const itemMaxWidthSmall = 116;
  const chevronSmall = 8;

  // Colors used by the crumb.
  const crumbHoverBackground = palette.neutralLighter;
  const crumbHoverForeground = palette.neutralPrimary;
  const crumbActiveBackground = palette.neutralTertiaryAlt;
  const crumbActiveForeground = palette.neutralPrimary;

  const MediumMediaQuery = `@media screen and (max-width: ${ScreenWidthMaxMedium}`;
  const SmallMediaQuery = `@media screen and (max-width: ${ScreenWidthMaxSmall}`;

  const itemStyles: IStyle[] = [
    DefaultFontStyles.xLarge,
    {
      color: palette.neutralPrimary,
      // padding: '0 8px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      //  overflow: 'hidden',
      maxWidth: 100
    }
  ];

  const largeItemStyles = {
    selectors: {
      [`@media screen and (max-width: ${ScreenWidthMaxMedium}`]: {
        fontSize: FontSizes.large
      }
    }
  };

  const smallItemStyles = {
    selectors: {
      [`@media screen and (max-width: ${ScreenWidthMaxSmall}`]: {
        fontSize: FontSizes.medium
      }
    }
  };

  return mergeStyleSets({

    root: [
      'ms-Breadcrumb',
      {
        // TODO: DELETE THIS!!!!
        margin: '23px 0 1px',
        selectors: {
          '$itemLink:hover': {
            backgroundColor: palette.neutralLighter,
            color: 'initial',
            cursor: 'pointer'
          }
        }
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
      {
        fontSize: overflowButtonSize,
        height: '100%',

        selectors: {
          ':hover': {
            cursor: 'pointer',
            backgroundColor: crumbHoverBackground
          },
          ':active': {
            backgroundColor: crumbActiveBackground,
            color: crumbActiveForeground
          }
        }
      },

    ],

    chevron: [
      'ms-Breadcrumb-chevron',
      {
        fontSize: FontSizes.small,
        color: palette.neutralSecondary,
        lineHeight: 45,
        verticalAlign: 'baseline',

        selectors: {
          [HighContrastSelector]: {
            color: 'WindowText',
            MsHighContrastAdjust: 'none'
          }
        }
      }
    ],

    listItem: [
      'ms-Breadcrumb-listItem',
      {
        margin: 0,
        padding: '0 4px',
        display: 'flex'
      }
    ],

    crumbText: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },

    itemLink: [
      'ms-Breadcrumb-itemLink',
      itemStyles,
      {
        boxSizing: 'border-box',
        selectors: {
          ':hover': {
            backgroundColor: crumbHoverBackground,
            color: crumbHoverForeground,
            cursor: 'pointer'
          },
          ':focus': {
            // TODO: Remove!
            color: palette.neutralDark
          },
          ':active': {
            outline: 'transparent',
            backgroundColor: crumbActiveBackground,
            color: crumbActiveForeground
          }
        }
      }
    ],

    item: [
      'ms-Breadcrumb-item',
      itemStyles,
      {
        selectors: {
          ':hover': {
            cursor: 'default'
          }
        }
      }
    ]
  });
});