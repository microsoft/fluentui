import { ComponentSlotStylesPrepared } from '@fluentui/styles'
import { AccordionProps } from '../../../../components/Accordion/Accordion'

const accordionStyles: ComponentSlotStylesPrepared<AccordionProps> = {
  root: () => ({
    verticalAlign: 'middle',
    display: 'flex',
    flexDirection: 'column',
    marginBlockEnd: 0,
    marginBlockStart: 0,
  }),
}

export default accordionStyles
