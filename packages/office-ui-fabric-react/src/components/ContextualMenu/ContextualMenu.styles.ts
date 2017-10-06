import { memoizeFunction } from '../../Utilities';
import { IContextualMenuStyles, IMenuItemStyles } from './ContextualMenu.Props';
import {
  ITheme,
  IRawStyle,
  concatStyleSets,
  FontWeights,
  getFocusStyle
} from '../../Styling';

const MS_HIGHCONTRAST_ACTIVE = '@media screen and (-ms-high-contrast: active) &';

const ContextualMenuItemHeight = '32px';
const ContextualMenuIconWidth = '14px';

<<<<<<< HEAD
const getItemHighContrastStyles = memoizeFunction((theme: ITheme): IRawStyle => {
=======
const getItemHighContrastStyles = memoizeFunction((): IRawStyle => {
>>>>>>> 6afb02d1bd8df56ee61966308148678741ee1ee9
  return {
    selectors: {
      [MS_HIGHCONTRAST_ACTIVE]: {
        backgroundColor: 'Highlight',
        borderColor: 'Highlight',
        color: 'HighlightText',
        MsHighContrastAdjust: 'none'
      }
    },
  };
});

export const getMenuItemStyles = memoizeFunction((
  theme: ITheme,
): IMenuItemStyles => {
  const { semanticColors, fonts } = theme;
  const ContextualMenuIconColor = semanticColors.menuIcon;
  const ContextualMenuTextColor = semanticColors.bodyText;
  const ContextualMenuItemBackgroundHoverColor = semanticColors.menuItemBackgroundHovered;
  const ContextualMenuItemBackgroundSelectedColor = semanticColors.menuItemBackgroundChecked;
  const ContextualMenuTextSelectedColor = semanticColors.menuSelectedText;
  const ContextualMenuTextDisabledColor = semanticColors.disabledText;

  const menuItemStyles: IMenuItemStyles = {
    item: [
      fonts.medium,
      {
        color: ContextualMenuTextColor,
        position: 'relative',
        boxSizing: 'border-box',
      }],
    root: [
      getFocusStyle(theme),
      {
        font: 'inherit',
        color: 'inherit',
        backgroundColor: 'transparent',
        border: 'none',
        width: '100%',
        height: ContextualMenuItemHeight,
        lineHeight: ContextualMenuItemHeight,
        display: 'block',
        cursor: 'pointer',
        padding: '0px 6px',
        textAlign: 'left',
      },
    ],
    rootDisabled: {
      color: ContextualMenuTextDisabledColor,
      cursor: 'default',
      pointerEvents: 'none',
    },
    rootHovered: {
      backgroundColor: ContextualMenuItemBackgroundHoverColor,
<<<<<<< HEAD
      ...getItemHighContrastStyles(theme)
    },
    rootFocused: {
      backgroundColor: ContextualMenuItemBackgroundHoverColor,
      ...getItemHighContrastStyles(theme)
    },
    rootChecked: {
      backgroundColor: ContextualMenuItemBackgroundSelectedColor,
      ...getItemHighContrastStyles(theme)
    },
    rootPressed: {
      backgroundColor: ContextualMenuItemBackgroundSelectedColor,
      ...getItemHighContrastStyles(theme)
=======
      ...getItemHighContrastStyles()
    },
    rootFocused: {
      backgroundColor: ContextualMenuItemBackgroundHoverColor,
      ...getItemHighContrastStyles()
    },
    rootChecked: {
      backgroundColor: ContextualMenuItemBackgroundSelectedColor,
      ...getItemHighContrastStyles()
    },
    rootPressed: {
      backgroundColor: ContextualMenuItemBackgroundSelectedColor,
      ...getItemHighContrastStyles()
>>>>>>> 6afb02d1bd8df56ee61966308148678741ee1ee9
    },
    rootExpanded: {
      backgroundColor: ContextualMenuItemBackgroundSelectedColor,
      color: ContextualMenuTextSelectedColor,
      fontWeight: FontWeights.semibold,
<<<<<<< HEAD
      ...getItemHighContrastStyles(theme)
=======
      ...getItemHighContrastStyles()
>>>>>>> 6afb02d1bd8df56ee61966308148678741ee1ee9
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
    icon: {
      display: 'inline-block',
      minHeight: '1px',
      maxHeight: ContextualMenuItemHeight,
      width: ContextualMenuIconWidth,
      margin: '0 4px',
      verticalAlign: 'middle',
      flexShrink: '0',
    },
    iconColor: {
      color: ContextualMenuIconColor,
      [MS_HIGHCONTRAST_ACTIVE]: {
        color: 'HighlightText',
      }
    },
    subMenuIcon: [
      fonts.xSmall,
      {
        height: ContextualMenuItemHeight,
        lineHeight: ContextualMenuItemHeight,
        textAlign: 'center',
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: '0'
      }]
  };

  return concatStyleSets(menuItemStyles);
});

export const getStyles = memoizeFunction((
  theme: ITheme,
): IContextualMenuStyles => {
  const { semanticColors, fonts } = theme;

  const ContextualMenuBackground = semanticColors.bodyBackground;
  const ContextualMenuHeaderColor = semanticColors.menuHeader;
  const ContextualMenuDividerColor = semanticColors.bodyDivider;

  const styles: IContextualMenuStyles = {
    root: {
      backgroundColor: ContextualMenuBackground,
      minWidth: '180px',
    },
    container: {

    },
    list: {
      listStyleType: 'none',
      margin: '0',
      padding: '0',
      lineHeight: '0',
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
        border: 'none',
        height: ContextualMenuItemHeight,
        lineHeight: ContextualMenuItemHeight,
        cursor: 'default',
        padding: '0px 6px',
        userSelect: 'none',
        textAlign: 'left',
      }
    ],
    divider: {
      display: 'block',
      height: '1px',
      backgroundColor: ContextualMenuDividerColor,
      position: 'relative'
    },
  };
  return concatStyleSets(styles);
});