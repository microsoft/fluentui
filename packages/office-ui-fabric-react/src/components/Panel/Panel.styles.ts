import { IPanelStyleProps, IPanelStyles, PanelType } from './Panel.types';
import {
  AnimationClassNames,
  AnimationVariables,
  DefaultFontStyles,
  getGlobalClassNames,
  ScreenWidthMinMedium,
  ScreenWidthMinLarge,
  ScreenWidthMinXLarge,
  ScreenWidthMinXXLarge,
  ScreenWidthMinUhfMobile,
  IStyle
} from '../../Styling';
// TODO -Issue #5689: Comment in once Button is converted to mergeStyles
// import { IStyleFunctionOrObject } from '../../Utilities';
// import { IButtonStyles, IButtonStyleProps } from '../../Button';

const GlobalClassNames = {
  root: 'ms-Panel',
  main: 'ms-Panel-main',
  commands: 'ms-Panel-commands',
  contentInner: 'ms-Panel-contentInner',
  scrollableContent: 'ms-Panel-scrollableContent',
  navigation: 'ms-Panel-navigation',
  closeButton: 'ms-Panel-closeButton ms-PanelAction-close',
  header: 'ms-Panel-header',
  headerText: 'ms-Panel-headerText',
  content: 'ms-Panel-content',
  footer: 'ms-Panel-footer',
  footerInner: 'ms-Panel-footerInner',
  isOpen: 'is-open',
  hasCloseButton: 'ms-Panel--hasCloseButton',
  smallFluid: 'ms-Panel--smFluid',
  smallFixedNear: 'ms-Panel--smLeft',
  smallFixedFar: 'ms-Panel--sm',
  medium: 'ms-Panel--md',
  large: 'ms-Panel--lg',
  largeFixed: 'ms-Panel--fixed',
  extraLarge: 'ms-Panel--xl',
  custom: 'ms-Panel--custom',
  customNear: 'ms-Panel--customLeft'
};

const panelWidth = {
  full: '100%',
  auto: 'auto',
  xs: 272,
  sm: 340,
  md1: 592,
  md2: 644,
  lg: 940
};

const panelMargin = {
  auto: 'auto',
  none: 0,
  md: 48,
  lg: 428,
  xl: 176
};

// Following consts are used below in `getPanelBreakpoints()` function to provide
// necessary fallbacks for different types of Panel in different breakpoints.
const smallPanelSelectors = {
  [`@media (min-width: ${ScreenWidthMinMedium}px)`]: {
    width: panelWidth.sm
  }
};

const mediumPanelSelectors = {
  [`@media (min-width: ${ScreenWidthMinLarge}px)`]: {
    width: panelWidth.md1
  },
  [`@media (min-width: ${ScreenWidthMinXLarge}px)`]: {
    width: panelWidth.md2
  }
};

const largePanelSelectors = {
  [`@media (min-width: ${ScreenWidthMinUhfMobile}px)`]: {
    left: panelMargin.md,
    width: panelWidth.auto
  },
  [`@media (min-width: ${ScreenWidthMinXXLarge}px)`]: {
    left: panelMargin.lg
  }
};

const largeFixedPanelSelectors = {
  [`@media (min-width: ${ScreenWidthMinXXLarge}px)`]: {
    left: panelMargin.auto,
    width: panelWidth.lg
  }
};

const extraLargePanelSelectors = {
  [`@media (min-width: ${ScreenWidthMinXXLarge}px)`]: {
    left: panelMargin.xl
  }
};

// Make sure Panels have fallbacks to different breakpoints by reusing same selectors.
// This is done in the effort to follow design redlines.
const getPanelBreakpoints = (type: PanelType): { [x: string]: IStyle } | undefined => {
  let selectors;

  // Panel types `smallFluid`, `smallFixedNear`, `custom` and `customNear`
  // are not checked in here because they render the same in all the breakpoints
  // and have the checks done separately in the `getStyles` function below.
  switch (type) {
    case PanelType.smallFixedFar:
      selectors = {
        ...smallPanelSelectors
      };
      break;
    case PanelType.medium:
      selectors = {
        ...smallPanelSelectors,
        ...mediumPanelSelectors
      };
      break;
    case PanelType.large:
      selectors = {
        ...smallPanelSelectors,
        ...mediumPanelSelectors,
        ...largePanelSelectors
      };
      break;
    case PanelType.largeFixed:
      selectors = {
        ...smallPanelSelectors,
        ...mediumPanelSelectors,
        ...largePanelSelectors,
        ...largeFixedPanelSelectors
      };
      break;
    case PanelType.extraLarge:
      selectors = {
        ...smallPanelSelectors,
        ...mediumPanelSelectors,
        ...largePanelSelectors,
        ...extraLargePanelSelectors
      };
      break;
    default:
      break;
  }

  return selectors;
};

const commandBarHeight = '44px';

const sharedPaddingStyles = {
  paddingLeft: '16px',
  paddingRight: '16px',
  selectors: {
    [`@media screen and (min-width: ${ScreenWidthMinLarge}px)`]: {
      paddingLeft: '32px',
      paddingRight: '32px'
    },
    [`@media screen and (min-width: ${ScreenWidthMinXXLarge}px)`]: {
      paddingLeft: '40px',
      paddingRight: '40px'
    }
  }
};

