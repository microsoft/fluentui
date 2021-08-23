import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { DialogVariables } from './dialogVariables';
import type { DialogFooterStylesProps } from '../../../../components/Dialog/DialogFooter';

export const dialogFooterStyles: ComponentSlotStylesPrepared<DialogFooterStylesProps, DialogVariables> = {
  root: (): ICSSInJSStyle => ({
    textAlign: 'right',
  }),
};
