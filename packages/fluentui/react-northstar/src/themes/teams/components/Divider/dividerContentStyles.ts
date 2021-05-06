import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { pxToRem } from '../../../../utils';
import { DividerContentStylesProps } from '../../../../components/Divider/DividerContent';

export const dividerContentStyles: ComponentSlotStylesPrepared<DividerContentStylesProps> = {
  root: (): ICSSInJSStyle => ({
    marginLeft: pxToRem(20),
    marginRight: pxToRem(20),
  }),
};
