import {
  concatStyleSets,
  getFocusStyle,
  HighContrastSelector,
  IRawStyle,
  ITheme,
  getScreenSelector,
  ScreenWidthMaxMedium,
  IconFontSizes,
  getHighContrastNoAdjustStyle,
} from '../../Styling';
import { IMenuItemStyles } from './ContextualMenu.types';
import { memoizeFunction } from '../../Utilities';

export const CONTEXTUAL_MENU_ITEM_HEIGHT = 36;

const MediumScreenSelector = getScreenSelector(0, ScreenWidthMaxMedium);

const getItemHighContrastStyles = memoizeFunction(
  (): IRawStyle => {
    return {
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'Highlight',
          borderColor: 'Highlight',
          color: 'HighlightText',
          ...getHighContrastNoAdjustStyle(),
        },
      },
    };
  },
);

export const getMenuItemStyles = memoizeFunction(
  (theme: ITheme): IMenuItemStyles => {
    const { semanticColors, fonts, palette } = theme;
    const ContextualMenuItemBackgroundHoverColor = semanticColors.menuItemBackgroundHovered;
    const ContextualMenuItemTextHoverColor = semanticColors.menuItemTextHovered;
    const ContextualMenuItemBackgroundSelectedColor = semanticColors.menuItemBackgroundPressed;
    const ContextualMenuItemDividerColor = semanticColors.bodyDivider;

    const menuItemStyles: IMenuItemStyles = {
      item: [
        fonts.medium,
        {
          color: semanticColors.bodyText,
          position: 'relative',
          boxSizing: 'border-box',
        },
      ],
      divider: {
        display: 'block',
        height: '1px',
        backgroundColor: ContextualMenuItemDividerColor,
        position: 'relative',
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
          padding: '0px 8px 0 4px', // inner elements have a margin of 4px (4 + 4 = 8px as on right side)
          textAlign: 'left',
        },
      ],
      rootDisabled: {
        color: semanticColors.disabledBodyText,
        cursor: 'default',
        pointerEvents: 'none',
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText',
            opacity: 1,
            ...getHighContrastNoAdjustStyle(),
          },
        },
      },
      rootHovered: {
        backgroundColor: ContextualMenuItemBackgroundHoverColor,
        color: ContextualMenuItemTextHoverColor,
        selectors: {
          '.ms-ContextualMenu-icon': {
            color: palette.themeDarkAlt,
          },
          '.ms-ContextualMenu-submenuIcon': {
            color: palette.neutralPrimary,
          },
        },
        ...getItemHighContrastStyles(),
      },
      rootFocused: {
        backgroundColor: palette.white,
        ...getItemHighContrastStyles(),
      },
      rootChecked: {
        selectors: {
          '.ms-ContextualMenu-checkmarkIcon': {
            color: palette.neutralPrimary,
          },
        },
        ...getItemHighContrastStyles(),
      },
      rootPressed: {
        backgroundColor: ContextualMenuItemBackgroundSelectedColor,
        selectors: {
          '.ms-ContextualMenu-icon': {
            color: palette.themeDark,
          },
          '.ms-ContextualMenu-submenuIcon': {
            color: palette.neutralPrimary,
          },
        },
        ...getItemHighContrastStyles(),
      },
      rootExpanded: {
        backgroundColor: ContextualMenuItemBackgroundSelectedColor,
        color: semanticColors.bodyTextChecked,
        ...getItemHighContrastStyles(),
      },
      linkContent: {
        whiteSpace: 'nowrap',
        height: 'inherit',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '100%',
      },
      anchorLink: {
        padding: '0px 8px 0 4px', // inner elements have a margin of 4px (4 + 4 = 8px as on right side)
        textRendering: 'auto',
        color: 'inherit',
        letterSpacing: 'normal',
        wordSpacing: 'normal',
        textTransform: 'none',
        textIndent: '0px',
        textShadow: 'none',
        textDecoration: 'none',
        boxSizing: 'border-box',
      },
      label: {
        margin: '0 4px',
        verticalAlign: 'middle',
        display: 'inline-block',
        flexGrow: '1',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
      secondaryText: {
        color: theme.palette.neutralSecondary,
        paddingLeft: '20px',
        textAlign: 'right',
      },
      icon: {
        display: 'inline-block',
        minHeight: '1px',
        maxHeight: CONTEXTUAL_MENU_ITEM_HEIGHT,
        fontSize: IconFontSizes.medium,
        width: IconFontSizes.medium,
        margin: '0 4px',
        verticalAlign: 'middle',
        flexShrink: '0',
        selectors: {
          [MediumScreenSelector]: {
            fontSize: IconFontSizes.large,
            width: IconFontSizes.large,
          },
        },
      },
      iconColor: {
        color: semanticColors.menuIcon,
        selectors: {
          [HighContrastSelector]: {
            color: 'inherit',
          },
          ['$root:hover &']: {
            selectors: {
              [HighContrastSelector]: {
                color: 'HighlightText',
              },
            },
          },
          ['$root:focus &']: {
            selectors: {
              [HighContrastSelector]: {
                color: 'HighlightText',
              },
            },
          },
        },
      },
      iconDisabled: {
        color: semanticColors.disabledBodyText,
      },
      checkmarkIcon: {
        color: semanticColors.bodySubtext,
        selectors: {
          [HighContrastSelector]: {
            color: 'HighlightText',
          },
        },
      },
      subMenuIcon: {
        height: CONTEXTUAL_MENU_ITEM_HEIGHT,
        lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT,
        color: palette.neutralSecondary,
        textAlign: 'center',
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: '0',
        fontSize: IconFontSizes.small, // 12px
        selectors: {
          ':hover': {
            color: palette.neutralPrimary,
          },
          ':active': {
            color: palette.neutralPrimary,
          },
          [MediumScreenSelector]: {
            fontSize: IconFontSizes.medium, // 16px
          },
          [HighContrastSelector]: {
            color: 'HighlightText',
          },
        },
      },
      splitButtonFlexContainer: [
        getFocusStyle(theme),
        {
          display: 'flex',
          height: CONTEXTUAL_MENU_ITEM_HEIGHT,
          flexWrap: 'nowrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
        },
      ],
    };

    return concatStyleSets(menuItemStyles);
  },
);
