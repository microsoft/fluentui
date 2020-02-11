import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { TooltipProps } from '../../../../components/Tooltip/Tooltip'
import { TooltipVariables } from './tooltipVariables'

const tooltipStyles: ComponentSlotStylesPrepared<TooltipProps, TooltipVariables> = {
  root: (): ICSSInJSStyle => ({}),

  content: ({ variables: v, props: p }): ICSSInJSStyle => ({
    ...(!p.open && {
      opacity: 0,
    }),
    zIndex: v.zIndex,
    position: 'absolute',
    textAlign: 'left',
  }),
}

export default tooltipStyles
