import { IStyle, getGlobalClassNames, Shade, getShade, getColorFromString } from 'office-ui-fabric-react';
import { MotionDurations, MotionTimings, FontSizes } from '@uifabric/fluent-theme';
import { IHomePageStyleProps, IHomePageStyles } from './HomePage.types';
import { appPadding, mediaQuery } from '../../styles/constants';

const CONTENT_WIDTH = 1536;

const GlobalClassNames: { [key in keyof IHomePageStyles]: string } = {
  root: 'ms-HomePage',
  heroSection: 'ms-HomePage-heroSection',
  heroTitle: 'ms-HomePage-heroTitle',
  platformCardsSection: 'ms-HomePage-platformCardsSection',
  platformsSection: 'ms-HomePage-platformsSection',
  platformsTitle: 'ms-HomePage-platformsTitle',
  resourcesSection: 'ms-HomePage-resourcesSection',
  resourcesTitle: 'ms-HomePage-resourcesTitle',
  usageSection: 'ms-HomePage-usageSection',
  usageTitle: 'ms-HomePage-usageTitle',
  usageIconList: 'ms-HomePage-usageIconList',
  usageIconListItem: 'ms-HomePage-usageIconListItem',
  usageIcon: 'ms-HomePage-usageIcon',
  sectionContent: 'ms-HomePage-sectionContent',
  oneHalf: 'ms-HomePage-oneHalf',
  oneFourth: 'ms-HomePage-oneFourth',
  inner: 'ms-HomePage-inner',
  card: 'ms-HomePage-card',
  cardTitle: 'ms-HomePage-cardTitle',
  versionSwitcher: 'ms-HomePage-versionSwitcher',
  cardList: 'ms-HomePage-cardList',
  cardListItem: 'ms-HomePage-cardListItem',
  cardIcon: 'ms-HomePage-cardIcon',
  link: 'ms-HomePage-link',
  linkDark: 'ms-HomePage-linkDark',
  linkIcon: 'ms-HomePage-linkIcon',
  linkText: 'ms-HomePage-linkText',
  illustration: 'ms-HomePage-illustration'
};

export const monoFont =
  '"Segoe UI Mono",Consolas,"Andale Mono WT","Andale Mono","Lucida Console","Lucida Sans Typewriter","DejaVu Sans Mono",' +
  '"Bitstream Vera Sans Mono","Liberation Mono","Nimbus Mono L",Monaco,"Courier New",Courier,monospace';

const allLinkStatesSelector = '&:hover, &:active, &:active:hover, &:link';

