import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { RadioGroupStylesProps } from '../../../../components/RadioGroup/RadioGroup';

export const radioGroupStyles: ComponentSlotStylesPrepared<RadioGroupStylesProps> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    display: 'flex',
    flexDirection: p.vertical ? 'column' : 'row',
  }),
};
