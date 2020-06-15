import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { FormStylesProps } from '../../../../components/Form/Form';
import { pxToRem } from '../../../../utils';

const formStyles: ComponentSlotStylesPrepared<FormStylesProps, any> = {
  root: ({ props, variables }): ICSSInJSStyle => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    justifyItems: 'start',
    '> *:not(:last-child)': {
      marginBottom: pxToRem(20),
    },
  }),
};

export default formStyles;