export const getStyles = (props: IHomePageStyleProps): IHomePageStyles => {
  const { theme, className, isMountedOffset, isInverted, beforeColor, afterColor } = props;
  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const beforeColorObj = beforeColor && getColorFromString(beforeColor);
  const beforeAlt = beforeColorObj && getShade(beforeColorObj, Shade.Shade6).str;
  const afterColorObj = afterColor && getColorFromString(afterColor);
  const afterAlt = afterColorObj && getShade(afterColorObj, Shade.Shade6).str;

  const sectionAnimation: IStyle = [
    {
      opacity: 0,
      transform: 'translate3d(0, 48px, 0)',
      transition:
        `transform ${MotionDurations.duration3} ${MotionTimings.decelerate},` +
        `opacity ${MotionDurations.duration3} ${MotionTimings.decelerate} .05s`
    },
    isMountedOffset && {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)'
    }
  ];

  const sectionStyles: IStyle = [
    {
      display: 'flex',
      justifyContent: 'center'
    },
    ...sectionAnimation
  ];

  const sectionTitleSize = FontSizes.size32;
  const sectionTitleStyles: IStyle = [
    {
      fontSize: sectionTitleSize,
      lineHeight: '1.1',
      marginTop: 0,
      marginBottom: '3em',

      selectors: {
        [mediaQuery.maxMobile]: {
          marginBottom: '1em'
        }
      }
    }
  ];

  const columnStyles: IStyle = [
    {
      padding: appPadding.small,

      selectors: {
        [mediaQuery.maxMobile]: {
          marginTop: appPadding.medium,
          flex: '1 0 100%',

          selectors: {
            '&:first-child': {
              marginTop: 0
            }
          }
        }
      }
    }
  ];

  return {
    root: [
      classNames.root,
      {
        background: palette.black,
        color: palette.white,

        selectors: {
          p: {
            marginBottom: '3em',

            selectors: {
              '&:last-child': {
                marginBottom: 0
              }
            }
          }
        }
      },
      className
    ],

    sectionContent: [
      classNames.sectionContent,
      {
        display: 'flex',
        flex: '1 0 auto',
        flexWrap: 'wrap',
        maxWidth: CONTENT_WIDTH,
        width: '100%', // IE11 needs width for flexbox to calculate correctly.

        selectors: {
          p: {
            color: isInverted ? palette.black : palette.white
          }
        }
      }
    ],

    heroSection: [
      classNames.heroSection,
      ...sectionStyles,
      {
        transitionDelay: '0.1s',
        paddingTop: 132,
        paddingBottom: 132
      }
    ],

    heroTitle: [
      classNames.heroTitle,
      {
        fontSize: FontSizes.size68, // @TODO: Mock uses 64
        color: '#cf8fff', // @TODO: Fluent color palette?
        lineHeight: '1.1',
        margin: 0
      }
    ],

    platformCardsSection: [
      classNames.platformCardsSection,
      {
        transitionDelay: '0.2s',
        position: 'relative',

        selectors: {
          '&:before, &:after': {
            content: '""',
            width: '50vw',
            height: '100%',
            position: 'absolute',
            top: 0,
            zIndex: 1
          },

          '&:before': {
            left: 0,
            // background: beforeColor // Adjust saturation
            background: beforeAlt
          },

          '&:after': {
            right: 0,
            // background: afterColor // Adjust saturation
            background: afterAlt
          }
        }
      },
      ...sectionAnimation
    ],

    platformsSection: [
      classNames.platformsSection,
      ...sectionStyles,
      {
        transitionDelay: '0.2s',
        paddingBottom: 160,
        background: '#50e3c2', // @TODO: Fluent color palette?
        color: palette.black,

        selectors: {
          [mediaQuery.maxLarge]: {
            paddingTop: appPadding.medium
          },
          [mediaQuery.maxMobile]: {
            paddingTop: appPadding.large
          }
        }
      }
    ],

    platformsTitle: [
      classNames.platformsTitle,
      ...sectionTitleStyles,
      {
        color: palette.black
      }
    ],

    resourcesSection: [
      classNames.resourcesSection,
      ...sectionStyles,
      {
        transitionDelay: '0.3s'
      }
    ],

    resourcesTitle: [
      ...sectionTitleStyles,
      {
        color: '#4A90E2'
      }
    ],

    usageSection: [
      classNames.usageSection,
      ...sectionStyles,
      {
        paddingBottom: 132,
        transitionDelay: '0.4s'
      }
    ],

    usageTitle: [
      classNames.usageTitle,
      ...sectionTitleStyles,
      {
        color: palette.white
      }
    ],

    usageIconList: [
      classNames.usageIconList,
      {
        display: 'inline-flex',
        flexWrap: 'wrap',
        margin: '0 -8px 24px',
        padding: 0
      }
    ],

    usageIconListItem: [
      classNames.usageIconListItem,
      {
        margin: '0 8px 24px',
        minWidth: 'calc(25% - 16px)'
      }
    ],

    usageIcon: [
      classNames.usageIcon,
      {
        width: 52,
        height: 52
      }
    ],

    oneHalf: [
      classNames.oneHalf,
      {
        flex: '0 0 50%'
      },
      ...columnStyles
    ],

    oneFourth: [
      classNames.oneFourth,
      {
        flex: '0 0 25%',

        selectors: {
          [mediaQuery.maxLarge]: {
            flex: '0 0 50%'
          }
        }
      },
      ...columnStyles
    ],

    inner: [
      classNames.inner,
      ...sectionStyles,
      {
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        maxWidth: CONTENT_WIDTH,
        margin: '0 auto',
        zIndex: 2,
        position: 'relative'
      }
    ],

    card: [
      classNames.card,
      {
        padding: appPadding.small,
        flex: '0 0 25%',
        minWidth: 300,

        selectors: {
          [mediaQuery.maxLarge]: {
            flex: '1 0 25%'
          }
        }
      }
    ],

    cardTitle: [
      classNames.cardTitle,
      ...sectionTitleStyles,
      {
        color: palette.black,
        marginBottom: '1em'
      }
    ],

    versionSwitcher: [
      classNames.versionSwitcher,
      {
        marginBottom: sectionTitleSize,
        height: '1em'
      }
    ],

    cardList: [
      classNames.cardList,
      {
        margin: '0 0 -12px 0',
        padding: '0'
      }
    ],

    cardListItem: [
      classNames.cardListItem,
      {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        lineHeight: '1.6',
        marginBottom: 12
      }
    ],

    cardIcon: [
      classNames.cardIcon,
      {
        fontSize: FontSizes.size68,
        color: palette.black,
        marginBottom: '1em',

        selectors: {
          [mediaQuery.maxMobile]: {
            marginBottom: '.25em'
          }
        }
      }
    ],

    link: [
      classNames.link,
      {
        fontFamily: monoFont,
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.white,

        selectors: {
          // Override default link styles and UHF styles
          // (due to UHF styles, we have to use a specific color rather than 'inherit')
          [allLinkStatesSelector]: {
            textDecoration: 'none',
            color: theme.palette.white
          },

          [`&:not(.is-disabled):hover .${classNames.linkText}, ` +
          `&:not(.is-disabled):active .${classNames.linkText}, ` +
          `&:not(.is-disabled):active:hover .${classNames.linkText}`]: {
            borderColor: 'inherit'
          }
        }
      }
    ],

    linkDark: [
      classNames.linkDark,
      {
        color: theme.palette.black,
        selectors: {
          [allLinkStatesSelector]: {
            color: theme.palette.black
          }
        }
      }
    ],

    linkIcon: [
      classNames.linkIcon,
      {
        marginRight: 16
      }
    ],

    linkText: [
      classNames.linkText,
      {
        borderBottom: '1px solid transparent',
        transition: `border-color ${MotionDurations.duration2} ${MotionTimings.decelerate}`
      }
    ],

    illustration: [
      classNames.illustration,
      {
        selectors: {
          img: {
            maxWidth: '100%'
          }
        }
      }
    ]
  };
};
