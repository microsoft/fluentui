import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { FormMessageStylesProps } from '../../../../components/Form/FormMessage';
import type { FormMessageVariables } from './formMessageVariables';

export const formMessageStyles: ComponentSlotStylesPrepared<FormMessageStylesProps, FormMessageVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    paddingLeft: v.paddingLeft,
    ...(p.error && { color: v.colorScheme.red.foreground }),
  }),
};
