import { IPanelStyleProps, IPanelStyles } from './Panel.types';
import { AnimationClassNames, AnimationVariables, getGlobalClassNames, ScreenWidthMinMedium } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Panel',
  main: 'ms-Panel-main',
  commands: 'ms-Panel-commands',
  contentInner: 'ms-Panel-contentInner',
  navigation: 'ms-Panel-navigation',
  closeButton: 'ms-Panel-closeButton ms-PanelAction-close',
  header: 'ms-Panel-header',
  headerText: 'ms-Panel-headerText',
  content: 'ms-Panel-content',
  footer: 'ms-Panel-footer',
  footerInner: 'ms-Panel-footerInner'
};

export const getStyles = (props: IPanelStyleProps): IPanelStyles => {
  const { className, isAnimating, isOpen, theme } = props;
  const { palette } = theme;

  // widthXS: '272px';
  const widthSM = '340px';
  // widthMD: '643px';
  // widthLG: '940px';
  // marginMD: '48px';
  // marginLG: '428px';
  // marginXL: '176px';
  // commandBarHeight: '44px';

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      className
    ],
    overlay: [
      {
        pointerEvents: 'none',
        opacity: 1,
        cursor: 'pointer',
        transition: `opacity ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction1}`
      },
      isOpen && isAnimating && AnimationClassNames.fadeIn200,
      !isOpen && isAnimating && AnimationClassNames.fadeOut200
    ],
    hiddenPanel: {
      visibility: 'hidden'
    },
    main: [
      classNames.main,
      {
        backgroundColor: palette.white,
        position: 'absolute',
        right: 0,
        width: '100%',
        bottom: 0,
        top: 0,
        overflowX: 'hidden',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        selectors: {
          ['@media (min-width: ' + ScreenWidthMinMedium + ')']: {
            borderLeft: `1px solid ${palette.neutralLight}`,
            borderRight: `1px solid ${palette.neutralLight}`,
            pointerEvents: 'auto',
            width: widthSM,
            boxShadow: '-30px, 0px, 30px, -30px, .2',
            left: 'auto'
          }
        }
      }
    ],
    commands: [classNames.commands],
    contentInner: [classNames.contentInner],
    navigation: [classNames.navigation],
    closeButton: [classNames.closeButton],
    header: [classNames.header],
    headerText: [classNames.headerText],
    content: [classNames.content],
    footer: [classNames.footer],
    footerInner: [classNames.footerInner]
  };
};
