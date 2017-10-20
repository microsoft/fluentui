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

const MediumMediaQuery = `@media screen and (max-width: ${ScreenWidthMaxMedium}px)`;
const SmallMediaQuery = `@media screen and (max-width: ${ScreenWidthMaxSmall}px)`;

export const getClassNames = memoizeFunction((
  theme: ITheme,
  className: string
): IBreadcrumbClassNames => {
  const { palette, fonts } = theme;

  // Sizing values.

  const chevronNormalSize = 12;
  const chevronSmallSize = 8;

  // Colors used by the crumb.
  const crumbHoverBackground = palette.neutralLighter;
  const crumbHoverColor = palette.neutralPrimary;
  const crumbActiveBackground = palette.neutralTertiaryAlt;
  const crumbActiveColor = palette.neutralPrimary;
  const chevronColor = palette.neutralSecondary;

  // Style shared between the crumbButtons and crumbLabels.
  const itemStyles: IStyle[] = [
    {
      height: 40,
      lineHeight: 40,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }
  ];

  return mergeStyleSets({

    root: [
      'ms-Breadcrumb',
      {
        margin: '0 -4px',
        padding: 0,
        display: 'flex',
        alignItems: 'stretch',
      },
      className
    ],

    chevron: [
      'ms-Breadcrumb-chevron',
      {
        color: chevronColor,
        height: 40,
        lineHeight: 44,
        overflow: 'hidden',
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

    crumb: [
      'ms-Breadcrumb-crumb',
      {
        margin: 0,
        display: 'flex'
      }
    ],

    crumbButton: [
      'ms-Breadcrumb-crumbButton',
      itemStyles,
      {
        boxSizing: 'border-box',
        selectors: {
          ':hover': {
            backgroundColor: crumbHoverBackground,
            color: crumbHoverColor,
            cursor: 'pointer'
          },
          ':active': {
            backgroundColor: crumbActiveBackground,
            color: crumbActiveColor
          }
        }
      }
    ],

    crumbLabel: [
      'ms-Breadcrumb-crumbLabel',
      itemStyles,
      {
        padding: '0 4px'
      }
    ],

    crumbTextContent: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      ...fonts.xLarge,

      selectors: {
        [MediumMediaQuery]: {
          ...fonts.large,
        }
      }
    }

  });
});