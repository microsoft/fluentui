import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { TableVariables } from './tableVariables';
import type { TableStylesProps } from '../../../../components/Table/Table';

export const tableStyles: ComponentSlotStylesPrepared<TableStylesProps, TableVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    return {
      display: 'flex',
      flexDirection: 'column',
      background: v.backgroundColor,
    };
  },
};
