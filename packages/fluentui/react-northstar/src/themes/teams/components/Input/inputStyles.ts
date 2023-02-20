import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { InputStylesProps } from '../../../../components/Input/Input';
import { InputVariables } from './inputVariables';
import { Property } from 'csstype';
import { pxToRem } from '../../../../utils';

export const inputStyles: ComponentSlotStylesPrepared<InputStylesProps, InputVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'inline-flex',
    position: 'relative',
    outline: 0,
    verticalAlign: 'middle',
    ...(p.fluid && { width: '100%' }),
    ...(p.labelPosition === 'inline' && {
      flexDirection: 'row',
      alignItems: 'center',
    }),
  }),

  input: ({ props: p, variables: v }): ICSSInJSStyle => ({
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
      ...(!p.error && { borderColor: v.inputFocusBorderColor, borderRadius: v.inputFocusBorderRadius }),
    },

    ...(!p.hasValue && {
      ':-webkit-autofill:focus': {
        '-webkit-text-fill-color': 'transparent',
      },
    }),

    ...(p.clearable && { padding: v.inputPaddingWithIconAtEnd }),
    ...(p.hasIcon && {
      padding: p.iconPosition === 'start' ? v.inputPaddingWithIconAtStart : v.inputPaddingWithIconAtEnd,
    }),
    ...(p.labelPosition === 'inside' && {
      paddingTop: v.inputInsideLabelPaddingTop,
    }),
    ...(p.error && { border: `${pxToRem(1)} solid ${v.borderColorError}` }),

    '::-ms-clear': {
      display: 'none',
    },
  }),

  icon: ({ props: p, variables: v }): ICSSInJSStyle => ({
    color: v.iconColor,
    outline: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: v.iconPosition as Property.Position,
    top: 0,
    bottom: 0,
    ...(p.error && { color: v.colorError }),
    ...(p.requiredAndSuccessful && {
      color: v.successfulColor,
    }),
    ...(p.disabled && {
      color: v.colorDisabled,
    }),

    ...(p.iconPosition === 'start' && {
      left: v.iconLeft,
    }),
    ...(p.iconPosition === 'end' && {
      right: v.iconRight,
    }),

    ...(p.clearable &&
      p.hasValue && {
        height: '100%',
        width: pxToRem(16),
        color: v.iconColor,
        ...(p.disabled && {
          color: v.colorDisabled,
        }),
      }),
  }),

  inputContainer: (): ICSSInJSStyle => ({
    position: 'relative',
  }),
};
