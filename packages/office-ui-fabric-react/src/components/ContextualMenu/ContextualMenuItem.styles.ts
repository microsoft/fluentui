import { IContextualMenuItemStyleProps, IContextualMenuItemStyles } from './ContextualMenuItem.types';
import { HighContrastSelector, getFocusStyle, FontSizes, getGlobalClassNames, IStyle } from '@uifabric/styling';

const GlobalClassNames = {
  item: 'ms-ContextualMenu-item',
  divider: 'ms-ContextualMenu-divider',
  root: 'ms-ContextualMenu-link',
  isChecked: 'is-checked',
  isExpanded: 'is-expanded',
  isDisabled: 'is-disabled',
  linkContent: 'ms-ContextualMenu-linkContent',
  linkContentMenu: 'ms-ContextualMenu-linkContent',
  icon: 'ms-ContextualMenu-icon',
  checkmarkIcon: 'ms-ContextualMenu-checkmarkIcon',
  subMenuIcon: 'ms-ContextualMenu-submenuIcon',
  label: 'ms-ContextualMenu-itemText',
  secondaryText: 'ms-ContextualMenu-secondaryText'
};

export const ContextualMenuItemHeight = '32px';

export const getStyles = (props: IContextualMenuItemStyleProps): IContextualMenuItemStyles => {
  const {
    theme,
    disabled,
    expanded,
    checked,
    isAnchorLink,
    knownIcon,
    itemClassName,
    dividerClassName,
    iconClassName,
    subMenuClassName,
    primaryDisabled,
    className
  } = props;

  const { semanticColors, fonts } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const rootStyles: IStyle = [
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
  ];

  const rootChecked: IStyle = {
    selectors: {
      [HighContrastSelector]: {
        backgroundColor: 'Highlight',
        borderColor: 'Highlight',
        color: 'HighlightText',
        MsHighContrastAdjust: 'none'
      }
    }
  };

  const rootDisabled: IStyle = {
    color: semanticColors.disabledBodyText,
    cursor: 'default',
    pointerEvents: 'none',
    selectors: {
      [HighContrastSelector]: {
        color: 'GrayText',
        opacity: 1
      }
    }
  };

  const rootPressed: IStyle = {
    backgroundColor: semanticColors.menuItemBackgroundChecked,
    selectors: {
      [HighContrastSelector]: {
        backgroundColor: 'Highlight',
        borderColor: 'Highlight',
        color: 'HighlightText',
        MsHighContrastAdjust: 'none'
      }
    }
  };

  const rootFocused: IStyle = {
    backgroundColor: semanticColors.menuItemBackgroundHovered,
    selectors: {
      [HighContrastSelector]: {
        backgroundColor: 'Highlight',
        borderColor: 'Highlight',
        color: 'HighlightText',
        MsHighContrastAdjust: 'none'
      }
    }
  };

  const rootHovered: IStyle = {
    backgroundColor: semanticColors.menuItemBackgroundHovered,
    selectors: {
      [HighContrastSelector]: {
        backgroundColor: 'Highlight',
        borderColor: 'Highlight',
        color: 'HighlightText',
        MsHighContrastAdjust: 'none'
      }
    }
  };

  return {
    item: [
      classNames.item,
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
        backgroundColor: semanticColors.bodyDivider,
        position: 'relative'
      },
      dividerClassName
    ],
    root: [
      classNames.root,
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
      },
      checked && [
        classNames.isChecked,
        {
          selectors: {
            [HighContrastSelector]: {
              backgroundColor: 'Highlight',
              borderColor: 'Highlight',
              color: 'HighlightText',
              MsHighContrastAdjust: 'none'
            }
          }
        }
      ],
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
        classNames.isExpanded,
        {
          backgroundColor: semanticColors.menuItemBackgroundChecked,
          color: semanticColors.bodyTextChecked,
          selectors: {
            [HighContrastSelector]: {
              backgroundColor: 'Highlight',
              borderColor: 'Highlight',
              color: 'HighlightText',
              MsHighContrastAdjust: 'none'
            }
          }
        }
      ],
      disabled && [
        classNames.isDisabled,
        {
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
      ],
      !disabled &&
        !expanded && [
          {
            selectors: {
              ':hover': {
                backgroundColor: semanticColors.menuItemBackgroundHovered,
                selectors: {
                  [HighContrastSelector]: {
                    backgroundColor: 'Highlight',
                    borderColor: 'Highlight',
                    color: 'HighlightText',
                    MsHighContrastAdjust: 'none'
                  }
                }
              },
              ':active': {
                backgroundColor: semanticColors.menuItemBackgroundChecked,
                selectors: {
                  [HighContrastSelector]: {
                    backgroundColor: 'Highlight',
                    borderColor: 'Highlight',
                    color: 'HighlightText',
                    MsHighContrastAdjust: 'none'
                  }
                }
              },
              '.ms-Fabric--isFocusVisible &:focus, .ms-Fabric--isFocusVisible &:focus:hover': {
                backgroundColor: semanticColors.menuItemBackgroundHovered,
                selectors: {
                  [HighContrastSelector]: {
                    backgroundColor: 'Highlight',
                    borderColor: 'Highlight',
                    color: 'HighlightText',
                    MsHighContrastAdjust: 'none'
                  }
                }
              },
              '.ms-Fabric--isFocusVisible &:hover': { background: 'inherit;' }
            }
          }
        ],
      className
    ],
    splitPrimary: [
      rootStyles,
      checked && [classNames.isChecked, rootChecked],
      (disabled || primaryDisabled) && [classNames.isChecked, rootDisabled],
      !(disabled || primaryDisabled) &&
        !checked && [
          {
            selectors: {
              ':hover': rootHovered,
              ':active': rootPressed,
              '.ms-Fabric--isFocusVisible &:focus, .ms-Fabric--isFocusVisible &:focus:hover': rootFocused,
              '.ms-Fabric--isFocusVisible &:hover': { background: 'inherit;' }
            }
          }
        ]
    ],
    splitMenu: [
      rootStyles,
      {
        width: 32
      },
      checked && [classNames.isChecked, rootChecked],
      (disabled || primaryDisabled) && [classNames.isChecked, rootDisabled],
      !(disabled || primaryDisabled) &&
        !checked && [
          {
            selectors: {
              ':hover': rootHovered,
              ':active': rootPressed,
              '.ms-Fabric--isFocusVisible &:focus, .ms-Fabric--isFocusVisible &:focus:hover': rootFocused,
              '.ms-Fabric--isFocusVisible &:hover': { background: 'inherit;' }
            }
          }
        ]
    ],
    anchorLink: {
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
    linkContent: [
      classNames.linkContent,
      {
        whiteSpace: 'nowrap',
        height: 'inherit',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '100%'
      }
    ],
    linkContentMenu: [
      classNames.linkContentMenu,
      {
        whiteSpace: 'nowrap',
        height: 'inherit',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '100%'
      },
      {
        justifyContent: 'center'
      }
    ],
    icon: [
      classNames.icon,
      knownIcon &&
        'ms-ContextualMenu-iconColor ' && {
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
        },
      {
        display: 'inline-block',
        minHeight: '1px',
        maxHeight: ContextualMenuItemHeight,
        width: '14px',
        margin: '0 4px',
        verticalAlign: 'middle',
        flexShrink: '0'
      },
      iconClassName,
      disabled && ['is-disabled', { color: semanticColors.disabledBodyText }]
    ],
    iconColor: {
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
    },
    checkmarkIcon: [
      classNames.checkmarkIcon,
      knownIcon &&
        'ms-ContextualMenu-checkmarkIcon ' && {
          color: semanticColors.bodySubtext,
          selectors: {
            [HighContrastSelector]: {
              color: 'HighlightText'
            }
          }
        },
      {
        display: 'inline-block',
        minHeight: '1px',
        maxHeight: ContextualMenuItemHeight,
        width: '14px',
        margin: '0 4px',
        verticalAlign: 'middle',
        flexShrink: '0'
      },
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
        color: theme.palette.neutralSecondary,
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
              '.ms-Fabric--isFocusVisible &:focus, .ms-Fabric--isFocusVisible &:focus:hover': {
                backgroundColor: semanticColors.menuItemBackgroundHovered,
                selectors: {
                  [HighContrastSelector]: {
                    backgroundColor: 'Highlight',
                    borderColor: 'Highlight',
                    color: 'HighlightText',
                    MsHighContrastAdjust: 'none'
                  }
                }
              }
            }
          }
        ]
    ]
  };
};
