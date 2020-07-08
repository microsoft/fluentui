import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { InputLabelStylesProps } from '../../../../components/Input/InputLabel';
import { pxToRem } from '../../../../utils';

export const inputLabelStyles: ComponentSlotStylesPrepared<InputLabelStylesProps> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    display: 'block',
    transition: 'all .2s',

    ...(p.labelPosition === 'internal' && {
      top: 0,
      bottom: pxToRem(-8),
      left: 0,
      margin: 0,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      zIndex: 100,
      paddingLeft: pxToRem(12),
      ...(p.inputValue && {
        transform: 'translateY(-16px)',
        fontSize: pxToRem(12),
      }),
    }),
    ...(p.required && {
      '::after': {
        content: '"*"',
      },
    }),
  }),
};
