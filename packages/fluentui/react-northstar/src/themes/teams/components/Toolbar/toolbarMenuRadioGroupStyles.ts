import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { ToolbarMenuRadioGroupStylesProps } from '../../../../components/Toolbar/ToolbarMenuRadioGroup';
import { ToolbarVariables } from './toolbarVariables';

export const toolbarMenuRadioGroupStyles: ComponentSlotStylesPrepared<
  ToolbarMenuRadioGroupStylesProps,
  ToolbarVariables
> = {
  root: (): ICSSInJSStyle => ({
    padding: 0,
  }),
};
