import { ScreenWidthMinUhfMobile, IRawStyle, getTheme } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunction } from 'office-ui-fabric-react/lib/Utilities';
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
  implementationExamplesSection: 'ComponentPage-implementationExamplesSection',
  feedbackSection: 'ComponentPage-feedbackSection',
  bestPracticesSection: 'ComponentPage-bestPracticesSection',
  doSections: 'ComponentPage-doSections',
  dosDontsSection: 'ComponentPage-doSection',
  dosDontsHeading: 'ComponentPage-doSectionHeader',
  dosDontsLine: 'ComponentPage-doSectionLine',
  dontsSection: 'ComponentPage-doSection--dont',
  statusSection: 'ComponentPage-componentStatusSection'
};

const componentPageColor = '#0f8387';
const componentPagePadding = 50;
const componentSubHeadMargin = 24;
const ulLeftPadding = 18;

const sectionStyles: IRawStyle = {
  padding: componentPagePadding
};

export const getStyles: IStyleFunction<IComponentPageStyleProps, IComponentPageStyles> = props => {
  const { theme = getTheme() } = props;
  return {
    body: globalClassNames.body,
    root: [
      {
        backgroundColor: theme.palette.white,
        overflow: 'hidden'
      },
      globalClassNames.root
    ],
    header: [
      {
        backgroundColor: componentPageColor,
        minHeight: 245,
        padding: componentPagePadding,
        paddingBottom: 0
      },
      globalClassNames.header
    ],
    headerLink: [
      theme.fonts.large,
      {
        color: theme.palette.white,
        textDecoration: 'none',
        selectors: { '&:hover': { color: theme.palette.neutralLight } }
      },
      globalClassNames.headerLink
    ],
    title: [
      theme.fonts.xxLarge,
      {
        fontSize: 82,
        lineHeight: 94,
        color: theme.palette.white,
        display: 'inline-block',
        width: '100%',
        marginTop: componentPagePadding,
        marginBottom: componentPagePadding
      },
      globalClassNames.title
    ],
    navigation: globalClassNames.navigation,
    subHeading: [
      theme.fonts.xxLarge,
      {
        fontSize: 36,
        marginTop: 10,
        marginBottom: componentSubHeadMargin
      },
      globalClassNames.subHeading
    ],
    overviewSection: [
      sectionStyles,
      {
        paddingTop: 15,
        maxWidth: '50em'
      },
      globalClassNames.overviewSection
    ],
    overviewText: [
      {
        fontSize: theme.fonts.medium.fontSize,
        // This is meant to be a ratio, so it has to be in quotes so it's not interpreted as pixels
        lineHeight: '1.5',
        marginBottom: -6, // Trim padding off last paragraph
        selectors: {
          p: {
            margin: 0,
            padding: '16px 0'
          },
          ul: { paddingLeft: ulLeftPadding },
          li: [
            theme.fonts.medium,
            {
              marginBottom: 16
            }
          ],
          'ul li': { listStyle: 'disc' }
        }
      },
      globalClassNames.overviewText
    ],
    overviewHeading: globalClassNames.overviewHeading,
    usageSection: globalClassNames.usageSection,
    usageHeading: [
      {
        marginTop: 10,
        marginBottom: componentSubHeadMargin,
        selectors: {
          [`.${globalClassNames.subHeading}`]: {
            margin: 0
          }
        }
      },
      globalClassNames.usageHeading
    ],
    variantsSection: [sectionStyles, globalClassNames.variantsSection],
    variantsTitle: globalClassNames.variantsTitle,
    variantsList: [
      {
        paddingLeft: ulLeftPadding,
        selectors: {
          li: { listStyle: 'disc' }
        }
      },
      globalClassNames.variantsList
    ],
    implementationSection: [sectionStyles, globalClassNames.implementationSection],
    implementationExamplesSection: [sectionStyles, globalClassNames.implementationExamplesSection],
    feedbackSection: [sectionStyles, globalClassNames.feedbackSection],
    bestPracticesSection: [
      sectionStyles,
      {
        backgroundColor: theme.palette.neutralLighterAlt
      },
      globalClassNames.bestPracticesSection
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
          h3: theme.fonts.xLarge,
          ul: { paddingLeft: ulLeftPadding },
          li: {
            listStyle: 'disc',
            marginBottom: 20,
            selectors: {
              'ul li': {
                listStyle: 'circle',
                marginBottom: 0
              }
            }
          },
          '&:first-child': { marginRight: 120 },
          [`@media screen and (min-width: ${ScreenWidthMinUhfMobile}px)`]: {
            marginBottom: -10, // Trim last list item
            width: 'calc(50% - 60px)'
          }
        }
      },
      globalClassNames.dosDontsSection
    ],
    dosDontsHeading: [
      {
        margin: '16px 0 0 0',
        selectors: {
          h3: { margin: 0 }
        }
      },
      globalClassNames.dosDontsHeading
    ],
    dosDontsLine: [
      {
        borderRadius: 3,
        display: 'block',
        height: 8,
        margin: '12px 0 40px',
        border: 0
      },
      globalClassNames.dosDontsLine
    ],
    dosLine: {
      backgroundColor: '#a4cf0c'
    },
    dontsLine: {
      backgroundColor: '#e74856'
    },
    dontsSection: globalClassNames.dontsSection,
    statusSection: [
      sectionStyles,
      {
        paddingBottom: 0
      },
      globalClassNames.statusSection
    ]
  };
};
