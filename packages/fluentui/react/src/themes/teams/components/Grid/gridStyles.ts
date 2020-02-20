import { GridVariables } from './gridVariables'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { GridProps } from '../../../../components/Grid/Grid'

const getCSSTemplateValue = (template: string | number): string => {
  const templateAsNumber = Number(template)

  return !isNaN(templateAsNumber) && templateAsNumber > 0
    ? `repeat(${template}, 1fr)`
    : String(template)
}

const gridStyles: ComponentSlotStylesPrepared<GridProps, GridVariables> = {
  root: ({
    props,
    variables: { height, width, defaultColumnCount, gridGap, padding },
  }): ICSSInJSStyle => {
    const { rows, columns = !props.rows && defaultColumnCount } = props

    return {
      height,
      width,
      padding,
      gridGap,
      display: 'grid',
      justifyContent: 'space-evenly',

      ...(rows && !columns && { gridAutoFlow: 'column' }),
      ...(rows && { gridTemplateRows: getCSSTemplateValue(rows) }),
      ...(columns && { gridTemplateColumns: getCSSTemplateValue(columns) }),

      '& > *': { outlineOffset: '-3px' },
    }
  },
}

export default gridStyles
