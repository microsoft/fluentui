import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { InputControlStylesProps } from '../../../../components/Input/InputControl';
import { InputVariables } from './inputVariables';

const inputStyles: ComponentSlotStylesPrepared<InputControlStylesProps, InputVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.backgroundColor,
    ...(p.inverted && {
      backgroundColor: v.backgroundColorInverted,
    }),

    lineHeight: 'unset',

    color: v.fontColor,

    borderColor: v.borderColor,
    borderRadius: v.borderRadius,
    borderStyle: 'solid',
    borderWidth: v.borderWidth,

    outline: 'none',
    padding: v.inputPadding,
    position: 'relative',

    ...(p.fluid && { width: '100%' }),
    ...(p.inline && { float: 'left' }),

    // Overrides for "disabled" inputs
    ...(p.disabled && {
      color: v.colorDisabled,
      boxShadow: 'none',
    }),

    '::placeholder': {
      color: v.placeholderColor,
      opacity: 1, // undo Firefox default opacity
      ...(p.disabled && {
        color: v.colorDisabled,
      }),
    },

    ':focus': {
      borderColor: v.inputFocusBorderColor,
    },
    ...(p.clearable && { padding: v.inputPaddingWithIconAtEnd }),
    ...(p.hasIcon && {
      padding: p.iconPosition === 'start' ? v.inputPaddingWithIconAtStart : v.inputPaddingWithIconAtEnd,
    }),
  }),
};

export default inputStyles;
