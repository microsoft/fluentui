import {
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
  const { palette, fonts } = theme;

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

  const MediumMediaQuery = `@media screen and (max-width: ${ScreenWidthMaxMedium}px)`;
  const SmallMediaQuery = `@media screen and (max-width: ${ScreenWidthMaxSmall}px)`;

  const itemStyles: IStyle[] = [
    {
      color: palette.neutralPrimary,
      // padding: '0 8px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      //  overflow: 'hidden',
      // maxWidth: 100
    }
  ];

  const largeItemStyles = {
  };

  return mergeStyleSets({

    root: [
      'ms-Breadcrumb',
      {
        // TODO: DELETE THIS!!!!
        // margin: '23px 0 1px',
        margin: '0 -4px',
        display: 'flex',
        alignItems: 'stretch',

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

    // list: [
    //   'ms-Breadcrumb-list',
    //   {
    //     whiteSpace: 'nowrap',
    //     padding: 0,
    //     margin: 0,
    //     display: 'flex',
    //     alignItems: 'stretch'
    //   }
    // ],

    overflow: [
      'ms-Breadcrumb-overflow',
      // {
      //   position: 'relative',
      //   display: 'flex',
      //   alignItems: 'center'
      // }
    ],

    overflowButton: [
      'ms-Breadcrumb-overflowButton',
      // {
      //   fontSize: overflowButtonSize,
      //   height: '100%',

      //   selectors: {
      //     ':hover': {
      //       cursor: 'pointer',
      //       backgroundColor: crumbHoverBackground
      //     },
      //     ':active': {
      //       backgroundColor: crumbActiveBackground,
      //       color: crumbActiveForeground
      //     }
      //   }
      // },

    ],

    chevron: [
      'ms-Breadcrumb-chevron',

      {
        color: palette.neutralSecondary,
        lineHeight: 44,
        verticalAlign: 'baseline',
        fontSize: FontSizes.medium,

        selectors: {
          [HighContrastSelector]: {
            color: 'WindowText',
            MsHighContrastAdjust: 'none'
          },
          [MediumMediaQuery]: {
            fontSize: FontSizes.xSmall,
          }
        }
      }
    ],

    listItem: [
      'ms-Breadcrumb-listItem',
      {
        margin: 0,
        //       padding: '0 4px',
        display: 'flex'
      }
    ],

    crumbText: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      ...fonts.xLarge,

      selectors: {
        [MediumMediaQuery]: {
          ...fonts.large,
        }
      }
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
            cursor: 'pointer',

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