// // TODO -Issue #5689: Comment in once Button is converted to mergeStyles
// function getIconButtonStyles(props: IPanelStyleProps): IStyleFunctionOrObject<IButtonStyleProps, IButtonStyles> {
//   const { theme } = props;
//   return () => ({
//     root: {
//       height: 'auto',
//       width: '44px',
//       color: theme.palette.neutralSecondary,
//       fontSize: IconFontSizes.large
//     },
//     rootHovered: {
//       color: theme.palette.neutralPrimary
//     }
//   });
// }

export const getStyles = (props: IPanelStyleProps): IPanelStyles => {
  const {
    className,
    focusTrapZoneClassName,
    hasCloseButton,
    headerClassName,
    isAnimating,
    isFooterAtBottom,
    isFooterSticky,
    isOnRightSide,
    isOpen,
    isHiddenOnDismiss,
    theme,
    type = PanelType.smallFixedFar
  } = props;
  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);
  const isCustomPanel = type === PanelType.custom || type === PanelType.customNear;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : '100%';

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      isOpen && classNames.isOpen,
      hasCloseButton && classNames.hasCloseButton,
      {
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      isCustomPanel && isOnRightSide && classNames.custom,
      isCustomPanel && !isOnRightSide && classNames.customNear,
      className
    ],
    overlay: [
      {
        pointerEvents: 'auto',
        cursor: 'pointer'
      },
      isOpen && isAnimating && AnimationClassNames.fadeIn100,
      !isOpen && isAnimating && AnimationClassNames.fadeOut100
    ],
    hiddenPanel: [
      !isOpen &&
        !isAnimating &&
        isHiddenOnDismiss && {
          visibility: 'hidden'
        }
    ],
    main: [
      classNames.main,
      {
        backgroundColor: palette.white,
        boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.2)',
        pointerEvents: 'auto',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        maxHeight: '100%',
        bottom: 0,
        top: 0,
        // (left, right, width) - Properties to be overridden depending on the type of the Panel and the screen breakpoint.
        left: panelMargin.auto,
        right: panelMargin.none,
        width: panelWidth.full,
        selectors: {
          ['@supports (-webkit-overflow-scrolling: touch)']: {
            maxHeight: windowHeight
          },
          ...getPanelBreakpoints(type)
        }
      },
      type === PanelType.smallFluid && {
        left: panelMargin.none
      },
      type === PanelType.smallFixedNear && {
        left: panelMargin.none,
        right: panelMargin.auto,
        width: panelWidth.xs
      },
      type === PanelType.customNear && {
        right: 'auto',
        left: 0
      },
      isCustomPanel && {
        maxWidth: '100vw'
      },
      isFooterAtBottom && {
        height: '100%',
        selectors: {
          ['@supports (-webkit-overflow-scrolling: touch)']: {
            height: windowHeight
          }
        }
      },
      isOpen && isAnimating && !isOnRightSide && AnimationClassNames.slideRightIn40,
      isOpen && isAnimating && isOnRightSide && AnimationClassNames.slideLeftIn40,
      !isOpen && isAnimating && !isOnRightSide && AnimationClassNames.slideLeftOut40,
      !isOpen && isAnimating && isOnRightSide && AnimationClassNames.slideRightOut40,
      focusTrapZoneClassName
    ],
    commands: [classNames.commands],
    navigation: [
      classNames.navigation,
      {
        padding: '0 5px',
        height: commandBarHeight,
        display: 'flex',
        justifyContent: 'flex-end'
      }
    ],
    closeButton: [classNames.closeButton],
    contentInner: [
      classNames.contentInner,
      {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        maxHeight: '100%',
        overflowY: 'hidden',
        selectors: {
          ['@supports (-webkit-overflow-scrolling: touch)']: {
            maxHeight: windowHeight
          }
        }
      },
      isFooterAtBottom && {
        height: '100%',
        selectors: {
          ['@supports (-webkit-overflow-scrolling: touch)']: {
            height: windowHeight
          }
        }
      }
    ],
    header: [
      classNames.header,
      sharedPaddingStyles,
      {
        margin: '14px 0',
        // Ensure that title doesn't shrink if screen is too small
        flexGrow: 0,
        selectors: {
          [`@media (min-width: ${ScreenWidthMinXLarge}px)`]: {
            marginTop: '30px'
          }
        }
      }
    ],
    headerText: [
      classNames.headerText,
      DefaultFontStyles.xLarge,
      {
        color: palette.neutralPrimary,
        lineHeight: '32px',
        margin: 0
      },
      headerClassName
    ],
    scrollableContent: [
      classNames.scrollableContent,
      {
        overflowY: 'auto',
        height: '100%',
        selectors: {
          ['@supports (-webkit-overflow-scrolling: touch)']: {
            height: windowHeight
          }
        }
      }
    ],
    content: [
      classNames.content,
      sharedPaddingStyles,
      {
        marginBottom: 0,
        paddingBottom: 20
      }
    ],
    footer: [
      classNames.footer,
      {
        // Ensure that footer doesn't shrink if screen is too small
        flexGrow: 0,
        borderTop: '1px solid transparent',
        transition: `opacity ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction2}`
      },
      isFooterSticky && {
        background: palette.white,
        borderTopColor: palette.neutralLight
      }
    ],
    footerInner: [
      classNames.footerInner,
      sharedPaddingStyles,
      {
        paddingBottom: '20px',
        paddingTop: '20px'
      }
    ]
    // subComponentStyles: {
    //   iconButton: getIconButtonStyles(props)
    // }
  };
};
