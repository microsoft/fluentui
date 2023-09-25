import { IStyle, getGlobalClassNames, FontWeights } from '@fluentui/react';
import { MotionDurations, MotionTimings, FontSizes } from '@fluentui/theme';
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
  oneThird: 'ms-HomePage-oneThird',
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
  illustration: 'ms-HomePage-illustration',
};

export const monoFont =
  '"Segoe UI Mono",Consolas,"Andale Mono WT","Andale Mono","Lucida Console","Lucida Sans Typewriter",' +
  '"DejaVu Sans Mono","Bitstream Vera Sans Mono","Liberation Mono","Nimbus Mono L",Monaco,"Courier New",Courier,' +
  'monospace';

const allLinkStatesSelector = '&:hover, &:active, &:active:hover, &:link, &:visited';

export const getStyles = (props: IHomePageStyleProps): IHomePageStyles => {
  const { theme, className, isMountedOffset, isInverted } = props;
  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const sectionAnimation: IStyle = [
    {
      opacity: 0,
      transform: 'translate3d(0, 48px, 0)',
      transition:
        `transform ${MotionDurations.duration3} ${MotionTimings.decelerate},` +
        `opacity ${MotionDurations.duration3} ${MotionTimings.decelerate} .05s`,
    },
    isMountedOffset && {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    },
  ];

  const sectionStyles: IStyle = [
    {
      display: 'flex',
      justifyContent: 'center',
    },
    ...sectionAnimation,
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
          marginBottom: '1em',
        },
      },
    },
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
              marginTop: 0,
            },
          },
        },
      },
    },
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
                marginBottom: 0,
              },
            },
          },
        },
      },
      className,
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
            fontWeight: FontWeights.semibold,
            color: isInverted ? palette.black : palette.white,
          },
        },
      },
    ],

    heroSection: [
      classNames.heroSection,
      ...sectionStyles,
      {
        transitionDelay: '0.1s',
        paddingTop: 32,
        paddingBottom: 32,
        selectors: {
          [mediaQuery.minMobile]: {
            paddingTop: 132,
            paddingBottom: 132,
          },
        },
      },
    ],

    heroTitle: [
      classNames.heroTitle,
      {
        fontSize: 128, // @TODO: Mock uses 64
        color: palette.white, // @TODO: Fluent color palette?
        lineHeight: '1.1',
        margin: 0,
        whiteSpace: 'nowrap',
        selectors: {
          [mediaQuery.maxLarge]: {
            fontSize: 96,
          },
          [mediaQuery.maxMobile]: {
            fontSize: FontSizes.size68,
          },
        },
      },
    ],

    platformCardsSection: [
      classNames.platformCardsSection,
      {
        transitionDelay: '0.2s',
        position: 'relative',
      },
      ...sectionAnimation,
    ],

    platformsSection: [
      classNames.platformsSection,
      ...sectionStyles,
      {
        transitionDelay: '0.2s',
        background: '#CF8FFF',
        color: palette.black,
        selectors: {
          [mediaQuery.minMobile]: {
            paddingBottom: appPadding.small,
          },
          [mediaQuery.minLarge]: {
            minHeight: 384,
            paddingBottom: appPadding.large,
          },
        },
      },
    ],

    platformsTitle: [
      classNames.platformsTitle,
      ...sectionTitleStyles,
      {
        color: palette.black,
      },
    ],

    resourcesSection: [
      classNames.resourcesSection,
      ...sectionStyles,
      {
        transitionDelay: '0.3s',
      },
    ],

    resourcesTitle: [
      ...sectionTitleStyles,
      {
        color: palette.white,
      },
    ],

    usageSection: [
      classNames.usageSection,
      ...sectionStyles,
      {
        paddingBottom: 132,
        transitionDelay: '0.4s',
      },
    ],

    usageTitle: [
      classNames.usageTitle,
      ...sectionTitleStyles,
      {
        color: palette.white,
      },
    ],

    usageIconList: [
      classNames.usageIconList,
      {
        display: 'inline-flex',
        flexWrap: 'wrap',
        margin: '0 -8px 24px',
        padding: 0,
      },
    ],

    usageIconListItem: [
      classNames.usageIconListItem,
      {
        margin: '0 8px 24px',
        minWidth: 'calc(25% - 16px)',
      },
    ],

    usageIcon: [
      classNames.usageIcon,
      {
        width: 52,
        height: 52,
      },
    ],

    oneHalf: [
      classNames.oneHalf,
      {
        flex: '0 0 50%',
      },
      ...columnStyles,
    ],

    oneThird: [
      classNames.oneThird,
      {
        flex: '0 0 33%',
      },
      ...columnStyles,
    ],

    oneFourth: [
      classNames.oneFourth,
      {
        flex: '0 0 25%',

        selectors: {
          [mediaQuery.maxLarge]: {
            flex: '0 0 50%',
          },
        },
      },
      ...columnStyles,
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
        position: 'relative',
      },
    ],

    card: [
      classNames.card,
      {
        padding: appPadding.small,
        flex: '0 0 25%',
        minWidth: 300,

        selectors: {
          [mediaQuery.minMobile]: {
            minHeight: 384,
          },
          [mediaQuery.maxLarge]: {
            flex: '1 0 25%',
          },
        },
      },
    ],

    cardTitle: [
      classNames.cardTitle,
      ...sectionTitleStyles,
      {
        color: palette.white,
        marginBottom: 0,

        position: 'relative',
        selectors: {
          [mediaQuery.minMobile]: {
            bottom: 17,
          },
        },
      },
    ],

    versionSwitcher: [
      classNames.versionSwitcher,
      {
        height: '1em',
      },
    ],

    cardList: [
      classNames.cardList,
      {
        margin: '0 0 -12px 0',
        padding: '0',
      },
    ],

    cardListItem: [
      classNames.cardListItem,
      {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        lineHeight: '1.6',
        marginBottom: 22,
      },
    ],

    cardIcon: [
      classNames.cardIcon,
      {
        fontSize: FontSizes.size68,
        color: palette.black,
      },
    ],

    link: [
      classNames.link,
      {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.white,

        selectors: {
          span: {
            fontWeight: 600,
          },
          // Override default link styles and UHF styles
          // (due to UHF styles, we have to use a specific color rather than 'inherit')
          [allLinkStatesSelector]: {
            textDecoration: 'none',
            color: theme.palette.white,
          },

          [`&:not(.is-disabled):hover .${classNames.linkText}, ` +
          `&:not(.is-disabled):active .${classNames.linkText}, ` +
          `&:not(.is-disabled):active:hover .${classNames.linkText}`]: {
            borderColor: 'inherit',
          },
        },
      },
    ],

    linkDark: [
      classNames.linkDark,
      {
        color: theme.palette.white,
        selectors: {
          [allLinkStatesSelector]: {
            color: theme.palette.white,
          },
        },
      },
    ],

    linkIcon: [
      classNames.linkIcon,
      {
        marginRight: 16,
      },
    ],

    linkText: [
      classNames.linkText,
      {
        borderBottom: '1px solid transparent',
        transition: `border-color ${MotionDurations.duration2} ${MotionTimings.decelerate}`,
      },
    ],

    illustration: [
      classNames.illustration,
      {
        selectors: {
          img: {
            maxWidth: '100%',
          },
        },
      },
    ],
  };
};
