import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DialogVariables } from './dialogVariables';
import { DialogFooterStylesProps } from '../../../../components/Dialog/DialogFooter';

export const dialogFooterStyles: ComponentSlotStylesPrepared<DialogFooterStylesProps, DialogVariables> = {
  root: (): ICSSInJSStyle => ({
    textAlign: 'right',
  }),
};
