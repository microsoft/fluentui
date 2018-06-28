import { IContextualMenuItemStyleProps, IContextualMenuItemStyles } from './ContextualMenuItem.types';
import { FontSizes, getGlobalClassNames, getFocusStyle, HighContrastSelector, IStyle } from '../../Styling';

export interface ISharedStyles {
  highContrastStyles: IStyle;
  iconStyles: IStyle;
  linkContent: IStyle;
  rootStyles: IStyle;
  disabled: IStyle;
}

const GlobalClassNames = {
  root: 'ms-ContextualMenu-link',
  item: 'ms-ContextualMenu-item',
  divider: 'ms-ContextualMenu-divider',
  linkContent: 'ms-ContextualMenu-linkContent',
  icon: 'ms-ContextualMenu-icon',
  knownIcon: 'ms-ContextualMenu-iconColor',
  checkmarkIcon: 'ms-ContextualMenu-checkmarkIcon',
  subMenuIcon: 'ms-ContextualMenu-submenuIcon',
  label: 'ms-ContextualMenu-itemText',
  secondaryText: 'ms-ContextualMenu-secondaryText',
  linkContentMenu: 'ms-ContextualMenu-linkContent',
  disabled: 'is-disabled',
  checked: 'is-checked',
  expanded: 'is-expanded'
};

