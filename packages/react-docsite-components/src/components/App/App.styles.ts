import { getTheme } from '@fluentui/react/lib/Styling';
import { IStyleFunction } from '@fluentui/react/lib/Utilities';
import { IAppStyleProps, IAppStyles } from './App.types';
import { ResponsiveMode } from '@fluentui/react/lib/ResponsiveMode';

const globalClassNames = {
  root: 'ms-App',
  header: 'ms-App-header',
  leftNav: 'ms-App-nav',
  content: 'ms-App-content',
  linkFlair: 'Nav-linkFlair',
  linkFlairStarted: 'is-state1',
  linkFlairBeta: 'is-state2',
  linkFlairRelease: 'is-state3',
};

const headerHeight = 50;
const navWidth = 300;

export const getStyles: IStyleFunction<IAppStyleProps, IAppStyles> = props => {
  const { responsiveMode, theme = getTheme(), showOnlyExamples } = props;
  const isLargeDown = responsiveMode <= ResponsiveMode.large;
  return {
    root: [
      {
        selectors: {
          ':global(body)': {
            padding: 0,
            margin: 0,
            position: 'absolute',
            left: 0,
            top: 0,
            minWidth: '100%',
            minHeight: '100%',
            '-webkit-tap-highlight-color': 'transparent',
          },
        },
      },
      globalClassNames.root,
    ],
    headerContainer: [
      {
        position: 'absolute',
        top: 0,
        height: headerHeight,
        left: 0,
        right: 0,
      },
      globalClassNames.header,
    ],
    leftNavContainer: [
      {
        position: 'absolute',
        left: 0,
        width: navWidth,
        top: headerHeight,
        bottom: 0,
        borderRight: `1px solid ${theme.palette.neutralLight}`,
        background: theme.palette.white,
        boxSizing: 'border-box',
        overflowX: 'hidden',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      },
      globalClassNames.leftNav,
    ],
    content: [
      {
        position: 'absolute',
        left: isLargeDown || showOnlyExamples ? 0 : navWidth,
        right: 0,
        top: !showOnlyExamples ? headerHeight : 0,
        bottom: 0,
        padding: isLargeDown ? 5 : undefined,
        overflowX: 'auto',
        overflowY: 'auto',
        // Helps to enable hardware acceleration and improve painting performance.
        transform: 'translateZ(0)',
        // Helps to enable smooth scrolling on ios devices.
        WebkitOverflowScrolling: 'touch',
      },
      globalClassNames.content,
    ],
    linkFlair: [
      {
        fontSize: 10,
        textTransform: 'upppercase',
        float: 'right',
        background: theme.palette.neutralTertiaryAlt,
        color: theme.palette.white,
        lineHeight: 'normal',
        display: 'inline',
        verticalAlign: 'middle',
        transform: 'translateY(-50%)',
        position: 'absolute',
        right: 20,
        top: '50%',
        padding: '2px 6px',
        borderRadius: 2,
      },
      globalClassNames.linkFlair,
    ],
    linkFlairStarted: [
      {
        background: theme.palette.yellowLight,
        color: theme.palette.black,
      },
      globalClassNames.linkFlairStarted,
    ],
    linkFlairBeta: [
      {
        background: theme.palette.greenLight,
      },
      globalClassNames.linkFlairBeta,
    ],
    linkFlairRelease: [
      {
        background: theme.palette.green,
      },
      globalClassNames.linkFlairRelease,
    ],
    subComponentStyles: {
      header: {},
      nav: {
        root: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        groupContent: {
          marginBottom: 20,
        },
      },
      navPanel: { root: { top: headerHeight } },
    },
  };
};
