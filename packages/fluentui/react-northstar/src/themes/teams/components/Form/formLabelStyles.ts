import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { FormLabelStylesProps } from '../../../../components/Form/FormLabel';
import { FormLabelVariables } from './formLabelVariables';
import { pxToRem } from '../../../../utils';

export const formLabelStyles: ComponentSlotStylesPrepared<FormLabelStylesProps, FormLabelVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    lineHeight: v.lineHeight,
    marginBottom: v.marginBottom,
    ...(p.inline && { marginRight: pxToRem(10), display: 'inline' }),
    ...(p.required && {
      '::after': {
        content: '"*"',
      },
    }),
  }),
};
