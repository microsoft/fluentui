import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { InputStylesProps } from '../../../../components/Input/Input';
import { InputVariables } from './inputVariables';
import { pxToRem } from '../../../../utils';

const inputStyles: ComponentSlotStylesPrepared<InputStylesProps, InputVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    alignItems: 'center',
    display: 'inline-flex',
    position: 'relative',
    outline: 0,
    ...(p.error && { border: `${pxToRem(1)} solid ${v.borderColorError}` }),
    ...(p.fluid && { width: '100%' }),
  }),
};

export default inputStyles;
