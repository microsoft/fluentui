import { PanelType } from './Panel.types';
import {
  AnimationClassNames,
  AnimationVariables,
  getGlobalClassNames,
  HighContrastSelector,
  ScreenWidthMinMedium,
  ScreenWidthMinLarge,
  ScreenWidthMinXLarge,
  ScreenWidthMinXXLarge,
  ScreenWidthMinUhfMobile,
  IconFontSizes,
} from '../../Styling';
import type { IPanelStyleProps, IPanelStyles } from './Panel.types';
import type { IStyle } from '../../Styling';

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
  customNear: 'ms-Panel--customLeft',
};

const panelWidth = {
  full: '100%',
  auto: 'auto',
  xs: 272,
  sm: 340,
  md1: 592,
  md2: 644,
  lg: 940,
};

const panelMargin = {
  auto: 'auto',
  none: 0,
  md: 48,
  lg: 428,
  xl: 176,
};

// Following consts are used below in `getPanelBreakpoints()` function to provide
// necessary fallbacks for different types of Panel in different breakpoints.
const smallPanelSelectors = {
  [`@media (min-width: ${ScreenWidthMinMedium}px)`]: {
    width: panelWidth.sm,
  },
};

const mediumPanelSelectors = {
  [`@media (min-width: ${ScreenWidthMinLarge}px)`]: {
    width: panelWidth.md1,
  },
  [`@media (min-width: ${ScreenWidthMinXLarge}px)`]: {
    width: panelWidth.md2,
  },
};

const largePanelSelectors = {
  [`@media (min-width: ${ScreenWidthMinUhfMobile}px)`]: {
    left: panelMargin.md,
    width: panelWidth.auto,
  },
  [`@media (min-width: ${ScreenWidthMinXXLarge}px)`]: {
    left: panelMargin.lg,
  },
};

const largeFixedPanelSelectors = {
  [`@media (min-width: ${ScreenWidthMinXXLarge}px)`]: {
    left: panelMargin.auto,
    width: panelWidth.lg,
  },
};

const extraLargePanelSelectors = {
  [`@media (min-width: ${ScreenWidthMinXXLarge}px)`]: {
    left: panelMargin.xl,
  },
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
        ...smallPanelSelectors,
      };
      break;
    case PanelType.medium:
      selectors = {
        ...smallPanelSelectors,
        ...mediumPanelSelectors,
      };
      break;
    case PanelType.large:
      selectors = {
        ...smallPanelSelectors,
        ...mediumPanelSelectors,
        ...largePanelSelectors,
      };
      break;
    case PanelType.largeFixed:
      selectors = {
        ...smallPanelSelectors,
        ...mediumPanelSelectors,
        ...largePanelSelectors,
        ...largeFixedPanelSelectors,
      };
      break;
    case PanelType.extraLarge:
      selectors = {
        ...smallPanelSelectors,
        ...mediumPanelSelectors,
        ...largePanelSelectors,
        ...extraLargePanelSelectors,
      };
      break;
    default:
      break;
  }

  return selectors;
};

const commandBarHeight = '44px';

const sharedPaddingStyles = {
  paddingLeft: '24px',
  paddingRight: '24px',
};

