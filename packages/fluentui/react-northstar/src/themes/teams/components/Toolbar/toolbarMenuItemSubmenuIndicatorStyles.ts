import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { getColorScheme } from '../../colors';
import { pxToRem } from '../../../../utils';
import { ToolbarMenuItemSubmenuIndicatorStylesProps } from '../../../../components/Toolbar/ToolbarMenuItemSubmenuIndicator';
import { ToolbarVariables } from './toolbarVariables';

export const toolbarMenuItemSubmenuIndicatorStyles: ComponentSlotStylesPrepared<
  ToolbarMenuItemSubmenuIndicatorStylesProps,
  ToolbarVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme);
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: v.menuItemForeground || colors.foreground1,
      width: pxToRem(16),
      height: '100%',
      position: 'absolute',
      right: pxToRem(7),
      top: 0,
    };
  },
};
