import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { FormStylesProps } from '../../../../components/Form/Form';
import { FormVariables } from './formVariables';
import { pxToRem } from '../../../../utils';

export const formStyles: ComponentSlotStylesPrepared<FormStylesProps, FormVariables> = {
  root: ({ props, variables: v }): ICSSInJSStyle => ({
    height: '100%',
    width: '100%',
    display: ['grid', '-ms-grid'],
    gridTemplateColumns: '1fr',
    msGridColumns: '1fr',
    justifyContent: 'space-evenly',
    gridGap: pxToRem(20),
    justifyItems: 'start',
    '> *:not(:last-child)': {
      marginBottom: v.fieldsMarginBottom,
    },
    '> :last-child': {
      marginTop: v.lastChildMarginTop,
    },
  }),
};