export const getStyles = (props: IContextualMenuItemStyleProps): IContextualMenuItemStyles => {
  const {
    checked,
    className,
    disabled,
    dividerClassName,
    expanded,
    iconClassName,
    itemClassName,
    isAnchorLink,
    knownIcon,
    primaryDisabled,
    subMenuClassName,
    theme
  } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const { palette, semanticColors, fonts } = theme;

  const ContextualMenuItemBackgroundHoverColor = semanticColors.menuItemBackgroundHovered;
  const ContextualMenuItemBackgroundSelectedColor = semanticColors.menuItemBackgroundChecked;
  const ContextualMenuItemDividerColor = semanticColors.bodyDivider;

  const ContextualMenuItemHeight = '32px';

  const sharedStyles: ISharedStyles = {
    rootStyles: [
      getFocusStyle(theme),
      fonts.medium,
      {
        color: 'inherit',
        backgroundColor: 'transparent',
        border: 'none',
        width: '100%',
        height: ContextualMenuItemHeight,
        lineHeight: ContextualMenuItemHeight,
        display: 'block',
        cursor: 'pointer',
        padding: '0px 6px',
        textAlign: 'left'
      }
    ],
    highContrastStyles: {
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'Highlight',
          borderColor: 'Highlight',
          color: 'HighlightText',
          MsHighContrastAdjust: 'none'
        }
      }
    },
    iconStyles: {
      display: 'inline-block',
      minHeight: '1px',
      maxHeight: ContextualMenuItemHeight,
      width: '14px',
      margin: '0 4px',
      verticalAlign: 'middle',
      flexShrink: '0'
    },
    linkContent: {
      height: ContextualMenuItemHeight,
      lineHeight: ContextualMenuItemHeight,
      textAlign: 'center',
      display: 'inline-block',
      verticalAlign: 'middle',
      flexShrink: '0',
      fontSize: FontSizes.mini
    },
    disabled: {
      color: semanticColors.disabledBodyText,
      cursor: 'default',
      pointerEvents: 'none',
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
          opacity: 1
        }
      }
    }
  };

  return {
    root: [
      classNames.root,
      sharedStyles.rootStyles,
      checked && [classNames.checked, sharedStyles.highContrastStyles],
      isAnchorLink && {
        padding: '0px 6px',
        textRendering: 'auto',
        color: 'inherit',
        letterSpacing: 'normal',
        wordSpacing: 'normal',
        textTransform: 'none',
        textIndent: '0px',
        textShadow: 'none',
        textDecoration: 'none',
        boxSizing: 'border-box'
      },
      expanded && [
        classNames.expanded,
        {
          backgroundColor: ContextualMenuItemBackgroundSelectedColor,
          color: semanticColors.bodyTextChecked
        },
        sharedStyles.highContrastStyles
      ],
      disabled && [classNames.disabled, sharedStyles.disabled],
      !disabled &&
        !expanded && [
          {
            selectors: {
              ':hover': [
                sharedStyles.highContrastStyles,
                {
                  backgroundColor: ContextualMenuItemBackgroundHoverColor
                }
              ],
              ':active': [
                sharedStyles.highContrastStyles,
                {
                  backgroundColor: ContextualMenuItemBackgroundSelectedColor
                }
              ],
              '.ms-Fabric--isFocusVisible &:focus, .ms-Fabric--isFocusVisible &:focus:hover': [
                sharedStyles.highContrastStyles,
                {
                  backgroundColor: ContextualMenuItemBackgroundHoverColor
                }
              ],
              '.ms-Fabric--isFocusVisible &:hover': {
                background: 'inherit;'
              }
            }
          }
        ],
      className
    ],
    item: [
      classNames.icon,
      fonts.medium,
      {
        color: semanticColors.bodyText,
        position: 'relative',
        boxSizing: 'border-box'
      },
      itemClassName
    ],
    divider: [
      classNames.divider,
      {
        display: 'block',
        height: '1px',
        backgroundColor: ContextualMenuItemDividerColor,
        position: 'relative'
      },
      dividerClassName
    ],
    linkContent: [classNames.linkContent, sharedStyles.linkContent],
    icon: [
      classNames.icon,
      knownIcon && [
        classNames.knownIcon && {
          color: semanticColors.menuIcon,
          selectors: {
            [HighContrastSelector]: {
              color: 'inherit'
            },
            ['$root:hover &']: {
              selectors: {
                [HighContrastSelector]: {
                  color: 'HighlightText'
                }
              }
            },
            ['$root:focus &']: {
              selectors: {
                [HighContrastSelector]: {
                  color: 'HighlightText'
                }
              }
            }
          }
        }
      ],
      sharedStyles.iconStyles,
      iconClassName,
      disabled && [
        classNames.disabled,
        {
          color: semanticColors.disabledBodyText
        }
      ]
    ],
    checkmarkIcon: [
      classNames.checkmarkIcon,
      knownIcon &&
        classNames.checkmarkIcon && {
          color: semanticColors.bodySubtext,
          selectors: {
            [HighContrastSelector]: {
              color: 'HighlightText'
            }
          }
        },
      sharedStyles.iconStyles,
      iconClassName
    ],
    subMenuIcon: [
      classNames.subMenuIcon,
      {
        height: ContextualMenuItemHeight,
        lineHeight: ContextualMenuItemHeight,
        textAlign: 'center',
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: '0',
        fontSize: FontSizes.mini
      },
      subMenuClassName
    ],
    label: [
      classNames.label,
      {
        margin: '0 4px',
        verticalAlign: 'middle',
        display: 'inline-block',
        flexGrow: '1',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }
    ],
    secondaryText: [
      classNames.secondaryText,
      {
        color: palette.neutralTertiary,
        paddingLeft: '20px',
        textAlign: 'right'
      }
    ],
    splitContainer: [
      getFocusStyle(theme),
      {
        display: 'flex',
        height: ContextualMenuItemHeight,
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center'
      },
      !disabled &&
        !checked && [
          {
            selectors: {
              '.ms-Fabric--isFocusVisible &:focus, .ms-Fabric--isFocusVisible &:focus:hover': [
                sharedStyles.highContrastStyles,
                {
                  backgroundColor: ContextualMenuItemBackgroundHoverColor
                }
              ]
            }
          }
        ]
    ],
    splitPrimary: [
      sharedStyles.rootStyles,
      checked && [classNames.checked, sharedStyles.highContrastStyles],
      (disabled || primaryDisabled) && [classNames.disabled, sharedStyles.disabled],
      !(disabled || primaryDisabled) &&
        !checked && [
          {
            selectors: {
              ':hover': [
                sharedStyles.highContrastStyles,
                {
                  backgroundColor: ContextualMenuItemBackgroundHoverColor
                }
              ],
              ':active': [
                sharedStyles.highContrastStyles,
                {
                  backgroundColor: ContextualMenuItemBackgroundSelectedColor
                }
              ],
              '.ms-Fabric--isFocusVisible &:focus, .ms-Fabric--isFocusVisible &:focus:hover': [
                sharedStyles.highContrastStyles,
                {
                  backgroundColor: ContextualMenuItemBackgroundHoverColor
                }
              ],
              '.ms-Fabric--isFocusVisible &:hover': { background: 'inherit;' }
            }
          }
        ]
    ],
    splitMenu: [
      sharedStyles.rootStyles,
      {
        width: 32
      },
      expanded && [
        classNames.expanded,
        sharedStyles.highContrastStyles,
        {
          backgroundColor: ContextualMenuItemBackgroundSelectedColor,
          color: semanticColors.bodyTextChecked
        }
      ],
      disabled && [classNames.disabled, sharedStyles.disabled],
      !disabled &&
        !expanded && [
          {
            selectors: {
              ':hover': [
                sharedStyles.highContrastStyles,
                {
                  backgroundColor: ContextualMenuItemBackgroundHoverColor
                }
              ],
              ':active': [
                sharedStyles.highContrastStyles,
                {
                  backgroundColor: ContextualMenuItemBackgroundSelectedColor
                }
              ],
              '.ms-Fabric--isFocusVisible &:focus, .ms-Fabric--isFocusVisible &:focus:hover': [
                sharedStyles.highContrastStyles,
                {
                  backgroundColor: ContextualMenuItemBackgroundHoverColor
                }
              ],
              '.ms-Fabric--isFocusVisible &:hover': { background: 'inherit;' }
            }
          }
        ]
    ],
    linkContentMenu: [
      classNames.linkContentMenu,
      sharedStyles.linkContent,
      {
        justifyContent: 'center'
      }
    ]
  };
};
