import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { getColorScheme } from '../../colors';
import { pxToRem } from '../../../../utils';
import { ToolbarMenuItemSubmenuIndicatorStylesProps } from '../../../../components/Toolbar/ToolbarMenuItemSubmenuIndicator';
import { ToolbarVariables } from './toolbarVariables';
import { submenuIndicatorUrl } from './submenuIndicatorUrl';

export const toolbarMenuItemSubmenuIndicatorStyles: ComponentSlotStylesPrepared<
  ToolbarMenuItemSubmenuIndicatorStylesProps,
  ToolbarVariables
> = {
  root: ({ variables: v, rtl }): ICSSInJSStyle => {
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
      top: 0,
    };
  },
};
