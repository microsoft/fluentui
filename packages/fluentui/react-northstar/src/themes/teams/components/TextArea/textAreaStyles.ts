import { TextAreaVariables } from './textAreaVariables';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { TextAreaStylesProps } from '../../../../components/TextArea/TextArea';

export const textAreaStyles: ComponentSlotStylesPrepared<TextAreaStylesProps, TextAreaVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    margin: v.margin,
    height: v.height,

    backgroundColor: v.backgroundColor,
    ...(p.inverted && {
      backgroundColor: v.invertedBackgroundColor,
    }),

    color: v.fontColor,

    borderColor: v.borderColor,
    borderRadius: v.borderRadius,
    borderStyle: 'solid',
    borderWidth: v.borderWidth,

    outline: 0,
    padding: v.padding,

    resize: p.resize || 'none',

    ...(p.fluid && {
      width: '100%',
    }),

    ...(p.disabled && {
      pointerEvents: 'none',
      color: v.disabledColor,
      boxShadow: 'none',
    }),

    '::placeholder': {
      color: v.placeholderColor,
      opacity: 1, // undo Firefox default opacity
      ...(p.disabled && {
        color: v.disabledColor,
      }),
    },

    ':focus': {
      borderColor: v.borderColorFocus,
    },
  }),
};
