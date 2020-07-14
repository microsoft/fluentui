import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { FormStylesProps } from '../../../../components/Form/Form';
import { FormVariables } from './formVariables';

export const formStyles: ComponentSlotStylesPrepared<FormStylesProps, FormVariables> = {
  root: ({ props, variables: v }): ICSSInJSStyle => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    justifyItems: 'start',
    '> *:not(:last-child)': {
      marginBottom: v.fieldsMarginBottom,
    },
    '> :last-child': {
      marginTop: v.lastChildMarginTop,
    },
  }),
};
