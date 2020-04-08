import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { getColorScheme } from '../../colors';
import { pxToRem } from '../../../../utils';
import getBorderFocusStyles from '../../getBorderFocusStyles';
import { default as ToolbarMenuItem, ToolbarMenuItemStylesProps } from '../../../../components/Toolbar/ToolbarMenuItem';
import { ToolbarVariables } from './toolbarVariables';
import submenuIndicatorUrl from './submenuIndicatorUrl';
import activeIndicatorUrl from './activeIndicatorUrl';

const toolbarMenuItemStyles: ComponentSlotStylesPrepared<ToolbarMenuItemStylesProps, ToolbarVariables> = {
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

      ':focus': {
        outline: 0,
      },

      ':hover': {
        color: v.menuItemForegroundHover || colors.menuItemForegroundHover,
        backgroundColor: v.menuItemBackgroundHover || colors.menuItemBackgroundHover,
        [`& .${ToolbarMenuItem.slotClassNames.submenuIndicator}`]: {
          backgroundImage: submenuIndicatorUrl(v.menuItemForegroundHover || colors.menuItemForegroundHover),
        },
        [`& .${ToolbarMenuItem.slotClassNames.activeIndicator}`]: {
          backgroundImage: activeIndicatorUrl(v.menuItemForegroundHover || colors.menuItemForegroundHover),
        },
      },

      ':focus-visible': borderFocusStyles[':focus-visible'],

      ...(p.disabled && {
        cursor: 'default',
        color: v.menuItemForegroundDisabled || colors.foregroundDisabled1,
        backgroundColor: v.menuItemBackgroundDisabled,
        [`& .${ToolbarMenuItem.slotClassNames.submenuIndicator}`]: {
          backgroundImage: submenuIndicatorUrl(v.menuItemForegroundDisabled || colors.foregroundDisabled1),
        },
        [`& .${ToolbarMenuItem.slotClassNames.activeIndicator}`]: {
          backgroundImage: activeIndicatorUrl(v.menuItemForegroundDisabled || colors.foregroundDisabled1),
        },
        ':hover': {
          // empty to overwrite all existing hover styles
        },
      }),
    };
  },

  activeIndicator: ({ variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme);
    return {
      backgroundImage: activeIndicatorUrl(v.menuItemForeground || colors.foreground1),
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: pxToRem(24),
      height: '100%',
      position: 'absolute',
      right: pxToRem(7),
    };
  },

  submenuIndicator: ({ variables: v, rtl }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme);
    return {
      backgroundImage: submenuIndicatorUrl(v.menuItemForeground || colors.foreground1),
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      ...(rtl && {
        transform: `scaleX(-1)`,
      }),
      width: pxToRem(16),
      height: '100%',
      position: 'absolute',
      right: pxToRem(7),
    };
  },

  wrapper: () => ({
    display: 'block',
  }),

  icon: ({ props: p }) => ({
    ...(p.hasContent && {
      marginRight: pxToRem(10),
    }),
  }),
};

export default toolbarMenuItemStyles;
