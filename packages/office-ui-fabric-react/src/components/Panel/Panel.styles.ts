import { IPanelStyleProps, IPanelStyles, PanelType } from './Panel.types';
import {
  AnimationClassNames,
  AnimationVariables,
  DefaultFontStyles,
  getGlobalClassNames,
  ScreenWidthMinMedium,
  ScreenWidthMinXLarge,
  ScreenWidthMinXXLarge,
  ScreenWidthMinUhfMobile
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
  custom: 'ms-Panel--custom'
};

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
    ['@media screen and (min-width: ' + ScreenWidthMinUhfMobile + 'px)']: {
      paddingLeft: '32px',
      paddingRight: '32px'
    },
    ['@media screen and (min-width: ' + ScreenWidthMinXXLarge + 'px)']: {
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
    type
  } = props;
  const { palette } = theme;

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
          ['@media (min-width: ' + ScreenWidthMinMedium + 'px)']: {
            borderLeft: `1px solid ${palette.neutralLight}`,
            borderRight: `1px solid ${palette.neutralLight}`,
            pointerEvents: 'auto',
            width: panelSize.width.sm,
            boxShadow: '-30px 0px 30px -30px rgba(0,0,0,0.2)',
            left: 'auto'
          },
          '$root &': [
            isOpen && {
              pointerEvents: 'auto'
            },
            type === PanelType.smallFluid && {
              width: '100%'
            },
            type === PanelType.smallFixedNear && {
              right: 'auto',
              left: 0,
              width: panelSize.width.xs,
              boxShadow: '30px 0px 30px -30px rgba(0,0,0,0.2)'
            },
            type === PanelType.smallFixedFar && {
              width: panelSize.width.xs,
              selectors: {
                ['@media (min-width: ' + ScreenWidthMinMedium + 'px)']: {
                  width: panelSize.width.sm
                }
              }
            },
            type === PanelType.medium && {
              selectors: {
                ['@media (min-width: ' + ScreenWidthMinUhfMobile + 'px)']: {
                  left: panelSize.margin.md,
                  width: 'auto'
                },
                ['@media (min-width: ' + ScreenWidthMinXLarge + 'px)']: {
                  left: 'auto',
                  width: panelSize.width.md
                }
              }
            },
            (type === PanelType.large || type === PanelType.largeFixed) && {
              selectors: {
                ['@media (min-width: ' + ScreenWidthMinUhfMobile + 'px)']: {
                  left: panelSize.margin.md,
                  width: 'auto'
                },
                ['@media (min-width: ' + ScreenWidthMinXXLarge + 'px)']: {
                  left: panelSize.margin.lg
                }
              }
            },
            type === PanelType.largeFixed && {
              selectors: {
                ['@media (min-width: ' + ScreenWidthMinXXLarge + 'px)']: {
                  left: 'auto',
                  width: panelSize.width.lg
                }
              }
            },
            type === PanelType.extraLarge && {
              selectors: {
                ['@media (min-width: ' + ScreenWidthMinUhfMobile + 'px)']: {
                  left: panelSize.margin.md,
                  width: 'auto'
                },
                ['@media (min-width: ' + ScreenWidthMinXXLarge + 'px)']: {
                  left: panelSize.margin.xl
                }
              }
            },
            type === PanelType.custom && {
              maxWidth: '100vw'
            }
          ]
        }
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
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        WebkitOverflowScrolling: 'touch',
        /* Force hw accelleration on scrollable region */
        transform: 'translateZ(0)'
      },
      hasCloseButton && {
        top: commandBarHeight,
        minHeight: `calc(100% - ${commandBarHeight})`
      }
    ],
    scrollableContent: [
      classNames.scrollableContent,
      {
        height: '100%',
        overflowY: 'auto',
        flexGrow: 1
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
          ['@media (min-width: ' + ScreenWidthMinXLarge + 'px)']: {
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
    // subComponentStyles: {
    //   iconButton: getIconButtonStyles(props)
    // }
  };
};
