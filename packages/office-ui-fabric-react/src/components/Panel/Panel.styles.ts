import { IPanelStyleProps, IPanelStyles } from './Panel.types';
import {
  AnimationClassNames,
  AnimationVariables,
  FontSizes,
  getGlobalClassNames,
  ScreenWidthMinMedium,
  ScreenWidthMinXLarge,
  ScreenWidthMinXXLarge,
  ScreenWidthMinUhfMobile
} from '../../Styling';

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
  custom: 'ms-Panel--custom'
};

export const getStyles = (props: IPanelStyleProps): IPanelStyles => {
  const {
    className,
    focusTrapZoneClassName,
    hasCloseButton,
    isAnimating,
    isFooterAtBottom,
    isFooterSticky,
    isOnRightSide,
    isOpen,
    isHiddenOnDismiss,
    theme
  } = props;
  const { palette } = theme;

  const panelSize = {
    width: {
      xs: '272px',
      sm: '340px',
      md: '643px',
      lg: '940px'
    },
    margin: {
      md: '48px',
      lg: '428px',
      xl: '176px'
    }
  };
  const commandBarHeight = '44px';

  const sharedPaddingStyles = {
    paddingLeft: '16px',
    paddingRight: '16px',
    selectors: {
      ['@media (min-width: ' + ScreenWidthMinUhfMobile + ')']: {
        paddingLeft: '32px',
        paddingRight: '32px'
      },
      ['@media (min-width: ' + ScreenWidthMinXXLarge + ')']: {
        paddingLeft: '40px',
        paddingRight: '40px'
      }
    }
  };

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
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
      !isOpen &&
        !isAnimating &&
        isHiddenOnDismiss && {
          visibility: 'hidden'
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
      isOpen && {
        cursor: 'pointer',
        pointerEvents: 'auto'
      },
      isOpen && isAnimating && AnimationClassNames.fadeIn200,
      !isOpen && isAnimating && AnimationClassNames.fadeOut200
    ],
    hiddenPanel: [
      !isOpen &&
        !isAnimating &&
        isHiddenOnDismiss && {
          visibility: 'hidden'
          // visibility: 'visible'
        }
    ],
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
            width: panelSize.width.sm,
            // width: '340px',
            boxShadow: '-30px, 0px, 30px, -30px, .2',
            left: 'auto'
          }
        }
      },
      isOpen && {
        pointerEvents: 'auto'
      },
      isOpen && isAnimating && !isOnRightSide && AnimationClassNames.slideRightIn40,
      isOpen && isAnimating && isOnRightSide && AnimationClassNames.slideLeftIn40,
      !isOpen && isAnimating && !isOnRightSide && AnimationClassNames.slideLeftOut40,
      !isOpen && isAnimating && isOnRightSide && AnimationClassNames.slideRightOut40,
      focusTrapZoneClassName
    ],
    commands: [classNames.commands],
    contentInner: [
      classNames.contentInner,
      {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflowY: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        WebkitOverflowScrolling: 'touch',
        /* Force hw accelleration on scrollable region */
        transform: 'translateZ(0)'
      },
      hasCloseButton && {
        selectors: {
          '$root &': {
            top: commandBarHeight
          }
        }
      }
    ],
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
    header: [
      classNames.header,
      sharedPaddingStyles,
      {
        margin: '14px 0',
        // Ensure that title doesn't shrink if screen is too small
        flexGrow: 0,
        selectors: {
          ['@media (min-width: ' + ScreenWidthMinXLarge + ')']: {
            marginTop: '30px'
          }
        }
      }
    ],
    headerText: [
      classNames.headerText,
      {
        fontSize: FontSizes.xLarge,
        color: palette.neutralPrimary,
        lineHeight: '32px',
        margin: 0
      }
    ],
    content: [
      classNames.content,
      sharedPaddingStyles,
      {
        marginBottom: 0,
        paddingBottom: '20px',
        overflowY: 'auto'
      },
      isFooterAtBottom && {
        flexGrow: 1
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
  };
};
