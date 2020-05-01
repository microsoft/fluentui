import { ComponentStyleFunctionParam, ICSSInJSStyle } from '@fluentui/styles';
import { TeamsTableVariables } from './tableVariables';
import { TableStylesProps } from '../../../../components/Table/Table';

export default {
  root: ({ variables: v }: ComponentStyleFunctionParam<TableStylesProps, TeamsTableVariables>): ICSSInJSStyle => {
    return {
      display: 'flex',
      flexDirection: 'column',
      background: v.backgroundColor,
    };
  },
};
