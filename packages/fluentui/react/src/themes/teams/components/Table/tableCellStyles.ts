import { ComponentStyleFunctionParam, ICSSInJSStyle } from '@fluentui/styles'
import { TeamsTableVariables } from './tableVariables'
import { TableCellProps } from '../../../../components/Table/TableCell'
import getBorderFocusStyles from '../../getBorderFocusStyles'

export default {
  root: ({
    variables: v,
    theme: { siteVariables },
  }: ComponentStyleFunctionParam<TableCellProps, TeamsTableVariables>): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({
      siteVariables,
    })

    return {
      display: 'flex',
      flexFlow: 'row nowrap',
      flexGrow: 1,
      flexBasis: 0,
      minWidth: v.minCellWidth,
      outline: 0,
      borderWidth: v.borderWidth,
      borderStyle: 'solid',
      borderColor: 'transparent',
      ...borderFocusStyles,
      padding: v.cellPadding,
      position: 'relative',
      height: '100%',
    }
  },
  content: ({
    props: { truncateContent },
  }: ComponentStyleFunctionParam<TableCellProps, TeamsTableVariables>): ICSSInJSStyle => {
    return {
      alignSelf: 'center',
      ...(truncateContent && {
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
    }
  },
}
