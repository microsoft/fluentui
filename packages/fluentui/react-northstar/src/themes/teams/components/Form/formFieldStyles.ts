import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { FormFieldStylesProps } from '../../../../components/Form/FormField';
import { pxToRem } from '../../../../utils';
import { FormFieldVariables } from './formFieldVariables';

const formFieldStyles: ComponentSlotStylesPrepared<FormFieldStylesProps, FormFieldVariables> = {
  root: ({ props, variables }): ICSSInJSStyle => ({}),
  // label: ({ props }): ICSSInJSStyle => {
  //   const { type, inline, required } = props;
  //   return {
  //     display: 'inline',
  //     ...((!type || (type !== 'radio' && type !== 'checkbox')) && {
  //       display: 'block',
  //     }),
  //     ...(inline && { marginRight: pxToRem(10), display: 'inline' }),
  //     ...(required && {
  //       '::after': {
  //         content: '"*"',
  //       },
  //     }),
  //   };
  // },
  control: ({ props, variables: v }): ICSSInJSStyle => {
    const { type } = props;
    return {
      ...(type &&
        (type === 'radio' || type === 'checkbox') && {
          marginRight: pxToRem(10),
        }),
    };
  },
  message: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ...(p.hasErrorMessage && { color: v.colorScheme.red.foreground }),
    display: 'block',
  }),
  icon: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ...(p.hasErrorMessage && { color: v.colorScheme.red.foreground }),
  }),
};

export default formFieldStyles;
