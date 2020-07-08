import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { InputLabelStylesProps } from '../../../../components/Input/InputLabel';
import { pxToRem } from '../../../../utils';

export const inputLabelStyles: ComponentSlotStylesPrepared<InputLabelStylesProps> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    display: 'block',
    ...(p.labelPosition === 'inline' && {
      display: 'inline-block',
      marginRight: pxToRem(10),
    }),
    ...(p.required && {
      '::after': {
        content: '"*"',
      },
    }),
  }),
};
