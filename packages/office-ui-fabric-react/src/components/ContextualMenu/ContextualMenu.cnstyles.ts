import {
  concatStyleSets,
  FontSizes,
  FontWeights,
  getFocusStyle,
  HighContrastSelector,
  IRawStyle,
  ITheme
} from '../../Styling';
import { IContextualMenuStyles, IMenuItemStyles } from './ContextualMenu.types';
import { memoizeFunction } from '../../Utilities';

export const CONTEXTUAL_MENU_ITEM_HEIGHT = '32px';

const getItemHighContrastStyles = memoizeFunction(
  (): IRawStyle => {
    return {
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'Highlight',
          borderColor: 'Highlight',
          color: 'HighlightText',
          MsHighContrastAdjust: 'none'
        }
      }
    };
  }
);

export const getMenuItemStyles = memoizeFunction(
  (theme: ITheme): IMenuItemStyles => {
    const { semanticColors, fonts } = theme;
    const ContextualMenuItemBackgroundHoverColor = semanticColors.menuItemBackgroundHovered;
    const ContextualMenuItemBackgroundSelectedColor = semanticColors.menuItemBackgroundChecked;
    const ContextualMenuItemDividerColor = semanticColors.bodyDivider;

    const menuItemStyles: IMenuItemStyles = {
      item: [
        fonts.medium,
        {
          color: semanticColors.bodyText,
          position: 'relative',
          boxSizing: 'border-box'
        }
      ],
      divider: {
        display: 'block',
        height: '1px',
        backgroundColor: ContextualMenuItemDividerColor,
        position: 'relative'
      },
      root: [
        getFocusStyle(theme),
        fonts.medium,
        {
          color: semanticColors.bodyText,
          backgroundColor: 'transparent',
          border: 'none',
          width: '100%',
          height: CONTEXTUAL_MENU_ITEM_HEIGHT,
          lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT,
          display: 'block',
          cursor: 'pointer',
          padding: '0px 6px',
          textAlign: 'left'
        }
      ],
      rootDisabled: {
        color: semanticColors.disabledBodyText,
        cursor: 'default',
        pointerEvents: 'none',
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText',
            opacity: 1
          }
        }
      },
      rootHovered: {
        backgroundColor: ContextualMenuItemBackgroundHoverColor,
        ...getItemHighContrastStyles()
      },
      rootFocused: {
        backgroundColor: ContextualMenuItemBackgroundHoverColor,
        ...getItemHighContrastStyles()
      },
      rootChecked: {
        ...getItemHighContrastStyles()
      },
      rootPressed: {
        backgroundColor: ContextualMenuItemBackgroundSelectedColor,
        ...getItemHighContrastStyles()
      },
      rootExpanded: {
        backgroundColor: ContextualMenuItemBackgroundSelectedColor,
        color: semanticColors.bodyTextChecked,
        ...getItemHighContrastStyles()
      },
      linkContent: {
        whiteSpace: 'nowrap',
        height: 'inherit',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '100%'
      },
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
      label: {
        margin: '0 4px',
        verticalAlign: 'middle',
        display: 'inline-block',
        flexGrow: '1',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      },
      secondaryText: {
        color: theme.palette.neutralSecondary,
        paddingLeft: '20px',
        textAlign: 'right'
      },
      icon: {
        display: 'inline-block',
        minHeight: '1px',
        maxHeight: CONTEXTUAL_MENU_ITEM_HEIGHT,
        width: '14px',
        margin: '0 4px',
        verticalAlign: 'middle',
        flexShrink: '0'
      },
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
      iconDisabled: {
        color: semanticColors.disabledBodyText
      },
      checkmarkIcon: {
        color: semanticColors.bodySubtext,
        selectors: {
          [HighContrastSelector]: {
            color: 'HighlightText'
          }
        }
      },
      subMenuIcon: {
        height: CONTEXTUAL_MENU_ITEM_HEIGHT,
        lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT,
        textAlign: 'center',
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: '0',
        fontSize: FontSizes.mini
      },
      splitButtonFlexContainer: [
        getFocusStyle(theme),
        {
          display: 'flex',
          height: CONTEXTUAL_MENU_ITEM_HEIGHT,
          flexWrap: 'nowrap',
          justifyContent: 'center',
          alignItems: 'center'
        }
      ]
    };

    return concatStyleSets(menuItemStyles);
  }
);

export const getStyles = memoizeFunction(
  (theme: ITheme): IContextualMenuStyles => {
    const { semanticColors, fonts } = theme;

    const ContextualMenuBackground = semanticColors.bodyBackground;
    const ContextualMenuHeaderColor = semanticColors.menuHeader;

    const styles: IContextualMenuStyles = {
      root: {
        backgroundColor: ContextualMenuBackground,
        minWidth: '180px'
      },
      container: {},
      list: {
        listStyleType: 'none',
        margin: '0',
        padding: '0',
        lineHeight: '0'
      },
      title: {
        fontSize: '16px',
        paddingRight: '14px',
        paddingLeft: '14px',
        paddingBottom: '5px',
        paddingTop: '5px',
        backgroundColor: theme.palette.neutralLight
      },
      header: [
        fonts.small,
        {
          fontWeight: FontWeights.semibold,
          color: ContextualMenuHeaderColor,
          background: 'none',
          backgroundColor: 'transparent',
          border: 'none',
          height: CONTEXTUAL_MENU_ITEM_HEIGHT,
          lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT,
          cursor: 'default',
          padding: '0px 6px',
          userSelect: 'none',
          textAlign: 'left'
        }
      ]
    };
    return concatStyleSets(styles);
  }
);
