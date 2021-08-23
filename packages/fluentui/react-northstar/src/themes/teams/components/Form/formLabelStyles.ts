import { pxToRem } from '../../../../utils';
import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { FormLabelStylesProps } from '../../../../components/Form/FormLabel';
import type { FormLabelVariables } from './formLabelVariables';

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
