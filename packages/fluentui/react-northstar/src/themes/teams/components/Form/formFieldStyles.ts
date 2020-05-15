import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { FormFieldStylesProps } from '../../../../components/Form/FormField';
import { pxToRem } from '../../../../utils';

const formFieldStyles: ComponentSlotStylesPrepared<FormFieldStylesProps> = {
  root: ({ props, variables }): ICSSInJSStyle => ({}),
  label: ({ props }): ICSSInJSStyle => {
    const { type, inline, required } = props;
    return {
      ...((!type || (type !== 'radio' && type !== 'checkbox')) && {
        display: 'block',
      }),
      ...(inline && { marginRight: pxToRem(10), display: 'inline' }),
      ...(required && {
        '::after': {
          content: '"*"',
        },
      }),
    };
  },
  control: ({ props }): ICSSInJSStyle => {
    const { type } = props;
    return {
      ...(type &&
        (type === 'radio' || type === 'checkbox') && {
          marginRight: pxToRem(10),
        }),
    };
  },
  message: (): ICSSInJSStyle => ({
    display: 'block',
  }),
};

export default formFieldStyles;
