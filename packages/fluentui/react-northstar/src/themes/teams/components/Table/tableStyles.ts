import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { TableVariables } from './tableVariables';
import { TableStylesProps } from '../../../../components/Table/Table';

export const tableStyles: ComponentSlotStylesPrepared<TableStylesProps, TableVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    return {
      display: 'flex',
      flexDirection: 'column',
      background: v.backgroundColor,
    };
  },
};
