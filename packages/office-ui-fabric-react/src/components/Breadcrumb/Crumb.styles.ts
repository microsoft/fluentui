import {
  FontSizes,
  HighContrastSelector,
  ScreenWidthMaxMedium,
  ScreenWidthMaxSmall
} from '../../Styling';
import { CrumbBase } from './Crumb.base';
import { ICrumbProps, ICrumbStyleProps, ICrumbStyles } from './Crumb.props';

const MediumMediaQuery = `@media screen and (max-width: ${ScreenWidthMaxMedium}px)`;
const SmallMediaQuery = `@media screen and (max-width: ${ScreenWidthMaxSmall}px)`;

export function getStyles(props: ICrumbStyleProps): ICrumbStyles {
  const { theme, isCurrentItem } = props;
  const { palette, fonts } = theme;

  // Sizing values.
  const chevronNormalSize = 12;
  const chevronSmallSize = 8;
  const height = 40;

  // Colors used by the crumb.
  const crumbHoverBackground = palette.neutralLighter;
  const crumbHoverColor = palette.neutralPrimary;
  const crumbActiveBackground = palette.neutralTertiaryAlt;
  const crumbActiveColor = palette.neutralPrimary;
  const chevronColor = palette.neutralSecondary;

  return {
    root: [
      'ms-Crumb',
      {
        margin: 0,
        display: 'flex'
      }
    ],

    chevron: [
      'ms-Crumb-chevron',
      {
        display: 'inline-block',
        verticalAlign: 'top',
        color: chevronColor,
        height,
        lineHeight: height + 6,
        overflow: 'hidden',
        fontSize: chevronNormalSize,
        userSelect: 'none',

        selectors: {
          [HighContrastSelector]: {
            color: 'WindowText',
            MsHighContrastAdjust: 'none'
          },
          [MediumMediaQuery]: {
            lineHeight: height + 2
          },
          [SmallMediaQuery]: {
            fontSize: chevronSmallSize
          }
        }
      }
    ],

    crumbButton: [
      'ms-Crumb-crumbButton',
      {
        textAlign: 'left',
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
      },
    ],

    crumbLabel: [
      'ms-Crumb-crumbLabel',
      {
        padding: '0 4px'
      }
    ],

    overflowIcon: {
      height,
      lineHeight: height + 4
    },

    textContent: [
      'ms-Crumb-textContent',
      fonts.xLarge,
      {
        verticalAlign: 'top',
        height,
        lineHeight: height,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',

        selectors: {
          [MediumMediaQuery]: fonts.large,
          [SmallMediaQuery]: fonts.medium
        }
      },
      !isCurrentItem && {
        maxWidth: 180
      }
    ]
  };
}
