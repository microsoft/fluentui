import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { ToolbarRadioGroupStylesProps } from '../../../../components/Toolbar/ToolbarRadioGroup';
import { ToolbarVariables } from './toolbarVariables';

const toolbarRadioGroupStyles: ComponentSlotStylesPrepared<ToolbarRadioGroupStylesProps, ToolbarVariables> = {
  root: (): ICSSInJSStyle => ({
    whiteSpace: 'nowrap'
  })
};

export default toolbarRadioGroupStyles;
