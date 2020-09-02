import { TextAreaVariables } from './textAreaVariables';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { TextAreaStylesProps } from '../../../../components/TextArea/TextArea';
import { pxToRem } from '../../../../utils';

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
      backgroundColor: v.disabledBackgroundColor,
      color: v.disabledColor,
    }),

    ...(p.autoAdjustHeight && {
      minHeight: v.minHeightAutoAdjust,
      height: pxToRem(p.autoHeight),
      overflow: 'hidden',
      resize: 'vertical',
    }),

    '::placeholder': {
      color: v.placeholderColor,
      opacity: 1, // undo Firefox default opacity
    },

    ':focus': {
      borderColor: v.borderColorFocus,
    },
  }),
};
