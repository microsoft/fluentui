import { memoizeFunction } from '../../Utilities';
import { IContextualMenuStyles, IMenuItemStyle } from './ContextualMenu.Props';
import {
  ITheme,
  concatStyleSets,
  FontWeights,
  getFocusStyle
} from '../../Styling';

const ContextualMenuItemHeight = '32px';
const ContextualMenuIconWidth = '14px';

export const getMenuItemStyles = memoizeFunction((
  theme: ITheme,
  customMenuItemStyles?: Partial<IMenuItemStyle>
): IMenuItemStyle => {
  const { semanticColors, fonts } = theme;
  const ContextualMenuIconColor = semanticColors.menuIcon;
  const ContextualMenuTextColor = semanticColors.bodyText;
  const ContextualMenuItemBackgroundHoverColor = semanticColors.menuItemBackgroundHovered;
  const ContextualMenuItemBackgroundSelectedColor = semanticColors.menuItemBackgroundChecked;
  const ContextualMenuTextSelectedColor = semanticColors.menuSelectedText;
  const ContextualMenuTextDisabledColor = semanticColors.disabledText;

  const menuItemStyles: IMenuItemStyle = {
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
    },
    rootFocused: {
      backgroundColor: ContextualMenuItemBackgroundHoverColor,
    },
    rootChecked: {
      backgroundColor: ContextualMenuItemBackgroundSelectedColor,
    },
    rootPressed: {
      backgroundColor: ContextualMenuItemBackgroundSelectedColor,
    },
    rootExpanded: {
      backgroundColor: ContextualMenuItemBackgroundSelectedColor,
      color: ContextualMenuTextSelectedColor,
      fontWeight: FontWeights.semibold,
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
      color: ContextualMenuIconColor
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

  return concatStyleSets(menuItemStyles, customMenuItemStyles) as IMenuItemStyle;
});

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: Partial<IContextualMenuStyles>,
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
  return concatStyleSets(styles, customStyles) as IContextualMenuStyles;
});