export const getStyles = (props: IPanelStyleProps): IPanelStyles => {
  const {
    className,
    focusTrapZoneClassName,
    hasCloseButton,
    headerClassName,
    isAnimating,
    isFooterSticky,
    isFooterAtBottom,
    isOnRightSide,
    isOpen,
    isHiddenOnDismiss,
    hasCustomNavigation,
    theme,
    type = PanelType.smallFixedFar,
  } = props;
  const { effects, fonts, semanticColors } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);
  const isCustomPanel = type === PanelType.custom || type === PanelType.customNear;

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
        bottom: 0,
      },
      isCustomPanel && isOnRightSide && classNames.custom,
      isCustomPanel && !isOnRightSide && classNames.customNear,
      className,
    ],
    overlay: [
      {
        pointerEvents: 'auto',
        cursor: 'pointer',
      },
      isOpen && isAnimating && AnimationClassNames.fadeIn100,
      !isOpen && isAnimating && AnimationClassNames.fadeOut100,
    ],
    hiddenPanel: [
      !isOpen &&
        !isAnimating &&
        isHiddenOnDismiss && {
          visibility: 'hidden',
        },
    ],
    main: [
      classNames.main,
      {
        backgroundColor: semanticColors.bodyBackground,
        boxShadow: effects.elevation64,
        pointerEvents: 'auto',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        bottom: 0,
        top: 0,
        // left, right, width are overridden depending on the type of the Panel and the screen breakpoint.
        left: panelMargin.auto,
        right: panelMargin.none,
        width: panelWidth.full,
        selectors: {
          [HighContrastSelector]: {
            borderLeft: `3px solid ${semanticColors.variantBorder}`,
            borderRight: `3px solid ${semanticColors.variantBorder}`,
          },
          ...getPanelBreakpoints(type),
        },
      },
      type === PanelType.smallFluid && {
        left: panelMargin.none,
      },
      type === PanelType.smallFixedNear && {
        left: panelMargin.none,
        right: panelMargin.auto,
        width: panelWidth.xs,
      },
      type === PanelType.customNear && {
        right: 'auto',
        left: 0,
      },
      isCustomPanel && {
        maxWidth: '100vw',
      },
      isOpen && isAnimating && !isOnRightSide && AnimationClassNames.slideRightIn40,
      isOpen && isAnimating && isOnRightSide && AnimationClassNames.slideLeftIn40,
      !isOpen && isAnimating && !isOnRightSide && AnimationClassNames.slideLeftOut40,
      !isOpen && isAnimating && isOnRightSide && AnimationClassNames.slideRightOut40,
      focusTrapZoneClassName,
    ],
    commands: [
      classNames.commands,
      {
        paddingTop: 18,
        selectors: {
          [`@media (min-height: ${ScreenWidthMinMedium}px)`]: {
            position: 'sticky',
            top: 0,
            zIndex: 1,
          },
        },
      },
      hasCustomNavigation && {
        marginTop: 'inherit',
      },
      // - Ensures that the sticky header always has a background to prevent overlaps on scroll.
      // - Adds consistent behavior with how Footer is being handled
      isFooterSticky && {
        backgroundColor: semanticColors.bodyBackground,
      },
    ],
    navigation: [
      classNames.navigation,
      {
        display: 'flex',
        justifyContent: 'flex-end',
      },
      hasCustomNavigation && {
        height: commandBarHeight,
      },
    ],
    contentInner: [
      classNames.contentInner,
      {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflowY: 'hidden',
      },
    ],
    header: [
      classNames.header,
      sharedPaddingStyles,
      {
        alignSelf: 'flex-start',
      },
      hasCloseButton &&
        !hasCustomNavigation && {
          flexGrow: 1,
        },
      hasCustomNavigation && {
        // Ensure that title doesn't shrink if screen is too small
        flexShrink: 0,
      },
    ],
    headerText: [
      classNames.headerText,
      fonts.xLarge,
      {
        color: semanticColors.bodyText,
        lineHeight: '27px',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        wordBreak: 'break-word',
        hyphens: 'auto',
      },
      headerClassName,
    ],
    scrollableContent: [
      classNames.scrollableContent,
      {
        overflowY: 'auto',
      },
      isFooterAtBottom && {
        flexGrow: 1,
        display: 'inherit',
        flexDirection: 'inherit',
      },
    ],
    content: [
      classNames.content,
      sharedPaddingStyles,
      {
        paddingBottom: 20,
      },
      isFooterAtBottom && {
        selectors: {
          [`@media (min-height: ${ScreenWidthMinMedium}px)`]: {
            flexGrow: 1,
          },
        },
      },
    ],
    footer: [
      classNames.footer,
      {
        // Ensure that footer doesn't shrink if screen is too small
        flexShrink: 0,
        borderTop: '1px solid transparent',
        transition: `opacity ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction2}`,
        selectors: {
          [`@media (min-height: ${ScreenWidthMinMedium}px)`]: {
            position: 'sticky',
            bottom: 0,
          },
        },
      },
      isFooterSticky && {
        backgroundColor: semanticColors.bodyBackground,
        borderTopColor: semanticColors.variantBorder,
      },
    ],
    footerInner: [
      classNames.footerInner,
      sharedPaddingStyles,
      {
        paddingBottom: 16,
        paddingTop: 16,
      },
    ],
    subComponentStyles: {
      closeButton: {
        root: [
          classNames.closeButton,
          {
            marginRight: 14,
            color: theme.palette.neutralSecondary,
            fontSize: IconFontSizes.large,
          },
          hasCustomNavigation && {
            marginRight: 0,
            height: 'auto',
            width: '44px',
          },
        ],
        rootHovered: {
          color: theme.palette.neutralPrimary,
        },
      },
    },
  };
};
