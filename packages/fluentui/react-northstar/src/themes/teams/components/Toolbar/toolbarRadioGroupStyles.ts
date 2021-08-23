import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { ToolbarRadioGroupStylesProps } from '../../../../components/Toolbar/ToolbarRadioGroup';
import type { ToolbarVariables } from './toolbarVariables';

export const toolbarRadioGroupStyles: ComponentSlotStylesPrepared<ToolbarRadioGroupStylesProps, ToolbarVariables> = {
  root: (): ICSSInJSStyle => ({
    display: 'flex',
    whiteSpace: 'nowrap',
  }),
};
