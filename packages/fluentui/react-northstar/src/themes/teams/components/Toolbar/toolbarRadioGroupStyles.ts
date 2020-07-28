import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { ToolbarRadioGroupStylesProps } from '../../../../components/Toolbar/ToolbarRadioGroup';
import { ToolbarVariables } from './toolbarVariables';

export const toolbarRadioGroupStyles: ComponentSlotStylesPrepared<ToolbarRadioGroupStylesProps, ToolbarVariables> = {
  root: (): ICSSInJSStyle => ({
    display: 'flex',
    whiteSpace: 'nowrap',
  }),
};
