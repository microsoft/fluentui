import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { InputLabelStylesProps } from 'src/components/Input/InputLabel';

export const inputLabelStyles: ComponentSlotStylesPrepared<InputLabelStylesProps> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    display: 'block',
  }),
};
