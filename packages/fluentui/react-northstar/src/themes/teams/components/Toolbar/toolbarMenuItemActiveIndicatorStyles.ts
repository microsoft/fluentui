import { getColorScheme } from '../../colors';
import { pxToRem } from '../../../../utils';
import { activeIndicatorUrl } from './activeIndicatorUrl';
import type { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import type { ToolbarMenuItemActiveIndicatorStylesProps } from '../../../../components/Toolbar/ToolbarMenuItemActiveIndicator';
import type { ToolbarVariables } from './toolbarVariables';

export const toolbarMenuItemActiveIndicatorStyles: ComponentSlotStylesPrepared<
  ToolbarMenuItemActiveIndicatorStylesProps,
  ToolbarVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => {
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
};
