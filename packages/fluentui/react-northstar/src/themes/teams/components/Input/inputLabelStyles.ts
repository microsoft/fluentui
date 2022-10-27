import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { InputLabelStylesProps } from '../../../../components/Input/InputLabel';
import { InputLabelVariables } from './inputLabelVariables';

export const inputLabelStyles: ComponentSlotStylesPrepared<InputLabelStylesProps, InputLabelVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    transition: 'all .2s',
    lineHeight: v.lineHeight,
    marginBottom: v.marginBottom,

    ...(p.labelPosition === 'inside' && {
      bottom: 0,
      top: 0,
      left: 0,
      margin: 0,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      zIndex: 100,
      color: v.inputLabelColor,
      paddingLeft: v.insideLabelPaddingLeft,
      ...(p.hasValue && {
        transform: 'translateY(-16px)',
        fontSize: v.insideLabelActiveFontSize,
        paddingTop: v.insideLabelActivePaddingTop,
      }),
    }),
    ...(p.labelPosition === 'inline' && {
      paddingRight: v.inlineLabelPaddingRight,
    }),
    ...(p.required && {
      '::after': {
        content: '"*"',
      },
    }),
  }),
};
