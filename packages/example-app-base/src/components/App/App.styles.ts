import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IAppStyleProps, IAppStyles } from './App.types';
import { ResponsiveMode } from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';

const globalClassNames = {
  root: 'ms-App',
  header: 'ms-App-header',
  leftNav: 'ms-App-nav',
  content: 'ms-App-content',
  linkFlair: 'Nav-linkFlair',
  linkFlairStarted: 'is-state1',
  linkFlairBeta: 'is-state2',
  linkFlairRelease: 'is-state3'
};

const headerHeight = 50;
const navWidth = 300;

export const getStyles: IStyleFunction<IAppStyleProps, IAppStyles> = props => {
  const { responsiveMode = ResponsiveMode.xLarge } = props;
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
            '-webkit-tap-highlight-color': 'transparent'
          }
        }
      },
      globalClassNames.root
    ],
    header: [
      {
        position: 'absolute',
        top: 0,
        height: headerHeight,
        left: 0,
        right: 0
      },
      globalClassNames.header
    ],
    nav: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    leftNavContainer: [
      {
        position: 'absolute',
        left: 0,
        width: navWidth,
        top: headerHeight,
        bottom: 0,
        borderRight: `1px solid ${DefaultPalette.neutralLight}`,
        background: DefaultPalette.white,
        boxSizing: 'border-box',
        overflowX: 'hidden',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      },
      globalClassNames.leftNav
    ],
    panelNavContainer: {
      top: headerHeight
    },
    content: [
      {
        position: 'absolute',
        left: isLargeDown ? 0 : navWidth,
        right: 0,
        top: headerHeight,
        bottom: 0,
        padding: isLargeDown ? 5 : undefined,
        overflowX: 'auto',
        overflowY: 'auto',
        // Helps to enable hardware acceleration and improve painting performance.
        transform: 'translateZ(0)',
        // Helps to enable smooth scrolling on ios devices.
        WebkitOverflowScrolling: 'touch'
      },
      globalClassNames.content
    ],
    linkFlair: [
      {
        fontSize: 10,
        textTransform: 'upppercase',
        float: 'right',
        background: DefaultPalette.neutralTertiaryAlt,
        color: DefaultPalette.white,
        lineHeight: 'normal',
        display: 'inline',
        verticalAlign: 'middle',
        transform: 'translateY(-50%)',
        position: 'absolute',
        right: 20,
        top: '50%',
        padding: '2px 6px',
        borderRadius: 2
      },
      globalClassNames.linkFlair
    ],
    linkFlairStarted: [
      {
        background: DefaultPalette.yellowLight,
        color: DefaultPalette.black
      },
      globalClassNames.linkFlairStarted
    ],
    linkFlairBeta: [
      {
        background: DefaultPalette.greenLight
      },
      globalClassNames.linkFlairBeta
    ],
    linkFlairRelease: [
      {
        background: DefaultPalette.green
      },
      globalClassNames.linkFlairRelease
    ]
  };
};
