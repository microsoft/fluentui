import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { FormLabelStylesProps } from '../../../../components/Form/FormLabel';
import { pxToRem } from '../../../../utils';

const formLabelStyles: ComponentSlotStylesPrepared<FormLabelStylesProps> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    display: 'block',
    ...(p.inline && { marginRight: pxToRem(10), display: 'inline' }),
    ...(!!p.type && (p.type === 'radio' || p.type === 'checkbox') && { display: 'inline' }),
    ...(p.required && {
      '::after': {
        content: '"*"',
      },
    }),
  }),
};

export default formLabelStyles;
