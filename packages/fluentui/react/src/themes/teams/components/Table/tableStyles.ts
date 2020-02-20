import { ComponentStyleFunctionParam, ICSSInJSStyle } from '@fluentui/styles'
import { TeamsTableVariables } from './tableVariables'
import { TableProps } from '../../../../components/Table/Table'

export default {
  root: ({
    variables: v,
  }: ComponentStyleFunctionParam<TableProps, TeamsTableVariables>): ICSSInJSStyle => {
    return {
      display: 'flex',
      flexDirection: 'column',
      background: v.backgroundColor,
    }
  },
}
