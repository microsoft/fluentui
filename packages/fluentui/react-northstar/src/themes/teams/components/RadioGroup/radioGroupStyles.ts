import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { RadioGroupStylesProps } from '../../../../components/RadioGroup/RadioGroup';

export const radioGroupStyles: ComponentSlotStylesPrepared<RadioGroupStylesProps> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    display: 'flex',
    flexDirection: p.vertical ? 'column' : 'row',
  }),
};
