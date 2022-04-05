import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { getColorScheme } from '../../colors';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { ToolbarMenuItemStylesProps } from '../../../../components/Toolbar/ToolbarMenuItem';
import { ToolbarVariables } from './toolbarVariables';
import { activeIndicatorUrl } from './activeIndicatorUrl';
import { toolbarMenuItemSubmenuIndicatorClassName } from '../../../../components/Toolbar/ToolbarMenuItemSubmenuIndicator';
import { toolbarMenuItemActiveIndicatorClassName } from '../../../../components/Toolbar/ToolbarMenuItemActiveIndicator';

export const toolbarMenuItemStyles: ComponentSlotStylesPrepared<ToolbarMenuItemStylesProps, ToolbarVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme);
    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderRadius: 0,
    });

    return {
      position: 'relative',
      color: v.menuItemForeground || colors.foreground1,
      borderWidth: v.menuBorderWidth,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'left',
      width: '100%',
      maxWidth: '100%',
      padding: v.menuItemPadding,
      cursor: 'pointer',
      minHeight: v.itemHeight,
      lineHeight: v.lineHeightBase,
      userSelect: 'none',

      ':focus': {
        outline: 0,
      },

      ':hover': {
        color: v.menuItemForegroundHover || colors.menuItemForegroundHover,
        backgroundColor: v.menuItemBackgroundHover || colors.menuItemBackgroundHover,
        [`& .${toolbarMenuItemSubmenuIndicatorClassName}`]: {
          color: v.menuItemForegroundHover || colors.menuItemForegroundHover,
        },
        [`& .${toolbarMenuItemActiveIndicatorClassName}`]: {
          backgroundImage: activeIndicatorUrl(v.menuItemForegroundHover || colors.menuItemForegroundHover),
        },
      },

      ':focus-visible': borderFocusStyles[':focus-visible'],

      ...((p.disabled || p.disabledFocusable) && {
        cursor: 'default',
        color: v.menuItemForegroundDisabled || colors.foregroundDisabled1,
        backgroundColor: v.menuItemBackgroundDisabled,
        [`& .${toolbarMenuItemSubmenuIndicatorClassName}`]: {
          color: v.menuItemForegroundDisabled || colors.foregroundDisabled1,
        },
        [`& .${toolbarMenuItemActiveIndicatorClassName}`]: {
          backgroundImage: activeIndicatorUrl(v.menuItemForegroundDisabled || colors.foregroundDisabled1),
        },
        ':hover': {
          // empty to overwrite all existing hover styles
        },
      }),
      ...(p.disabled && {
        // pointer events intentionally not disabled for focusable disabled toolbar items
        // so that hover events work
        pointerEvents: 'none',
      }),
    };
  },

  wrapper: () => ({
    display: 'block',
  }),
};
