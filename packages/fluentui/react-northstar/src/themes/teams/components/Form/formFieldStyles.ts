import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { FormFieldStylesProps } from '../../../../components/Form/FormField';
import { pxToRem } from '../../../../utils';
import { FormFieldVariables } from './formFieldVariables';

const formFieldStyles: ComponentSlotStylesPrepared<FormFieldStylesProps, FormFieldVariables> = {
  root: ({ props, variables }): ICSSInJSStyle => ({}),
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
