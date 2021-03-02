import { ScreenWidthMinUhfMobile, getTheme } from '@fluentui/react/lib/Styling';
import { IStyleFunction } from '@fluentui/react/lib/Utilities';
import { IComponentPageStyleProps, IComponentPageStyles } from './ComponentPage.types';

const globalClassNames = {
  root: 'ComponentPage',
  body: 'ComponentPage-body',
  header: 'ComponentPage-header',
  headerLink: 'ComponentPage-navLink',
  title: 'ComponentPage-title',
  navigation: 'ComponentPage-navigation',
  subHeading: 'ComponentPage-subHeading',
  overviewSection: 'ComponentPage-overviewSection',
  overviewText: 'ComponentPage-overview',
  overviewHeading: 'ComponentPage-overviewSectionHeader',
  usageSection: 'CompnentPage-usage',
  usageHeading: 'ComponentPage-usageHeader',
  variantsSection: 'ComponentPage-variantsSection',
  variantsTitle: 'ComponentPage-variantsTitle',
  variantsList: 'ComponentPage-variantsList',
  implementationSection: 'ComponentPage-implementationSection',
  feedbackSection: 'ComponentPage-feedbackSection',
  bestPracticesSection: 'ComponentPage-bestPracticesSection',
  doSections: 'ComponentPage-doSections',
  dosDontsSection: 'ComponentPage-doSection',
  dosDontsHeading: 'ComponentPage-doSectionHeader',
  dosDontsLine: 'ComponentPage-doSectionLine',
  dontsSection: 'ComponentPage-doSection--dont',
};

const componentPageColor = '#0f8387';
const componentPagePadding = 50;
const ulLeftPadding = 18;

export const getStyles: IStyleFunction<IComponentPageStyleProps, IComponentPageStyles> = props => {
  const { theme = getTheme() } = props;
  return {
    body: globalClassNames.body,
    root: [
      {
        backgroundColor: theme.palette.white,
        overflow: 'hidden',
      },
      globalClassNames.root,
    ],
    header: [
      {
        backgroundColor: componentPageColor,
        minHeight: 245,
        padding: componentPagePadding,
        paddingBottom: 0,
      },
      globalClassNames.header,
    ],
    headerLink: [
      theme.fonts.medium,
      {
        color: theme.palette.white,
        textDecoration: 'none',
        selectors: { '&:hover': { color: theme.palette.neutralLight } },
      },
      globalClassNames.headerLink,
    ],
    title: [
      theme.fonts.xLarge,
      {
        fontSize: 82,
        lineHeight: 94,
        color: theme.palette.white,
        display: 'inline-block',
        width: '100%',
        marginTop: componentPagePadding,
        marginBottom: componentPagePadding,
      },
      globalClassNames.title,
    ],
    navigation: globalClassNames.navigation,
    subHeading: [
      {
        // Set margins on the heading container not heading text to fix vertical alignment on sections
        // with an edit button
        marginTop: 0,
        marginBottom: 24,
        selectors: {
          // Set font here to be more specific
          h2: [theme.fonts.xLarge, { fontSize: 36, margin: 0 }],
        },
      },
      globalClassNames.subHeading,
    ],
    section: {
      padding: componentPagePadding,
    },
    overviewSection: [
      {
        maxWidth: '60em',
      },
      globalClassNames.overviewSection,
    ],
    overviewText: [
      {
        fontSize: theme.fonts.small.fontSize,
        // This is meant to be a ratio, so it has to be in quotes so it's not interpreted as pixels
        lineHeight: '1.5',
        marginBottom: -6, // Trim padding off last paragraph
        selectors: {
          p: {
            margin: 0,
            padding: '16px 0',
          },
          ul: { paddingLeft: ulLeftPadding },
          li: [
            theme.fonts.small,
            {
              marginBottom: 16,
            },
          ],
          'ul li': { listStyle: 'disc' },
        },
      },
      globalClassNames.overviewText,
    ],
    overviewHeading: [
      {
        selectors: {
          [`&.${globalClassNames.subHeading}`]: {
            marginTop: 0,
          },
        },
      },
      globalClassNames.overviewHeading,
    ],
    // These are for the actual "Best practices" heading/text (rarely shown).
    // The wrapper for this section plus dos/don'ts is bestPracticesSection.
    usageSection: [
      {
        marginBottom: 16,
      },
      globalClassNames.usageSection,
    ],
    usageHeading: globalClassNames.usageHeading,
    variantsSection: globalClassNames.variantsSection,
    variantsTitle: globalClassNames.variantsTitle,
    variantsList: [
      {
        paddingLeft: ulLeftPadding,
        selectors: {
          li: { listStyle: 'disc' },
        },
      },
      globalClassNames.variantsList,
    ],
    implementationSection: globalClassNames.implementationSection,
    feedbackSection: globalClassNames.feedbackSection,
    bestPracticesSection: [
      {
        backgroundColor: theme.palette.neutralLighterAlt,
      },
      globalClassNames.bestPracticesSection,
    ],
    doSections: globalClassNames.doSections,
    dosDontsSection: [
      {
        width: '100%',
        boxSizing: 'border-box',
        display: 'inline-block',
        verticalAlign: 'top',
        marginBottom: 20,
        selectors: {
          ul: { paddingLeft: ulLeftPadding },
          li: {
            listStyle: 'disc',
            marginBottom: 20,
            selectors: {
              'ul li': {
                listStyle: 'circle',
                marginBottom: 0,
              },
            },
          },
          '&:first-child': { marginRight: 120 },
          [`@media screen and (min-width: ${ScreenWidthMinUhfMobile}px)`]: {
            marginBottom: -10, // Trim last list item
            width: 'calc(50% - 60px)',
          },
        },
      },
      globalClassNames.dosDontsSection,
    ],
    dosDontsHeading: [
      {
        selectors: {
          h3: [theme.fonts.mediumPlus, { margin: 0 }],
        },
      },
      globalClassNames.dosDontsHeading,
    ],
    dosDontsLine: [
      {
        borderRadius: 3,
        display: 'block',
        height: 8,
        margin: '12px 0 40px',
        border: 0,
      },
      globalClassNames.dosDontsLine,
    ],
    dosLine: {
      backgroundColor: '#a4cf0c',
    },
    dontsLine: {
      backgroundColor: '#e74856',
    },
    dontsSection: globalClassNames.dontsSection,
  };
};
