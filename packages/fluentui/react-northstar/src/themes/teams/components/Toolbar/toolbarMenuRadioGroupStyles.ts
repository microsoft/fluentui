import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { ToolbarMenuRadioGroupStylesProps } from '../../../../components/Toolbar/ToolbarMenuRadioGroup';
import type { ToolbarVariables } from './toolbarVariables';

export const toolbarMenuRadioGroupStyles: ComponentSlotStylesPrepared<
  ToolbarMenuRadioGroupStylesProps,
  ToolbarVariables
> = {
  root: (): ICSSInJSStyle => ({
    padding: 0,
  }),
};
