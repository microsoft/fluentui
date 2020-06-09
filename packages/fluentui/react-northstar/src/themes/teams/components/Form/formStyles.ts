import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { FormStylesProps } from '../../../../components/Form/Form';
import { pxToRem } from '../../../../utils';

const formStyles: ComponentSlotStylesPrepared<FormStylesProps, any> = {
  root: ({ props, variables }): ICSSInJSStyle => ({
    height: '100%',
    width: '100%',
    display: ['grid', '-ms-grid'],
    gridTemplateColumns: '1fr',
    msGridColumns: '1fr',
    justifyContent: 'space-evenly',
    gridGap: pxToRem(20),
    justifyItems: 'start',
  }),
};

export default formStyles;
