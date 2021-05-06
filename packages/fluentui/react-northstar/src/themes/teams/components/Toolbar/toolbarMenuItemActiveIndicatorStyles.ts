import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { getColorScheme } from '../../colors';
import { pxToRem } from '../../../../utils';
import { ToolbarMenuItemActiveIndicatorStylesProps } from '../../../../components/Toolbar/ToolbarMenuItemActiveIndicator';
import { ToolbarVariables } from './toolbarVariables';
import { activeIndicatorUrl } from './activeIndicatorUrl';

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
